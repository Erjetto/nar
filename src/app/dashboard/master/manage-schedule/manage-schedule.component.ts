import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import {
	ClientPhase,
	ClientSubject,
	ClientSchedule,
	ClientTrainee,
	ClientNote,
} from 'src/app/shared/models';
import { filter, tap, takeUntil, map, withLatestFrom } from 'rxjs/operators';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { fromMainState, MainStateAction, fromMasterState, MasterStateAction } from 'src/app/shared/store-modules';
import { isEmpty, cloneDeep } from 'lodash';
import { NgForm } from '@angular/forms';

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

	public subjectEntity$: Observable<{ [phaseId: string]: ClientSubject[] }>;
	public scheduleEntity$: Observable<{ [subjectId: string]: ClientSchedule[] }>;

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

	public traineeInScheduleLoading$: Observable<boolean>;
	public traineeInSchedule$: Observable<ClientTrainee[]>;

	public scheduleInSubjectLoading$: Observable<boolean>;
	// public schedules$: Observable<ClientSchedule[]>;
	// public subjects$: Observable<ClientSubject[]>;
	public phases$: Observable<ClientPhase[]>;

	public phaseTypes = [{ key: 'ar', val: 'Assistant Recruitment' }];

	public editForm: ClientSchedule;

	constructor(protected store: Store<IAppState>) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.subjectEntity$ = this.store.pipe(select(fromMasterState.getSubjectsEntity));
		this.scheduleEntity$ = this.store.pipe(select(fromMasterState.getSchedulesEntity));
		this.traineeInSchedule$ = this.store.pipe(select(fromMasterState.getTraineesInSchedule));
		this.scheduleInSubjectLoading$ = this.store.pipe(select(fromMasterState.isSchedulesLoading));
		this.traineeInScheduleLoading$ = this.store.pipe(
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
		this.phases$
			.pipe(
				takeUntil(this.destroyed$),
				map((phases) => {
					this.formCurrPhase$.next(phases[0]);
					this.viewCurrPhase$.next(phases[0]);
					this.insertTraineeCurrPhase$.next(phases[0]);
				})
			)
			.subscribe();

		this.viewSubjectList$
			.pipe(
				takeUntil(this.destroyed$),
				map((subjects) => this.viewCurrSubject$.next(subjects[0]))
			)
			.subscribe();

		this.viewScheduleList$
			.pipe(
				takeUntil(this.destroyed$),
				map((schedules) => this.viewCurrSchedule$.next(schedules[0]))
			)
			.subscribe();

		this.insertTraineeSubjectList$
			.pipe(
				takeUntil(this.destroyed$),
				map((subjects) => this.insertTraineeCurrSubject$.next(subjects[0]))
			)
			.subscribe();
		//#endregion

		this.store.dispatch(MasterStateAction.FetchPhases());
	}

	getPhaseType(key) {
		return this.phaseTypes.find((p) => p.key === key).val;
	}

	deleteTrainee(trainee) {}

	selectSchedule(schedule) {
		this.editForm = schedule;
	}

	submitScheduleForm(form: NgForm) {
		console.log(form);

		const {
			selectSubject,
			scheduleTypeRadio,
			scheduleCount,
			scheduleName,
			scheduleStart,
			scheduleEnd,
		} = form.controls;

		if (this.editForm == null)
			this.store.dispatch(
				MasterStateAction.CreateSchedule({
					subjectId: selectSubject.value.SubjectId,
					scheduleType: scheduleTypeRadio.value,
					scheduleCount: scheduleCount.value,
					scheduleName: scheduleName.value,
					dataSchedule: this.meetings,
					start: scheduleStart.value,
					end: scheduleEnd.value,
					excTrainee: [],
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
		console.log(form);
		const { selectSubject, selectSchedule, selectPhase, traineeText } = form.controls;
    const trainees: string[] = traineeText.value.split('\n');
    if(trainees.some(t => )) 
      this.store.dispatch(MainState)

		if (this.editForm == null)
			this.store.dispatch(
				MasterStateAction.CreateTraineeInSchedule({
					binusianNumbers: trainees,
					phaseId: selectPhase.value.PhaseId,
					subjectId: selectSubject.value.SubjectId,
					scheduleId: selectSchedule.value.ScheduleId,
				})
			);
	}

	updateSchedule(form: NgForm) {}
	deleteSchedule(form: NgForm) {}

	cancelEdit() {
		this.editForm = null;
	}

	getSubjectFromEntity(phaseObservable: Observable<ClientPhase>) {
		return combineLatest([this.subjectEntity$, phaseObservable]).pipe(
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
		return combineLatest([this.scheduleEntity$, subjectObservable]).pipe(
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
