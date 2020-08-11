import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	OnDestroy,
} from '@angular/core';
import { ClientPhase, ClientTrainee } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { LeaderService } from 'src/app/shared/services/new/leader.service';
import { NgForm } from '@angular/forms';
import { GeneralService } from 'src/app/shared/services/new/general.service';
import { Observable } from 'rxjs';

import * as fromMasterState from 'src/app/shared/stores/master/master.reducer'
import * as MasterStateAction from 'src/app/shared/stores/master/master.action'
import { filter, takeUntil, map, tap } from 'rxjs/operators';
import { isEmpty } from 'lodash';

@Component({
	selector: 'rd-manage-phase',
	templateUrl: './manage-phase.component.html',
	styleUrls: ['./manage-phase.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagePhaseComponent extends DashboardContentBase
	implements OnInit, OnDestroy {
  public binusianPrefix = (new Date().getFullYear()%100)+3; // Get 2 last digit
	public editDateFormat = 'dd-MM-yyyy';
	public viewDateFormat = 'EEEE, MMM dd yyyy';

	public traineeInPhase: ClientTrainee[];
  
	public phases: ClientPhase[];
	public phaseTypes = [{ key: 'ar', val: 'Assistant Recruitment' }];
  
	public currentPhase: ClientPhase;
  public editForm: ClientPhase;
  
	public traineeInPhase$: Observable<ClientTrainee[]>;
	public phases$: Observable<ClientPhase[]>;
	public loadingTraineeInPhase$: Observable<boolean>;
	public loadingPhases$: Observable<boolean>;

	constructor(
		private generalService: GeneralService,
		private leaderService: LeaderService,
		private store: Store<IAppState>,
		action: ActionsSubject
	) {
    super(action);
    this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
    this.loadingPhases$ = this.store.pipe(select(fromMasterState.isPhasesLoading));
    this.traineeInPhase$ = this.store.pipe(select(fromMasterState.getTraineeInPhase));
    this.loadingTraineeInPhase$ = this.store.pipe(select(fromMasterState.isTraineeInPhaseLoading));

    // load phase -> load trainee
    this.phases$.pipe(
      filter(v => !isEmpty(v)),
      takeUntil(this.destroyed$),
      map((v) => this.store.dispatch(
        MasterStateAction.FetchTraineeInPhase({phaseId: v[0].PhaseId}))
      )
    ).subscribe();
  }
  
	ngOnInit(): void {
    this.reloadView();
  }

	reloadView() {
    // this.refreshPhases();
    this.store.dispatch(MasterStateAction.FetchPhases());
  }

	// refreshPhases() {
	// 	this.generalService.GetPhasesCurrentGeneration().subscribe((res) => {
  //     console.log(res);
	// 		this.phases = [...res];
	// 		this.currentPhase = res[0];
	// 		this.refreshTraineeInPhase();
	// 	});
	// }

	// refreshTraineeInPhase() {
	// 	if (!this.currentPhase) return;
	// 	this.leaderService
	// 		.GetTraineesByPhase(this.currentPhase.PhaseId)
	// 		.subscribe((res) => {
	// 			this.traineeInPhase = res;
	// 		});
	// }

	getPhaseType(key) {
		return this.phaseTypes.find((p) => p.key === key).val;
	}

	createPhase(form: NgForm) {
		const { name, beginDate, endDate, type } = form.controls;
    this.store.dispatch(MasterStateAction.CreatePhase({
			name: name.value,
			beginDate: beginDate.value,
			endDate: endDate.value,
			phaseType: type.value,
		}))
	}

	addTraineesInPhase(form: NgForm) {
		const { selectPhase, traineeText, alsoAddSchedule } = form.controls;
		this.store.dispatch(MasterStateAction.CreateTraineeInPhase({
			binusianNumbers: traineeText.value,
			phaseId: selectPhase.value,
			isAddToSchedule: alsoAddSchedule.value,
		}));
	}

	onSelectPhase(phase) {
		this.editForm = phase;
	}

	onDeleteTrainee(trainee: ClientTrainee) {
		this.leaderService.DeleteTraineeInPhase({
			PhaseId: this.currentPhase.PhaseId,
			TraineeId: trainee.TraineeId,
		});
	}

	onCancelEdit() {
		this.editForm = null;
	}
}
