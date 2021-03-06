import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
	FormControl,
	Validators,
	ValidationErrors,
	AbstractControl,
	FormBuilder,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	MainStateEffects,
	MasterStateAction,
	BinusianStateAction,
	MainStateAction,
	fromMasterState,
	fromBinusianState,
} from 'src/app/shared/store-modules';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { filter, takeUntil } from 'rxjs/operators';
import {
	ClientTrainee,
	ClientTrainerTeachingSchedule,
	TraineeSchedule,
	TrainerTeachingSchedule,
} from 'src/app/shared/models';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { isEmpty as _isEmpty } from 'lodash';

@Component({
	selector: 'rd-trainee-schedule',
	templateUrl: './modify-trainee-schedule.component.html',
	styleUrls: ['./modify-trainee-schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyTraineeScheduleComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
	viewDateFormat = DateHelper.DMY_FORMAT;
	scheduleType = ['Rest', 'Room', 'Secretariat']; // From models -> AttendanceType
	trainees$: Observable<ClientTrainee[]>;

	trainerTeachingDates = [new Date(), new Date()].map((d) => DateHelper.dateToFormat(d));
	currentTeachingDate = new FormControl(this.trainerTeachingDates[0]);

	insertTeachingScheduleText = this.fb.control('', Validators.required);
	insertTrainingScheduleText = this.fb.control('', Validators.required);
	insertTraineeAttendanceText = this.fb.control('', Validators.required);
	insertLectureScheduleText = this.fb.control('', Validators.required);

	loadingFormInsertTeachingSchedule$ = new BehaviorSubject(false);
	loadingFormInsertTrainingSchedule$ = new BehaviorSubject(false);
	loadingFormInsertTraineeAttendance$ = new BehaviorSubject(false);
	loadingFormInsertLectureSchedule$ = new BehaviorSubject(false);

	//#region TraineeSchedule Data
	viewTrainerTeachingSchedule$: Observable<TrainerTeachingSchedule[]>;
	loadingViewTrainerTeachingSchedule$: Observable<boolean>; // Not used yet, for table?
	viewTrainerTeachingScheduleControl = this.fb.group({
		startDate: [null, Validators.required],
		endDate: [null, Validators.required],
	});
	//#endregion

	//#region TraineeSchedule Data
	viewTraineeTrainingSchedule$: Observable<TraineeSchedule[]>;
	loadingViewTraineeTrainingSchedule$: Observable<boolean>; // Not used yet, for table?
	viewTraineeTrainingScheduleControl = this.fb.group({
		startDate: [null, Validators.required],
		endDate: [null, Validators.required],
	});
	selectedTraineeSchedules = []
	//#endregion

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.viewTraineeTrainingSchedule$ = this.store.pipe(
			select(fromMasterState.getTraineeTrainingSchedules)
		);
		this.viewTrainerTeachingSchedule$ = this.store.pipe(
			select(fromMasterState.getTrainerTeachingSchedules)
		);
		this.trainees$ = this.store.pipe(select(fromBinusianState.getAllTrainees));

		this.loadingViewTraineeTrainingSchedule$ = this.store.pipe(
			select(fromMasterState.isTraineeTrainingScheduleLoading)
		);
		this.loadingViewTraineeTrainingSchedule$ = this.store.pipe(
			select(fromMasterState.isTrainerTeachingScheduleLoading)
		);

		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingFormInsertTeachingSchedule$.next(false);
			this.loadingFormInsertTrainingSchedule$.next(false);
			this.loadingFormInsertTraineeAttendance$.next(false);
			this.loadingFormInsertLectureSchedule$.next(false);
		});

		this.viewTrainerTeachingScheduleControl.valueChanges
			.pipe(
				takeUntil(this.destroyed$),
				filter((form) => !!form.startDate && !!form.endDate)
			)
			.subscribe((form) =>
				this.store.dispatch(MasterStateAction.FetchTrainerTeachingSchedules(form))
			);

		this.viewTraineeTrainingScheduleControl.valueChanges
			.pipe(
				takeUntil(this.destroyed$),
				filter((form) => !!form.startDate && !!form.endDate)
			)
			.subscribe((form) =>
				this.store.dispatch(MasterStateAction.FetchTraineeSchedulesByDate(form))
			);

		this.currentGeneration$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe(() => {
				this.store.dispatch(BinusianStateAction.FetchAllTraineesInCurrentGen());
				this.viewTraineeTrainingScheduleControl.reset();
			});

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: BinusianStateAction.FetchAllTraineesInCurrentGen(),
				selectorToBeChecked: fromBinusianState.getAllTrainees,
			})
		);
	}
	submitInsertTeachingSchedule() {
		// TeachingDate,Trainer,Room,Shift,Type,Topic
		this.loadingFormInsertTeachingSchedule$.next(true);
		this.store.dispatch(
			MasterStateAction.CreateTrainerTeachingSchedules({
				schedules: this.processCSV(this.insertTeachingScheduleText.value),
			})
		);
	}
	submitInsertTrainingSchedule() {
		// TCode,AttendanceDate,TimeIn,TimeOut,Type,Room
		this.loadingFormInsertTrainingSchedule$.next(true);
		this.store.dispatch(
			MasterStateAction.CreateTraineeSchedules({
				schedules: this.processCSV(this.insertTrainingScheduleText.value),
			})
		);
	}
	submitInsertTraineeAttendance() {
		// Trainee number,Lecture date,Lecture schedule
		this.loadingFormInsertTraineeAttendance$.next(true);
		this.store.dispatch(
			MasterStateAction.CreateTraineeAttendances({
				attendances: this.processCSV(this.insertTraineeAttendanceText.value),
			})
		);
	}
	submitInsertLectureSchedule() {
		this.loadingFormInsertLectureSchedule$.next(true);
		this.store.dispatch(
			MasterStateAction.CreateLectureSchedules({
				schedules: this.processCSV(this.insertLectureScheduleText.value),
			})
		);
	}

	// Split each line, trim & filter empty line
	processCSV(text) {
		return text
			.split('\n')
			.map((t) => t.trim())
			.filter((t) => t !== '');
	}

	onSelectMultipleTraineeSchedule(schedules:any[]){
		this.selectedTraineeSchedules = schedules;
	}

	deleteTrainerTeachingSchedule(schedule: TrainerTeachingSchedule) {
		this.store.dispatch(
			MasterStateAction.DeleteTrainerTeachingSchedule({
				trainerTeachingScheduleId: schedule.TrainerTeachingScheduleId
			})
		)
	}
	deleteTraineeTrainingSchedule(schedule: TraineeSchedule) {
		this.loadingFormInsertTrainingSchedule$.next(true);
		this.store.dispatch(
			MasterStateAction.DeleteTraineeSchedules({ 
				traineeScheduleIds: [schedule.TraineeScheduleId],
				note: ''
			})
		);
	}
	massDeleteTraineeTrainingSchedule() {
		this.loadingFormInsertTrainingSchedule$.next(true);
		this.store.dispatch(
			MasterStateAction.DeleteTraineeSchedules({ 
				traineeScheduleIds: this.selectedTraineeSchedules.map(s => s.TraineeScheduleId),
				note: ''
			})
		);
	}

	// OPTIONAL: Add regex here to learn more about regex hehehe
	trainingScheduleFormat({ value }: AbstractControl): ValidationErrors {
		if (false) return { regexError: true };
		else return {};
	}

	isRoomLink(room: string) {
		return room.includes('http');
	}
}
