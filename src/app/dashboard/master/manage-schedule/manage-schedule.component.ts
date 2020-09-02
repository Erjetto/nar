import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { ClientPhase, ClientSubject, ClientSchedule, ClientTrainee } from 'src/app/shared/models';
import { filter, tap, takeUntil, map } from 'rxjs/operators';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable } from 'rxjs';
import * as MasterStateAction from 'src/app/shared/stores/master/master.action';
import * as fromMasterState from 'src/app/shared/stores/master/master.reducer';
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

	public traineeInSchedule: ClientTrainee[];

	public traineeInScheduleLoading$: Observable<boolean>;
	public traineeInSchedule$: Observable<ClientTrainee[]>;

	public scheduleInSubjectLoading$: Observable<boolean>;
	public schedules$: Observable<ClientSchedule[]>;

	public subjects$: Observable<ClientSubject[]>;
	public phases$: Observable<ClientPhase[]>;

	public phaseTypes = [{ key: 'ar', val: 'Assistant Recruitment' }];

	public editForm: ClientSchedule;

	constructor(protected store: Store<IAppState>) {
		super(store);
	}

	ngOnInit(): void {
		//#region bind to store
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.subjects$ = this.store.pipe(select(fromMasterState.getSubjects));
		this.schedules$ = this.store.pipe(select(fromMasterState.getSchedules));
		this.traineeInSchedule$ = this.store.pipe(select(fromMasterState.getTraineeInSchedule));

		this.traineeInScheduleLoading$ = this.store.pipe(
			select(fromMasterState.getMasterState),
			map(
				(v) =>
					v.loadingPhases || v.loadingSubjects || v.loadingSchedules || v.loadingTraineeInSchedule
			)
		);
		this.scheduleInSubjectLoading$ = this.store.pipe(
			select(fromMasterState.getMasterState),
			map((v) => v.loadingPhases || v.loadingSubjects || v.loadingSchedules)
		);
		//#endregion

		//#region auto fetch new subject,schedule & trainee when fetch
		this.phases$
			.pipe(
				filter((res) => !isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((res) => this.onChangePhase(res[0]));

		this.subjects$
			.pipe(
				filter((res) => !isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((res) => this.onChangeSubject(res[0]));

		this.schedules$
			.pipe(
				filter((res) => !isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((res) => this.onChangeSchedule(res[0]));
		//#endregion

		this.reloadView();
	}

	reloadView() {
		this.store.dispatch(MasterStateAction.FetchPhases());
	}

	getPhaseType(key) {
		return this.phaseTypes.find((p) => p.key === key).val;
	}

	onDeleteTrainee(trainee) {}

	onChangePhase($event: ClientPhase) {
		this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: $event.PhaseId }));
	}
	onChangeSubject($event: ClientSubject) {
		this.store.dispatch(MasterStateAction.FetchSchedules({ subjectId: $event.SubjectId }));
	}
	onChangeSchedule($event: ClientSchedule) {
		this.store.dispatch(
			MasterStateAction.FetchTraineeInSchedule({
				scheduleId: $event.ScheduleId,
			})
		);
	}

	onSelectSchedule(schedule) {
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
					subjectId: selectSubject.value,
					scheduleType: scheduleTypeRadio.value,
					scheduleCount: scheduleCount.value,
					scheduleName: scheduleName.value,
					dataSchedule: this.meetings,
					start: scheduleStart.value,
					end: scheduleEnd.value,
					excTrainee: [],
				})
			);
		// else
		// 	this.store.dispatch(
		// 		MasterStateAction.UpdatePhase({
		// 			PhaseId: this.editForm.PhaseId,
		// 			Description: name.value,
		// 			EndDate: endDate.value,
		// 			StartDate: beginDate.value,
		// 		})
		// 	);
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

	onDeleteSchedule() {}

	onCancelEdit() {
		this.editForm = null;
	}

	onClick() {}
}
