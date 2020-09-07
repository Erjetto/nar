import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientPhase, ClientSubject, ClientSchedule, ClientTrainee } from 'src/app/shared/models';
import { takeUntil, map, withLatestFrom, tap, filter, distinctUntilChanged } from 'rxjs/operators';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, BehaviorSubject, combineLatest, merge } from 'rxjs';
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
		phaseId: [''],
		phase: [''],
		subject: [''],
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
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.scheduleForm
			.get('scheduleCount')
			.valueChanges.subscribe((val) => this.updateMeetingForm(val));

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
		//#endregion

		//#region Get from entity
		this.formSubjectList$ = this.getSubjectFromEntity(this.scheduleForm.get('phase').valueChanges);
		this.viewSubjectList$ = this.getSubjectFromEntity(this.viewCurrPhase$);
		this.insertTraineeSubjectList$ = this.getSubjectFromEntity(this.insertTraineeCurrPhase$);

		this.viewScheduleList$ = this.getScheduleFromEntity(this.viewCurrSubject$);
		this.insertTraineeScheduleList$ = this.getScheduleFromEntity(this.insertTraineeCurrSubject$);
		//#endregion

		//#region Auto select first in array
		this.phases$.pipe(takeUntil(this.destroyed$)).subscribe((phases) => {
			if (!this.scheduleForm.get('phase').value) this.scheduleForm.get('phase').setValue(phases[0]);

			this.viewCurrPhase$.next(phases[0]);
			this.insertTraineeCurrPhase$.next(phases[0]);
		});

		this.formSubjectList$.pipe(takeUntil(this.destroyed$)).subscribe((subjects) => {
			this.scheduleForm.get('subject').setValue(subjects[0]);
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
		this.mainEffects.afterRequest$
			.pipe(
				takeUntil(this.destroyed$),
				withLatestFrom(this.viewCurrSubject$, this.viewCurrSchedule$)
			)
			.subscribe(([action, subject, schedule]) => {
				// These three has crud request so we must manually stop loading
				// in case of failed request
				this.loadingViewSchedule$.next(false);
				this.loadingFormSchedule$.next(false);
				this.loadingFormTraineeInSchedule$.next(false);

				if (!action.type.includes('Fetch')) {
					// If not fetch
					this.store.dispatch(MasterStateAction.FetchSchedules({ subjectId: subject.SubjectId }));
					this.store.dispatch(
						MasterStateAction.FetchTraineeInSchedule({ scheduleId: schedule.ScheduleId })
					);
				}
			});
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

	// get isEditing() {
	// 	return this.scheduleForm.get('phaseId').value !== '';
	// }

	get scheduleDates(): FormArray {
		return this.scheduleForm.get('scheduleDates') as FormArray;
	}
	get scheduleCount(): number {
		return this.scheduleForm.get('scheduleCount').value as number;
	}

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

	// selectSchedule(schedule) {
	//   // this.editForm$.next(schedule);
	// }

	submitScheduleForm() {
		// const {
		// 	selectSubject,
		// 	scheduleTypeRadio,
		// 	scheduleCount,
		// 	scheduleName,
		// 	scheduleStart,
		// 	scheduleEnd,
		// } = form.value;
		// if (!this.editForm$.value)
		// 	this.store.dispatch(
		// 		MasterStateAction.CreateSchedule({
		// 			subjectId: selectSubject.SubjectId,
		// 			scheduleType: scheduleTypeRadio,
		// 			scheduleCount,
		// 			scheduleName,
		// 			dataSchedule: this.meetings,
		// 			start: scheduleStart,
		// 			end: scheduleEnd,
		// 			excTrainee: [],
		// 		})
		// 	);
	}

	deleteSchedule(form: NgForm) {
		const { reasonText } = form.value;
		this.store.dispatch(
			MasterStateAction.DeleteSchedule({
				scheduleId: this.editForm$.value.ScheduleId,
				reason: reasonText,
			})
		);
	}

	updateMeetingForm(count: number) {
		const diff = count - this.scheduleDates.length;
		console.log(this.scheduleForm.get('scheduleCount').value);
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

	deleteAllSchedule() {
		this.store.dispatch(MasterStateAction.DeleteAllSchedule());
		this.loadingFormSchedule$.next(true);
	}

	cancelEdit() {
		// this.editForm$.next(null);
		this.scheduleForm.reset();
	}

	getSubjectFromEntity(phaseObservable: Observable<ClientPhase>) {
		return combineLatest([this.subjectsEntity$, phaseObservable]).pipe(
			map(([entity, currPhase]) => {
				if (!currPhase) return [];
				if (!!entity[currPhase.PhaseId]) return entity[currPhase.PhaseId];
				else {
					this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: currPhase.PhaseId }));
					return [];
				}
			})
		);
	}

	getScheduleFromEntity(subjectObservable: Observable<ClientSubject>) {
		return combineLatest([this.schedulesEntity$, subjectObservable]).pipe(
			map(([entity, currSubj]) => {
				if (!currSubj) return [];
				if (!!currSubj && !!entity[currSubj.SubjectId]) return entity[currSubj.SubjectId];
				else {
					this.store.dispatch(MasterStateAction.FetchSchedules({ subjectId: currSubj.SubjectId }));
					return [];
				}
			})
		);
	}
}
