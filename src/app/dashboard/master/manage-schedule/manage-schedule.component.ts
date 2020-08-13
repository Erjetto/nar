import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientPhase, ClientSubject, ClientSchedule, ClientTrainee } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { throwIfEmpty } from 'rxjs/operators';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable } from 'rxjs';
import * as MasterStateAction from 'src/app/shared/stores/master/master.action';
import * as fromMasterState from 'src/app/shared/stores/master/master.reducer';

@Component({
  selector: 'rd-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageScheduleComponent extends DashboardContentBase
implements OnInit, OnDestroy  {

  public viewDateFormat = 'EEEE, dd MMM yyyy';

  public traineeInSchedule: ClientTrainee[];
  
  public traineeInSchedule$: Observable<ClientTrainee[]>;
	public schedules$: Observable<ClientSchedule[]>;
	public subjects$: Observable<ClientSubject[]>;
  public phases$: Observable<ClientPhase[]>;
  
	public schedules: ClientSchedule[];
	public subjects: ClientSubject[];
	public phases: ClientPhase[];
	public phaseTypes = [{ key: 'ar', val: 'Assistant Recruitment' }];

	public editForm: ClientSchedule;

	constructor(
		private store: Store<IAppState>,
		action: ActionsSubject,
	) {
		super(action);
  }
  
	ngOnInit(): void {
    this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
    this.subjects$ = this.store.pipe(select(fromMasterState.getSubjects));
    this.schedules$ = this.store.pipe(select(fromMasterState.getSchedules));
    this.traineeInSchedule$ = this.store.pipe(select(fromMasterState.getTraineeInSchedule));
    // this.phases = MockData.GetPhasesCurrentGeneration.map(ClientPhase.fromJson);
    // this.subjects = MockData.GetSubjectListByPhase.map(ClientSubject.fromJson);
    // this.schedules = MockData.GetSchedules.map(ClientSchedule.fromJson);

    // this.traineeInSchedule = MockData.GetTraineesBySchedule.map(ClientTrainee.fromJson);
	}

	getPhaseType(key) {
		return this.phaseTypes.find((p) => p.key === key).val;
	}

	onDeleteTrainee(trainee){}
  
	onSelectSchedule(schedule){
		this.editForm = schedule;
	}

	onCancelEdit() {
		this.editForm = null;
	}
}
