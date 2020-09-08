import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientPhase, ClientSubject, ClientSchedule, ClientTrainee } from 'src/app/shared/models';
import {
	takeUntil,
	map,
	withLatestFrom,
	tap,
	filter,
	distinctUntilChanged,
	debounceTime,
} from 'rxjs/operators';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, BehaviorSubject, combineLatest, merge, Subject } from 'rxjs';
import {
	fromMasterState,
	MasterStateAction,
	MasterStateEffects,
	MainStateEffects,
} from 'src/app/shared/store-modules';
import { cloneDeep, isEmpty } from 'lodash';
import {
	NgForm,
	FormBuilder,
	Validators,
	FormArray,
	FormControl,
	AbstractControl,
} from '@angular/forms';

/*
NOTE: Schedule HAS NO UPDATE
TODO: 
- Implement loading when pressing DELETE ALL SCHEDULE
- Specific is rarely used, consider removing it
*/

@Component({
	selector: 'rd-manage-schedule',
	templateUrl: './manage-schedule.component.html',
	styleUrls: ['./manage-schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageScheduleComponent extends DashboardContentBase implements OnInit, OnDestroy {
	viewDateFormat = 'EEEE, dd MMM yyyy';

	// Question: Template driven form instead of model driven?
	// scheduleForm = new FormGroup({
	//   subjectId: new FormControl(),
	//   scheduleName: new FormControl(),
	//   canSelfRegister: new FormControl(),
	//   dataSchedule: new FormArray([]),
	//   start: new FormControl(),
	//   end: new FormControl(),
	//   excTrainee: new FormControl()
	// });
	scheduleForm = this.fb.group({
		currentSchedule: [null],
		phase: ['', Validators.required],
		subject: ['', Validators.required],
		scheduleType: ['daily'],
		scheduleName: ['', Validators.required],
		scheduleCount: [1, Validators.min(1)],
		scheduleDates: this.fb.array(['']),
		deleteReason: ['', Validators.required],
	});
	variations = 1;
	meetingPerWeek = 0;
	meetings: {
		Capacity: number;
		Detail: { ScheduleDate: string; ShiftStart: number; ShiftEnd: number }[];
		MeetingNo: number;
		Room: string;
		SubjectId: string;
		VariationNo: number;
	}[] = [];

	subjectsEntity$: Observable<{ [phaseId: string]: ClientSubject[] }>;
	schedulesEntity$: Observable<{ [subjectId: string]: ClientSchedule[] }>;

	formCurrPhase$ = new BehaviorSubject<ClientPhase>(null);

	viewCurrPhase$ = new BehaviorSubject<ClientPhase>(null);
	viewCurrSubject$ = new BehaviorSubject<ClientSubject>(null);
	viewCurrSchedule$ = new BehaviorSubject<ClientSchedule>(null);

	insertTraineeCurrPhase$ = new BehaviorSubject<ClientPhase>(null);
	insertTraineeCurrSubject$ = new BehaviorSubject<ClientSubject>(null);

	formSubjectList$: Observable<ClientSubject[]>;

	viewSubjectList$: Observable<ClientSubject[]>;
	viewScheduleList$: Observable<ClientSchedule[]>;

	insertTraineeSubjectList$: Observable<ClientSubject[]>;
	insertTraineeScheduleList$: Observable<ClientSchedule[]>;

	traineeInSchedule$: Observable<ClientTrainee[]>;

	loadingFormSchedule$ = new BehaviorSubject<boolean>(false);
	loadingFormTraineeInSchedule$ = new BehaviorSubject<boolean>(false);
	loadingViewSchedule$ = new BehaviorSubject<boolean>(false);
	loadingViewTraineeInSchedule$: Observable<boolean>;
	loadingSubject$: Observable<boolean>;
	loadingSchedule$: Observable<boolean>;
	phases$: Observable<ClientPhase[]>;

	phaseTypes = [{ key: 'ar', val: 'Assistant Recruitment' }];

	editForm$ = new BehaviorSubject<ClientSchedule>(null);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private masterEffects: MasterStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.scheduleForm
			.get('scheduleCount')
			.valueChanges.subscribe((val) => this.updateScheduleDates(val));

		//#region Bind to store
		this.subjectsEntity$ = this.store.pipe(select(fromMasterState.getSubjectsEntity));
		this.schedulesEntity$ = this.store.pipe(select(fromMasterState.getSchedulesEntity));

		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.loadingSchedule$ = this.store.pipe(select(fromMasterState.isSchedulesLoading));
		this.loadingSubject$ = this.store.pipe(select(fromMasterState.isSubjectsLoading));

		this.traineeInSchedule$ = this.store.pipe(select(fromMasterState.getTraineesInSchedule));
		this.loadingViewTraineeInSchedule$ = this.store.pipe(
			select(fromMasterState.isTraineeInScheduleLoading)
		);

		// this.loadingSchedule$
		// 	.pipe(takeUntil(this.destroyed$))
		// 	.subscribe(this.loadingViewSchedule$.next);
		//#endregion

		//#region Get from entity, and show reload animation
		this.formSubjectList$ = this.getSubjectFromEntity(
			this.scheduleForm.get('phase').valueChanges,
			this.loadingFormSchedule$
		);
		this.viewSubjectList$ = this.getSubjectFromEntity(
			this.viewCurrPhase$
			// this.loadingViewSchedule$
		);
		this.insertTraineeSubjectList$ = this.getSubjectFromEntity(
			this.insertTraineeCurrPhase$,
			this.loadingFormTraineeInSchedule$
		);
		this.viewScheduleList$ = this.getScheduleFromEntity(
			this.viewCurrSubject$,
			this.loadingViewSchedule$
		);
		this.insertTraineeScheduleList$ = this.getScheduleFromEntity(this.insertTraineeCurrSubject$);
		//#endregion

		//#region Auto select first in array
		this.phases$.pipe(takeUntil(this.destroyed$)).subscribe((phases) => {
			if (!this.scheduleForm.get('phase').value) this.scheduleForm.get('phase').setValue(phases[0]);

			this.viewCurrPhase$.next(phases[0]);
			this.insertTraineeCurrPhase$.next(phases[0]);
		});

		this.formSubjectList$.pipe(takeUntil(this.destroyed$)).subscribe((subjects) => {
			this.scheduleForm.get('subject').setValue(subjects[0]?.SubjectId);
		});

		this.viewSubjectList$.pipe(takeUntil(this.destroyed$)).subscribe((subjects) => {
			this.viewCurrSubject$.next(subjects[0]);
		});

		this.viewScheduleList$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((schedules) => this.viewCurrSchedule$.next(schedules[0]));

		this.insertTraineeSubjectList$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((subjects) => this.insertTraineeCurrSubject$.next(subjects[0]));
		//#endregion

		//#region Subscribe to effects
		// Loading & Reload purpose
		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			// These three has crud request so we must manually stop loading
			// in case of failed request
			this.loadingFormSchedule$.next(false);
			this.loadingFormTraineeInSchedule$.next(false);
		});

		merge(
			this.masterEffects.createSchedule$,
			this.masterEffects.deleteSchedule$,
			this.masterEffects.deleteAllSchedule$
		)
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.viewCurrSubject$))
			.subscribe(([act, sub]) =>
				!!sub
					? this.store.dispatch(MasterStateAction.FetchSchedules({ subjectId: sub.SubjectId }))
					: ''
			);

		merge(this.masterEffects.createTraineeInSchedule$, this.masterEffects.deleteTraineeInSchedule$)
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.viewCurrSchedule$))
			.subscribe(([act, sch]) =>
				!!sch
					? this.store.dispatch(
							MasterStateAction.FetchTraineeInSchedule({ scheduleId: sch.ScheduleId })
					  )
					: ''
			);

		//#endregion

		// Get trainee in schedule when change schedule
		this.viewCurrSchedule$
			.pipe(
				filter((v) => !isEmpty(v)),
				distinctUntilChanged(),
				takeUntil(this.destroyed$)
			)
			.subscribe((schedule) =>
				this.store.dispatch(
					MasterStateAction.FetchTraineeInSchedule({ scheduleId: schedule.ScheduleId })
				)
			);
	}
