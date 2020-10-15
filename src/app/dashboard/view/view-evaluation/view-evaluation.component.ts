import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	TraineePresentation,
	ClientTraineeAttendanceReport,
	ClientEvaluation,
	EvaluationNote,
	ClientEvaluationNote,
	ClientTraineeAttendance,
	EvalTypes,
	AttendanceStatus,
} from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Observable, BehaviorSubject, merge, combineLatest } from 'rxjs';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import {
	PresentationStateAction,
	AttendanceStateAction,
	NoteStateAction,
	fromPresentationState,
	fromAttendanceState,
	fromNoteState,
	MainStateEffects,
	NoteStateEffects,
	AttendanceStateEffects,
} from 'src/app/shared/store-modules';
import { takeUntil, tap, withLatestFrom, map, filter } from 'rxjs/operators';
import { isEmpty as _isEmpty, sortBy as _sortBy} from 'lodash';

@Component({
	selector: 'rd-view-evaluation',
	templateUrl: './view-evaluation.component.html',
	styleUrls: ['./view-evaluation.component.scss'],
})
export class ViewEvaluationComponent extends DashboardContentBase implements OnInit, OnDestroy {
	detailedViewDateFormat = 'dd-MM-yyyy HH:mm:ss';
	viewDateFormat = 'dd MMM yyyy';

	// currentDate = new FormControl(DateHelper.dateToInputFormat(new Date()));
	currentDate = this.fb.control(DateHelper.dateToInputFormat(new Date()), { updateOn: 'change' });
	filterEvaluationForm = this.fb.group({
		evalType: [null],
		search: [''],
		sort: ['Date'],
		asc: [true],
	});
	insertEvaluationForm = this.fb.group({
		notes: ['', Validators.required],
		evalType: [null, Validators.required],
	});
	changeAttendanceForm = this.fb.group({
		attendanceId: ['', Validators.required],
		status: ['Present', Validators.required],
		note: ['', Validators.required],
		traineeCode: ['', Validators.required],
		attType: ['', Validators.required],
		attendanceDate: ['', Validators.required],
	});
	changeFullDayPermissionReason = this.fb.control('', Validators.required);

	evalType = EvalTypes;
	attendanceStatus = AttendanceStatus;

	todaysPresentation$: Observable<TraineePresentation[][]>;
	attendanceReport$: Observable<ClientTraineeAttendanceReport>;
	evaluations$: Observable<ClientEvaluation>;
	filteredEvalNotes$: Observable<ClientEvaluationNote[]>;
	presentationDetail$ = new BehaviorSubject<TraineePresentation>(null);

	loadingTodaysPresentation$: Observable<boolean>;
	loadingAttendanceReport$: Observable<boolean>;
	loadingEvaluations$: Observable<boolean>;

	//
	loadingViewEvaluations$ = new BehaviorSubject<boolean>(false);
	loadingViewAttendances$ = new BehaviorSubject<boolean>(false);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private noteEffects: NoteStateEffects,
		private attendanceEffects: AttendanceStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.todaysPresentation$ = this.store.pipe(
			select(fromPresentationState.getPresentationsByDate),
			map((presentations: TraineePresentation[]) => {
				// Separate presentations into 2 arr for each sessions
				const presentationArr = [[], []];
				_sortBy(presentations, 'savedAt').forEach((p) => {
					if (p.savedAt.getHours() >= 7 && p.savedAt.getHours() < 13) presentationArr[0].push(p);
					else presentationArr[1].push(p);
				});
				return presentationArr;
			})
		);
		this.attendanceReport$ = this.store.pipe(select(fromAttendanceState.getAttendanceReport));
		this.evaluations$ = this.store.pipe(select(fromNoteState.getEvaluations));
		this.filteredEvalNotes$ = this.store.pipe(select(fromNoteState.getFilteredEvaluationNotes));
		this.loadingTodaysPresentation$ = this.store.pipe(
			select(fromPresentationState.isPresentationsLoading)
		);
		this.loadingAttendanceReport$ = this.store.pipe(
			select(fromAttendanceState.isAttendanceReportLoading)
		);
		this.loadingEvaluations$ = this.store.pipe(select(fromNoteState.isEvaluationsLoading));
		this.loadingAttendanceReport$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(this.loadingViewAttendances$);
		this.loadingEvaluations$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(this.loadingViewEvaluations$);
		//#endregion

