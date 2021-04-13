import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientPhase, ClientSubject, ClientSchedule, ClientTrainee } from 'src/app/shared/models';
import { takeUntil, withLatestFrom, filter, distinctUntilChanged, tap } from 'rxjs/operators';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import {
	fromMasterState,
	MasterStateAction,
	MasterStateEffects,
	MainStateEffects,
	MainStateAction,
} from 'src/app/shared/store-modules';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { isEmpty as _isEmpty } from 'lodash';
import { adjustControlsInFormArray, allValuesNotEmpty } from 'src/app/shared/methods';

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

	scheduleForm = this.fb.group({
		currentSchedule: [null], // For editing purpose
		// phase: ['', Validators.required],
		phaseId: ['', Validators.required],
		subjectId: ['', Validators.required],
		scheduleType: ['daily'],
		scheduleName: ['', Validators.required],
		scheduleCount: [1, Validators.min(1)],
		scheduleDates: this.fb.array([this.fb.control('', Validators.required)]),
		deleteReason: [''],
	});
	deleteAllReason = new FormControl('', Validators.required);
	insertTraineeInScheduleForm = this.fb.group({
		binusianNumbers: ['', Validators.required],
		phaseId: ['', Validators.required],
		subjectId: ['', Validators.required],
		scheduleId: ['', Validators.required],
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

	viewCurrentPhase$ = new BehaviorSubject<ClientPhase>(null);
	viewCurrentSubject$ = new BehaviorSubject<ClientSubject>(null);
	viewCurrentSchedule$ = new BehaviorSubject<ClientSchedule>(null);

	// insertTraineeCurrPhase$ = new BehaviorSubject<ClientPhase>(null);
	// insertTraineeCurrSubject$ = new BehaviorSubject<ClientSubject>(null);

	// formSubjectList$: Observable<ClientSubject[]>;

	viewSubjectList$: Observable<ClientSubject[]>;
	viewScheduleList$: Observable<ClientSchedule[]>;

	// insertTraineeSubjectList$: Observable<ClientSubject[]>;
	// insertTraineeScheduleList$: Observable<ClientSchedule[]>;

	traineeInSchedule$: Observable<ClientTrainee[]>;

	loadingFormSchedule$ = new BehaviorSubject(false);
	loadingFormTraineeInSchedule$ = new BehaviorSubject(false);
	loadingViewSchedule$ = new BehaviorSubject(false);
	loadingViewTraineeInSchedule$ = new BehaviorSubject(false);
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
		
		this.phases$ = this.store.pipe(
			select(fromMasterState.getPhases),
			filter((res) => !_isEmpty(res)),
			tap((res) => this.viewCurrentPhase$.next(res[0])) // Auto first in select
		);
		this.loadingSchedule$ = this.store.pipe(select(fromMasterState.isSchedulesLoading));
		this.loadingSubject$ = this.store.pipe(select(fromMasterState.isSubjectsLoading));

		this.traineeInSchedule$ = this.store.pipe(select(fromMasterState.getTraineesInSchedule));
		this.store
			.pipe(select(fromMasterState.isTraineeInScheduleLoading), takeUntil(this.destroyed$))
			.subscribe(this.loadingViewTraineeInSchedule$);

		//#endregion

		//#region Get from entity, and show reload animation
		this.viewSubjectList$ = fromMasterState
			.getSubjectsFromEntity(this.store, this.viewCurrentPhase$, this.loadingViewSchedule$)
			.pipe(
				filter((res) => !_isEmpty(res)),
				tap((res) => this.viewCurrentSubject$.next(res[0])) // Auto first in ng-select
			);
		this.viewScheduleList$ = fromMasterState
			.getSchedulesFromEntity(this.store, this.viewCurrentSubject$, this.loadingViewSchedule$)
			.pipe(
				filter((res) => !_isEmpty(res)),
				tap((res) => this.viewCurrentSubject$.next(res[0])) // Auto first in ng-select
			);
		//#endregion

		//#region auto fill form
		this.viewCurrentSubject$
			.pipe(
				takeUntil(this.destroyed$),
				withLatestFrom(this.viewCurrentPhase$),
				filter(allValuesNotEmpty)
			)
			.subscribe(([sub, phs]) => {
				this.scheduleForm.patchValue({
					subjectId: sub.SubjectId,
					phaseId: phs.PhaseId,
				});
			});
		this.viewCurrentSchedule$
			.pipe(
				takeUntil(this.destroyed$),
				withLatestFrom(this.viewCurrentPhase$, this.viewCurrentSubject$),
				filter(allValuesNotEmpty)
			)
			.subscribe(([sch, phs, sub]) => {
				this.insertTraineeInScheduleForm.patchValue({
					scheduleId: sch.ScheduleId,
					subjectId: sub.SubjectId,
					phaseId: phs.PhaseId,
				});
			});
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
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.viewCurrentSubject$))
			.subscribe(([act, sub]) => {
				// Reset except phase & subject ng-select
				this.cancelEdit();
				if (!!sub)
					this.store.dispatch(MasterStateAction.FetchSchedules({ subjectId: sub.SubjectId }));
			});

		// Auto reload trainees in schedule
		merge(this.masterEffects.createTraineeInSchedule$, this.masterEffects.deleteTraineeInSchedule$)
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.viewCurrentSchedule$))
			.subscribe(([act, sch]) => {
				if (!!sch)
					this.store.dispatch(
						MasterStateAction.FetchTraineeInSchedule({ scheduleId: sch.ScheduleId })
					);
			});

		//#endregion

		// Get trainee in schedule when change schedule
		this.viewCurrentSchedule$
			.pipe(
				filter((v) => !_isEmpty(v)),
				distinctUntilChanged(),
				takeUntil(this.destroyed$)
			)
			.subscribe((schedule) =>
				this.store.dispatch(
					MasterStateAction.FetchTraineeInSchedule({ scheduleId: schedule.ScheduleId })
				)
			);

		// Fetch the phases
		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
	}
	//#region Easy get scheduleForm
	get isEditing() {
		return !_isEmpty(this.scheduleForm.get('currentSchedule').value);
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

	selectSchedule(schedule: ClientSchedule) {
		this.scheduleForm.patchValue({
			currentSchedule: schedule,
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
		adjustControlsInFormArray(this.scheduleDates, count);
		return;
		// NOTE: Ini fitur dulu, sepertinya sudah tak dipake
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
		// 		const meeting = _cloneDeep(newVariant);
		// 		meeting.MeetingNo = i;
		// 		meeting.VariationNo = j;
		// 		for (let k = 0; k < this.scheduleCount; k++) meeting.Detail.push(_cloneDeep(detail));

		// 		this.meetings = [...this.meetings, meeting];
		// 	}
		// }

		// console.log(this.meetings);
	}

	insertTraineeInSchedule() {
		const {
			binusianNumbers,
			phaseId,
			subjectId,
			scheduleId,
		} = this.insertTraineeInScheduleForm.value;
		this.store.dispatch(
			MasterStateAction.CreateTraineeInSchedule({
				binusianNumbers: binusianNumbers.trim().split('\n'),
				phaseId,
				subjectId,
				scheduleId,
			})
		);
		this.loadingFormTraineeInSchedule$.next(true);
	}

	deleteTrainee(trainee: ClientTrainee) {
		this.loadingViewTraineeInSchedule$.next(true);
		this.store.dispatch(
			MasterStateAction.DeleteTraineeInSchedule({
				ScheduleId: this.viewCurrentSchedule$.value.ScheduleId,
				TraineeId: trainee.TraineeId,
			})
		);
	}

	// Reset form
	cancelEdit() {
		const { phaseId, subjectId } = this.scheduleForm.value;
		this.scheduleForm.reset({ phaseId, subjectId, scheduleCount: 1 });
	}
}
