import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientPhase, ClientSubject, ClientSchedule, ClientTrainee } from 'src/app/shared/models';
import { takeUntil, map, withLatestFrom, tap, filter } from 'rxjs/operators';
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
import { NgForm } from '@angular/forms';

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
	public viewDateFormat = 'EEEE, dd MMM yyyy';

	// Question: Template driven form instead of model driven?
	// public scheduleForm = new FormGroup({
	//   subjectId: new FormControl(),
	//   scheduleName: new FormControl(),
	//   canSelfRegister: new FormControl(),
	//   dataSchedule: new FormArray([]),
	//   start: new FormControl(),
	//   end: new FormControl(),
	//   excTrainee: new FormControl()
	// });
	public scheduleCount = 1;
	public variations = 1;
	public meetingPerWeek = 0;
	public meetings: {
		Capacity: number;
		Detail: { ScheduleDate: string; ShiftStart: number; ShiftEnd: number }[];
		MeetingNo: number;
		Room: string;
		SubjectId: string;
		VariationNo: number;
	}[] = [];

	public subjectsEntity$: Observable<{ [phaseId: string]: ClientSubject[] }>;
	public schedulesEntity$: Observable<{ [subjectId: string]: ClientSchedule[] }>;

	public formCurrPhase$ = new BehaviorSubject<ClientPhase>(null);

	public viewCurrPhase$ = new BehaviorSubject<ClientPhase>(null);
	public viewCurrSubject$ = new BehaviorSubject<ClientSubject>(null);
	public viewCurrSchedule$ = new BehaviorSubject<ClientSchedule>(null);

	public insertTraineeCurrPhase$ = new BehaviorSubject<ClientPhase>(null);
	public insertTraineeCurrSubject$ = new BehaviorSubject<ClientSubject>(null);

	public formSubjectList$: Observable<ClientSubject[]>;

	public viewSubjectList$: Observable<ClientSubject[]>;
	public viewScheduleList$: Observable<ClientSchedule[]>;

	public insertTraineeSubjectList$: Observable<ClientSubject[]>;
	public insertTraineeScheduleList$: Observable<ClientSchedule[]>;

	public traineeInSchedule$: Observable<ClientTrainee[]>;

	public loadingFormSchedule$ = new BehaviorSubject<boolean>(false);
	public loadingFormTraineeInSchedule$ = new BehaviorSubject<boolean>(false);
	public loadingViewTraineeInSchedule$: Observable<boolean>;
	public loadingViewSchedule$: Observable<boolean>;
	public phases$: Observable<ClientPhase[]>;

	public phaseTypes = [{ key: 'ar', val: 'Assistant Recruitment' }];

	public editForm$ = new BehaviorSubject<ClientSchedule>(null);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private masterEffects: MasterStateEffects
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.subjectsEntity$ = this.store.pipe(select(fromMasterState.getSubjectsEntity));
		this.schedulesEntity$ = this.store.pipe(select(fromMasterState.getSchedulesEntity));
		this.traineeInSchedule$ = this.store.pipe(select(fromMasterState.getTraineesInSchedule));
		this.loadingViewSchedule$ = this.store.pipe(select(fromMasterState.isSchedulesLoading));
		this.loadingViewTraineeInSchedule$ = this.store.pipe(
			select(fromMasterState.isTraineeInScheduleLoading)
		);
		//#endregion

		//#region Get from entity
		this.formSubjectList$ = this.getSubjectFromEntity(this.formCurrPhase$);
		this.viewSubjectList$ = this.getSubjectFromEntity(this.viewCurrPhase$);
		this.insertTraineeSubjectList$ = this.getSubjectFromEntity(this.insertTraineeCurrPhase$);

		this.viewScheduleList$ = this.getScheduleFromEntity(this.viewCurrSubject$);
		this.insertTraineeScheduleList$ = this.getScheduleFromEntity(this.insertTraineeCurrSubject$);
		//#endregion

		//#region Auto select first in array
		this.phases$.pipe(takeUntil(this.destroyed$)).subscribe((phases) => {
			this.formCurrPhase$.next(phases[0]);
			this.viewCurrPhase$.next(phases[0]);
			this.insertTraineeCurrPhase$.next(phases[0]);
		});

		this.viewSubjectList$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((subjects) => this.viewCurrSubject$.next(subjects[0]));

		this.viewScheduleList$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((schedules) => this.viewCurrSchedule$.next(schedules[0]));

		this.insertTraineeSubjectList$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((subjects) => this.insertTraineeCurrSubject$.next(subjects[0]));
		//#endregion

    //#region Subscribe to effects
		// Loading & Reload purpose
		merge(this.mainEffects.crudSuccess$)
			.pipe(
				takeUntil(this.destroyed$),
				withLatestFrom(this.viewCurrSubject$, this.viewCurrSchedule$)
			)
			.subscribe(([action, subject, schedule]) => {
				this.loadingFormSchedule$.next(false);
        this.loadingFormTraineeInSchedule$.next(false);
        
				this.store.dispatch(MasterStateAction.FetchSchedules({ subjectId: subject.SubjectId }));
				this.store.dispatch(
					MasterStateAction.FetchTraineeInSchedule({ scheduleId: schedule.ScheduleId })
				);
			});
		//#endregion
		this.viewCurrSubject$
			.pipe(
				filter((v) => !isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((subject) =>
				this.store.dispatch(MasterStateAction.FetchSchedules({ subjectId: subject.SubjectId }))
			);
		this.viewCurrSchedule$
			.pipe(
				filter((v) => !isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((schedule) =>
				this.store.dispatch(
					MasterStateAction.FetchTraineeInSchedule({ scheduleId: schedule.ScheduleId })
				)
			);
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

	selectSchedule(schedule) {
		this.editForm$.next(schedule);
	}

	submitScheduleForm(form: NgForm) {
		const {
			selectSubject,
			scheduleTypeRadio,
			scheduleCount,
			scheduleName,
			scheduleStart,
			scheduleEnd,
		} = form.value;

		if (!this.editForm$.value)
			this.store.dispatch(
				MasterStateAction.CreateSchedule({
					subjectId: selectSubject.SubjectId,
					scheduleType: scheduleTypeRadio,
					scheduleCount,
					scheduleName,
					dataSchedule: this.meetings,
					start: scheduleStart,
					end: scheduleEnd,
					excTrainee: [],
				})
			);
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

	updateMeetingForm() {
		// - this.meetings.length;
		const detail = { ScheduleDate: '', ShiftStart: 1, ShiftEnd: 1 };
		const newVariant = {
			Capacity: 0,
			Detail: [],
			MeetingNo: 0,
			Room: '',
			SubjectId: '',
			VariationNo: 0,
		};
		this.meetings = [];

		for (let i = 0; i < this.meetingPerWeek; i++) {
			for (let j = 0; j < this.variations; j++) {
				const meeting = cloneDeep(newVariant);
				meeting.MeetingNo = i;
				meeting.VariationNo = j;
				for (let k = 0; k < this.scheduleCount; k++) meeting.Detail.push(cloneDeep(detail));

				this.meetings = [...this.meetings, meeting];
			}
		}

		console.log(this.meetings);
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
	}

	deleteAllSchedule() {
		this.store.dispatch(MasterStateAction.DeleteAllSchedule());
	}

	cancelEdit() {
		this.editForm$.next(null);
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
