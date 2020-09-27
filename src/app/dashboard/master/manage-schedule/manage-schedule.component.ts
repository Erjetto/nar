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
import {
	NgForm,
	FormBuilder,
	Validators,
	FormArray,
	FormControl,
	AbstractControl,
} from '@angular/forms';
import * as _ from 'lodash';

/*
NOTE: Schedule HAS NO UPDATE
TODO: 
- Implement loading when pressing DELETE ALL SCHEDULE
- DeleteAllSchedule not implemented in backend yet
- UNCHECKED: Delete all schedule, create trainees, delete trainee
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
		subjectId: ['', Validators.required],
		scheduleType: ['daily'],
		scheduleName: ['', Validators.required],
		scheduleCount: [1, Validators.min(1)],
		scheduleDates: this.fb.array([
      this.fb.control('', Validators.required)
    ]),
		deleteReason: [''],
	});
	deleteAllReason = new FormControl('', Validators.required);
	insertTraineeInScheduleForm = this.fb.group({
		binusianNumbers: ['', Validators.required],
		phase: ['', Validators.required],
		subject: ['', Validators.required],
		schedule: ['', Validators.required],
	});

	variations = 1;
	meetingPerWeek = 0;
	meetings: {
		// Meeting is for specific schedule type, which is ignored for now
		Capacity: number;
		Detail: { ScheduleDate: string; ShiftStart: number; ShiftEnd: number }[];
		MeetingNo: number;
		Room: string;
		SubjectId: string;
		VariationNo: number;
	}[] = [];

	subjectsEntity$: Observable<{ [phaseId: string]: ClientSubject[] }>;
	schedulesEntity$: Observable<{ [subjectId: string]: ClientSchedule[] }>;

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
			// this.insertTraineeCurrPhase$,
			this.insertTraineeInScheduleForm.get('phase').valueChanges,
			this.loadingFormTraineeInSchedule$
		);
		this.viewScheduleList$ = this.getScheduleFromEntity(
			this.viewCurrSubject$,
			this.loadingViewSchedule$
		);
		this.insertTraineeScheduleList$ = this.getScheduleFromEntity(
			this.insertTraineeInScheduleForm.get('subject').valueChanges,
			this.loadingFormTraineeInSchedule$
		);
		//#endregion

		//#region Auto select first in array
		this.phases$.pipe(takeUntil(this.destroyed$)).subscribe((phases) => {
			this.scheduleForm.get('phase').setValue(phases[0]);
			this.insertTraineeInScheduleForm.get('phase').setValue(phases[0]);
			this.viewCurrPhase$.next(phases[0]);
		});

		this.formSubjectList$.pipe(takeUntil(this.destroyed$)).subscribe((subjects) => {
			this.scheduleForm.get('subjectId').setValue(subjects[0]?.SubjectId);
		});

		this.viewSubjectList$.pipe(takeUntil(this.destroyed$)).subscribe((subjects) => {
			this.viewCurrSubject$.next(subjects[0]); 
		});

		this.viewScheduleList$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((schedules) => this.viewCurrSchedule$.next(schedules[0]));

      // Insert Trainee in Schedule Form
		this.insertTraineeSubjectList$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((subjects) =>
				this.insertTraineeInScheduleForm.get('subject').setValue(subjects[0])
			);
		this.insertTraineeScheduleList$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((schedules) =>
				this.insertTraineeInScheduleForm.get('schedule').setValue(schedules[0])
			);
		//#endregion

		//#region Subscribe to effects
		// Loading & Reload purpose
		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			// These three has crud request so we must manually stop loading
			// in case of failed request
			this.loadingFormSchedule$.next(false);
			this.loadingFormTraineeInSchedule$.next(false);
		});

		// Auto reload phases
		this.mainEffects.changeGen$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(MasterStateAction.FetchPhases());
		});

		// Auto reload schedule
		merge(
			this.masterEffects.createSchedule$,
			this.masterEffects.deleteSchedule$,
			this.masterEffects.deleteAllSchedule$
		)
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.viewCurrSubject$))
			.subscribe(([act, sub]) => {
				// Reset except phase & subject ng-select
				const { phase, subjectId } = this.scheduleForm.value;
				this.scheduleForm.reset({ phase, subjectId });
				if (!!sub)
					this.store.dispatch(MasterStateAction.FetchSchedules({ subjectId: sub.SubjectId }));
			});

		// Auto reload trainees in schedule
		merge(this.masterEffects.createTraineeInSchedule$, this.masterEffects.deleteTraineeInSchedule$)
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.viewCurrSchedule$))
			.subscribe(([act, sch]) => {
				if (!!sch)
					this.store.dispatch(
						MasterStateAction.FetchTraineeInSchedule({ scheduleId: sch.ScheduleId })
					);
			});

		//#endregion

		// Get trainee in schedule when change schedule
		this.viewCurrSchedule$
			.pipe(
				filter((v) => !_.isEmpty(v)),
				distinctUntilChanged(),
				takeUntil(this.destroyed$)
			)
			.subscribe((schedule) =>
				this.store.dispatch(
					MasterStateAction.FetchTraineeInSchedule({ scheduleId: schedule.ScheduleId })
				)
			);
		this.store.dispatch(MasterStateAction.FetchPhases());
	}
	//#region Easy get scheduleForm
	get isEditing() {
		return !_.isEmpty(this.scheduleForm.get('currentSchedule').value);
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
			subjectId: schedule.ScheduleId,
			scheduleType: schedule.scheduleType,
			scheduleName: schedule.ScheduleName,
			scheduleCount: schedule.ScheduleDates?.length,
		});
	}

	submitScheduleForm() {
		const { subjectId, scheduleName, scheduleDates } = this.scheduleForm.value;
		this.store.dispatch(
			MasterStateAction.CreateDailySchedule({
				subjectId,
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
		this.loadingFormSchedule$.next(true);
	}

	deleteAllSchedule() {
		this.store.dispatch(
			MasterStateAction.DeleteAllSchedule({ reason: this.deleteAllReason.value })
		);
		this.loadingFormSchedule$.next(true);
	}

	updateScheduleDates(count: number) {
		// If needed more
		while (count - this.scheduleDates.length > 0) {
			this.scheduleDates.push(this.fb.control(''));
		}
		// If needed less
		while (count - this.scheduleDates.length < 0) {
			this.scheduleDates.removeAt(this.scheduleDates.length - 1);
		}

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
		// 		const meeting = _.cloneDeep(newVariant);
		// 		meeting.MeetingNo = i;
		// 		meeting.VariationNo = j;
		// 		for (let k = 0; k < this.scheduleCount; k++) meeting.Detail.push(_.cloneDeep(detail));

		// 		this.meetings = [...this.meetings, meeting];
		// 	}
		// }

		// console.log(this.meetings);
	}

	insertTraineeInSchedule() {
		const { binusianNumbers, phase, subject, schedule } = this.insertTraineeInScheduleForm.value;
		this.store.dispatch(
			MasterStateAction.CreateTraineeInSchedule({
				binusianNumbers: binusianNumbers.split('\n'),
				phaseId: phase.PhaseId,
				subjectId: subject.SubjectId,
				scheduleId: schedule.ScheduleId,
			})
		);
		this.loadingFormTraineeInSchedule$.next(true);
	}

	cancelEdit() {
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
			}),
			distinctUntilChanged()
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
			}),
			distinctUntilChanged()
		);
	}
}
