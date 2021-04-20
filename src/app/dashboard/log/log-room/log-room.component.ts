import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { isEmpty as _isEmpty } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IAppState } from 'src/app/app.reducer';
import { adjustControlsInFormArray, arrayToObject } from 'src/app/shared/methods';
import { ClientTrainee, LogRoomPIC } from 'src/app/shared/models';
import {
	LogStateAction,
	fromLogState,
	fromBinusianState,
	MainStateAction,
	BinusianStateAction,
	LogStateEffects,
	fromRoomState,
	RoomStateAction,
} from 'src/app/shared/store-modules';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { DashboardContentBase } from '../../dashboard-content-base.component';

@Component({
	selector: 'rd-log-room',
	templateUrl: './log-room.component.html',
	styleUrls: ['./log-room.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogRoomComponent extends DashboardContentBase implements OnInit, OnDestroy {
	viewDateFormat = DateHelper.TIME_DATE_FORMAT;

	rooms$: Observable<any[]>;
	trainees$: Observable<ClientTrainee[]>;
	traineeDict: { [traineeCode: string]: ClientTrainee } = {};

	logRooms$: Observable<LogRoomPIC[]>;
	currentLogRoom$ = new BehaviorSubject<LogRoomPIC>(null);
	loadingLogRooms$ = new BehaviorSubject(false);

	logRoom = this.fb.control(null);
	logRoomComputerSeat = this.fb.array([]);
	logRoomPresentation = this.fb.array([]);
	logRoomNote = this.fb.array([]);

	dateControl = this.fb.control(DateHelper.dateToFormat(new Date()));

	constructor(
		protected store: Store<IAppState>,
		private logEffects: LogStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.logRooms$ = this.store.pipe(select(fromLogState.getLogRooms));
		this.rooms$ = this.store.pipe(select(fromRoomState.getRooms));
		this.trainees$ = this.store.pipe(
			select(fromBinusianState.getAllTrainees),
			tap((res: ClientTrainee[]) => (this.traineeDict = arrayToObject(res, (t) => t.TraineeCode)))
		);
		this.store
			.pipe(select(fromLogState.isLogRoomsLoading), takeUntil(this.destroyed$))
			.subscribe(this.loadingLogRooms$);

		adjustControlsInFormArray(this.logRoomComputerSeat, 40, this.compSeatFactory);
		adjustControlsInFormArray(this.logRoomPresentation, 1, this.presentationFactory);
		adjustControlsInFormArray(this.logRoomNote, 2, this.noteFactory);

		this.logEffects.saveLogRooms$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.loadingLogRooms$.next(false));

		this.dateControl.valueChanges
			.pipe(takeUntil(this.destroyed$))
			.subscribe((date) => this.store.dispatch(LogStateAction.FetchLogRooms({ date })));

		this.store.dispatch(RoomStateAction.FetchRooms());
		this.store.dispatch(LogStateAction.FetchLogRooms({ date: this.dateControl.value }));
		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: BinusianStateAction.FetchAllTraineesInCurrentGen(),
				selectorToBeChecked: fromBinusianState.getAllTrainees,
			})
		);
		this.loadingLogRooms$.subscribe(console.log);
	}

	get isEditing() {
		return !_isEmpty(this.currentLogRoom$.value);
	}

	addNewLog() {
		this.currentLogRoom$.next(new LogRoomPIC());
	}

	selectLog(log: LogRoomPIC) {
		this.currentLogRoom$.next(log);

		// Adjust the number of log
		adjustControlsInFormArray(
			this.logRoomPresentation,
			log.Presentation.length,
			this.presentationFactory
		);
		adjustControlsInFormArray(this.logRoomNote, log.Log.length, this.noteFactory);

		this.logRoom.setValue(log.Room);
		this.logRoomComputerSeat.patchValue(
			log.ComputerSeat.map((s) => ({
				seat: s.seat,
				trainee: this.getTrainee(s.trainee),
			}))
		);
		this.logRoomPresentation.patchValue(
			log.Presentation.map((p) => ({
				...p,
				trainee: this.getTrainee(p.trainee),
				start: DateHelper.dateToFormat(p.start, 'HH:mm'),
				end: DateHelper.dateToFormat(p.end, 'HH:mm'),
				go: DateHelper.dateToFormat(p.go, 'HH:mm'),
			}))
		);
		this.logRoomNote.patchValue(
			log.Log.map((l) => ({
				...l,
				trainee: this.getTrainee(l.trainee),
				start: DateHelper.dateToFormat(l.start, 'HH:mm'),
				end: DateHelper.dateToFormat(l.end, 'HH:mm'),
			}))
		);
	}

	updateLogRoom() {
		const computerSeat = this.logRoomComputerSeat.value;
		const presentation = this.logRoomPresentation.value;
		const note = this.logRoomNote.value;
		const today = new Date();
		// convert time input into Date()
		computerSeat.forEach((el, idx) => {
			el.seat = idx + 1;
			if (el.trainee != null) el.trainee = el.trainee.TraineeCode;
		});
		presentation.forEach((el) => {
			el.trainee = el.trainee.TraineeCode;
			el.start = new Date(today.setHours(el.start.substr(0, 2), el.start.substr(3, 2)));
			el.end = new Date(today.setHours(el.end.substr(0, 2), el.end.substr(3, 2)));
			el.go = new Date(today.setHours(el.go.substr(0, 2), el.go.substr(3, 2)));
		});
		note.forEach((el) => {
			el.trainee = el.trainee.TraineeCode;
			el.start = new Date(today.setHours(el.start.substr(0, 2), el.start.substr(3, 2)));
			el.end = new Date(today.setHours(el.end.substr(0, 2), el.end.substr(3, 2)));
		});

		this.store.dispatch(
			LogStateAction.SaveLogRooms({
				computerSeat,
				presentation,
				note,
				id: this.currentLogRoom$.value.Id,
				room: '999',
			})
		);
		this.loadingLogRooms$.next(true);
	}

	getTrainee(code: string) {
		if (_isEmpty(code)) return null;
		// Data TraineeCode ntah kenapa ada spasi ("T162      ")
		return this.traineeDict[code];
	}

	cancelEdit() {
		this.currentLogRoom$.next(null);
		this.logRoomComputerSeat.reset();
		this.logRoomPresentation.reset();
		this.logRoomNote.reset();
	}

	addLogRoomNote() {
		adjustControlsInFormArray(
			this.logRoomNote,
			this.logRoomNote.controls.length + 1,
			this.noteFactory
		);
	}
	addLogRoomPresentation() {
		adjustControlsInFormArray(
			this.logRoomPresentation,
			this.logRoomPresentation.controls.length + 1,
			this.presentationFactory
		);
	}
	deleteLogRoomNote(idx) {
		this.logRoomNote.removeAt(idx);
	}
	deleteLogRoomPresentation(idx) {
		this.logRoomPresentation.removeAt(idx);
	}

	presentationFactory = () => ({
		trainee: this.fb.control(null, Validators.required),
		start: this.fb.control(null, Validators.required),
		go: this.fb.control(null, Validators.required),
		end: this.fb.control(null, Validators.required),
		pic: this.fb.control(null, Validators.required),
		room: this.fb.control(null, Validators.required),
		materi: this.fb.control(null, Validators.required),
	});
	noteFactory = () => ({
		trainee: this.fb.control(null, Validators.required),
		start: this.fb.control(new Date(), Validators.required),
		end: this.fb.control(new Date(), Validators.required),
		note: this.fb.control(null, Validators.required),
	});
	compSeatFactory = () => ({
		seat: this.fb.control(null, Validators.required),
		trainee: this.fb.control(null, Validators.required),
	});

	searchByTraineeCodeAndName(term: string, item: ClientTrainee) {
		return item.codeAndName.toLowerCase().includes(term.toLowerCase());
	}
}
