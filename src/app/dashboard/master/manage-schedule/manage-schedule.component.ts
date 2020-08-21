import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	OnDestroy,
} from '@angular/core';
import {
	ClientPhase,
	ClientSubject,
	ClientSchedule,
	ClientTrainee,
} from 'src/app/shared/models';
import {
	filter,
	tap,
	takeUntil,
	map,
} from 'rxjs/operators';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable } from 'rxjs';
import * as MasterStateAction from 'src/app/shared/stores/master/master.action';
import * as fromMasterState from 'src/app/shared/stores/master/master.reducer';
import { isEmpty } from 'lodash';

@Component({
	selector: 'rd-manage-schedule',
	templateUrl: './manage-schedule.component.html',
	styleUrls: ['./manage-schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageScheduleComponent extends DashboardContentBase
	implements OnInit, OnDestroy {
	public viewDateFormat = 'EEEE, dd MMM yyyy';

	public traineeInSchedule: ClientTrainee[];

	public traineeInScheduleLoading$: Observable<boolean>;
  public traineeInSchedule$: Observable<ClientTrainee[]>;
  
	public scheduleInSubjectLoading$: Observable<boolean>;
	public schedules$: Observable<ClientSchedule[]>;
  
  public subjects$: Observable<ClientSubject[]>;
	public phases$: Observable<ClientPhase[]>;

	public phaseTypes = [{ key: 'ar', val: 'Assistant Recruitment' }];

	public editForm: ClientSchedule;

	constructor(private store: Store<IAppState>, action: ActionsSubject) {
		super(action);
	}

	ngOnInit(): void {
    //#region bind to store
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.subjects$ = this.store.pipe(select(fromMasterState.getSubjects));
		this.schedules$ = this.store.pipe(select(fromMasterState.getSchedules));
		this.traineeInSchedule$ = this.store.pipe(select(fromMasterState.getTraineeInSchedule));
    
    this.traineeInScheduleLoading$ = this.store.pipe(
			select(fromMasterState.getMasterState),
			map((v) => v.loadingPhases || v.loadingSubjects || v.loadingSchedules || v.loadingTraineeInSchedule)
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
				tap((res) => this.onChangePhase(res[0])),
				takeUntil(this.destroyed$)
			)
			.subscribe();

		this.subjects$
			.pipe(
				filter((res) => !isEmpty(res)),
				tap((res) => this.onChangeSubject(res[0])),
				takeUntil(this.destroyed$)
			)
			.subscribe();

		this.schedules$
			.pipe(
				filter((res) => !isEmpty(res)),
				tap((res) => this.onChangeSchedule(res[0])),
				takeUntil(this.destroyed$)
			)
			.subscribe();
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
		this.store.dispatch(
			MasterStateAction.FetchSubjects({ phaseId: $event.PhaseId })
		);
	}
	onChangeSubject($event: ClientSubject) {
		this.store.dispatch(
			MasterStateAction.FetchSchedules({ subjectId: $event.SubjectId })
		);
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

  onDeleteSchedule(){
    
  }
  
	onCancelEdit() {
		this.editForm = null;
  }

  onClick(){}
}