//#region Easy get scheduleForm
	get isEditing() {
		return !!this.scheduleForm.get('currentSchedule').value;
	}
	get scheduleDates(): FormArray {
		return this.scheduleForm.get('scheduleDates') as FormArray;
	}
	get scheduleCount(): number {
		return this.scheduleForm.get('scheduleCount').value as number;
	}
//#endregion

	getPhaseType(key) {
		return this.phaseTypes.find((p) => p.key === key).val;
	}

	deleteTrainee(trainee: ClientTrainee) {
		this.store.dispatch(
			MasterStateAction.DeleteTraineeInSchedule({
				ScheduleId: this.viewCurrSchedule$.value.ScheduleId,
				TraineeId: trainee.TraineeId,
			})
		);
	}

	selectSchedule(schedule: ClientSchedule) {
		this.scheduleForm.patchValue({
			currentSchedule: schedule,
			// phase: schedule.ScheduleId,
			subject: schedule.ScheduleId,
			scheduleType: schedule.scheduleType,
			scheduleName: schedule.ScheduleName,
			scheduleCount: schedule.ScheduleDates?.length,
		});
		// this.editForm$.next(schedule);
	}

	submitScheduleForm() {
		// if (!this.editForm$.value)
		const {
			subject,
			scheduleName,
			scheduleDates,
		} = this.scheduleForm.value;

		this.store.dispatch(
			MasterStateAction.CreateDailySchedule({
				subjectId: subject,
				scheduleName,
				scheduleDates,
			})
		);
	}

	deleteSchedule() {
		const { currentSchedule, deleteReason } = this.scheduleForm.value;
		this.store.dispatch(
			MasterStateAction.DeleteSchedule({
				scheduleId: currentSchedule.ScheduleId,
				reason: deleteReason,
			})
		);
  }

  // tslint:disable-next-line: member-ordering
  deleteAllReason = '';
	deleteAllSchedule() {
		this.store.dispatch(MasterStateAction.DeleteAllSchedule({reason: this.deleteAllReason}));
		this.loadingFormSchedule$.next(true);
	}

	updateScheduleDates(count: number) {
		const diff = count - this.scheduleDates.length;

		if (diff > 0) this.scheduleDates.push(this.fb.control(''));

		return;
		// - this.meetings.length;
		// const detail = { ScheduleDate: '', ShiftStart: 1, ShiftEnd: 1 };
		// const newVariant = {
		// 	Capacity: 0,
		// 	Detail: [],
		// 	MeetingNo: 0,
		// 	Room: '',
		// 	SubjectId: '',
		// 	VariationNo: 0,
		// };
		// this.meetings = [];

		// for (let i = 0; i < this.meetingPerWeek; i++) {
		// 	for (let j = 0; j < this.variations; j++) {
		// 		const meeting = cloneDeep(newVariant);
		// 		meeting.MeetingNo = i;
		// 		meeting.VariationNo = j;
		// 		for (let k = 0; k < this.scheduleCount; k++) meeting.Detail.push(cloneDeep(detail));

		// 		this.meetings = [...this.meetings, meeting];
		// 	}
		// }

		// console.log(this.meetings);
	}

	insertTraineeInSchedule(form: NgForm) {
		const { selectSubject, selectSchedule, selectPhase, traineeText } = form.value;

		if (this.editForm$.value == null)
			this.store.dispatch(
				MasterStateAction.CreateTraineeInSchedule({
					binusianNumbers: traineeText.split('\n'),
					phaseId: selectPhase.PhaseId,
					subjectId: selectSubject.SubjectId,
					scheduleId: selectSchedule.ScheduleId,
				})
			);
		this.loadingFormTraineeInSchedule$.next(true);
	}


	cancelEdit() {
		// this.editForm$.next(null);
		this.scheduleForm.reset();
	}

	getSubjectFromEntity(phaseObservable: Observable<ClientPhase>, loader?: Subject<boolean>) {
		return combineLatest([this.subjectsEntity$, phaseObservable]).pipe(
			map(([entity, currPhase]) => {
				if (!currPhase) return [];
				if (!!entity[currPhase.PhaseId]) {
					loader?.next(false);
					return entity[currPhase.PhaseId];
				} else {
					loader?.next(true);
					this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: currPhase.PhaseId }));
					return [];
				}
			})
		);
	}

	getScheduleFromEntity(subjectObservable: Observable<ClientSubject>, loader?: Subject<boolean>) {
		return combineLatest([this.schedulesEntity$, subjectObservable]).pipe(
			map(([entity, currSubj]) => {
				if (!currSubj) return [];
				if (!!currSubj && !!entity[currSubj.SubjectId]) {
					loader?.next(false);
					return entity[currSubj.SubjectId];
				} else {
					loader?.next(true);
					this.store.dispatch(MasterStateAction.FetchSchedules({ subjectId: currSubj.SubjectId }));
					return [];
				}
			})
		);
	}
}