		//#region Auto fetch
		merge(this.currentDate.valueChanges, this.mainEffects.changeGen$)
			.pipe(
				filter(() => !_isEmpty(this.currentDate.value)),
				takeUntil(this.destroyed$)
			)
			.subscribe(() => this.getAllEvaluationDataByDate(this.currentDate.value));

		// Update attendance only
		merge(
			this.attendanceEffects.changeAttendanceStatus$,
			this.attendanceEffects.setAttendancePermission$
		)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() =>
				this.store.dispatch(
					AttendanceStateAction.FetchAttendanceReport({ date: this.currentDate.value })
				)
			);

		// Update evaluation notes only
		merge(this.noteEffects.createEvaluationNote$, this.noteEffects.deleteEvaluationNote$)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() =>
				this.store.dispatch(NoteStateAction.FetchEvaluation({ sdate: this.currentDate.value }))
			);

		//#endregion

		this.filterEvaluationForm.valueChanges
			.pipe(takeUntil(this.destroyed$))
			.subscribe((val) => this.store.dispatch(NoteStateAction.SetEvaluationNoteFilter(val)));

		this.getAllEvaluationDataByDate(this.currentDate.value);
	}

	get sorter() {
		return this.filterEvaluationForm.get('sort');
	}
	toggleSort() {
		this.filterEvaluationForm.get('asc').setValue(!this.filterEvaluationForm.get('asc').value);
	}

	// Get data by date (yyyy-MM-dd)
	getAllEvaluationDataByDate(date: string) {
		this.store.dispatch(PresentationStateAction.FetchPresentationsByDate({ time: date }));
		this.store.dispatch(AttendanceStateAction.FetchAttendanceReport({ date }));
		this.store.dispatch(NoteStateAction.FetchEvaluation({ sdate: date }));
	}

	selectPresentation(row: TraineePresentation) {
		this.presentationDetail$.next(row);
	}

	saveEvaluationNote() {
		this.loadingViewEvaluations$.next(true);
		this.store.dispatch(
			NoteStateAction.CreateEvaluationNote({
				...this.insertEvaluationForm.value,
				sdate: new Date(this.currentDate.value),
			})
		);
	}

	deleteEvaluation(note: EvaluationNote) {
		this.loadingViewEvaluations$.next(true);
		this.store.dispatch(
			NoteStateAction.DeleteEvaluationNote({
				noteId: note.NoteId,
			})
		);
	}

	changeTraineeAttendance() {
		this.loadingViewAttendances$.next(true);
	}

	confirmChangeAttendance() {
		/*
    Example value:
    attType: "Secretariat"​
    attendanceDate: "2018-01-17"​
    attendanceId: "9dbf0f3d-ac82-4ced-ad04-bff812aa66a9"​
    note: "Test"​
    status: "Neglects Attendance"​
    traineeCode: "T080"
    */
		this.store.dispatch(
			AttendanceStateAction.ChangeTraineeAttendanceStatus(this.changeAttendanceForm.value)
		);
	}
	selectAttendanceToChange(attendanceId, traineeCode, attType) {
		this.changeAttendanceForm.patchValue({
			attendanceId,
			traineeCode,
			attType,
			attendanceDate: this.currentDate.value,
		});
	}
	cancelAttendanceChange() {
		this.changeAttendanceForm.reset();
	}

	toggleFullDayPermission(att: ClientTraineeAttendance) {
		this.store.dispatch(
			AttendanceStateAction.SetAttendancePermission({
				traineecode: att.TraineeCode,
				date: this.currentDate.value,
				reason: this.changeFullDayPermissionReason.value,
				to: !att.FulldayPermission,
			})
		);
	}
}
