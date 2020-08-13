import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	OnDestroy,
} from '@angular/core';
import { ClientPhase, ClientTrainee } from 'src/app/shared/models';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { LeaderService } from 'src/app/shared/services/new/leader.service';
import { NgForm } from '@angular/forms';
import { GeneralService } from 'src/app/shared/services/new/general.service';
import { Observable } from 'rxjs';

import * as fromMasterState from 'src/app/shared/stores/master/master.reducer';
import * as MasterStateAction from 'src/app/shared/stores/master/master.action';
import { filter, takeUntil, map, tap, first } from 'rxjs/operators';
import { isEmpty } from 'lodash';

@Component({
	selector: 'rd-manage-phase',
	templateUrl: './manage-phase.component.html',
	styleUrls: ['./manage-phase.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagePhaseComponent extends DashboardContentBase
	implements OnInit, OnDestroy {
	public binusianPrefix = (new Date().getFullYear() % 100) + 3; // Get 2 last digit
	public editDateFormat = 'dd-MM-yyyy';
	public viewDateFormat = 'EEEE, MMM dd yyyy';

	public traineeInPhase: ClientTrainee[];

	public phases: ClientPhase[];
	public phaseTypes = [{ key: 'ar', val: 'Assistant Recruitment' }];

	public currentPhase: ClientPhase;
	public editForm: ClientPhase;

  // public phaseTypes$: Observable<any>;
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
    // this.phaseTypes$ = this.store.pipe(select(fromMasterState.getPhaseTypes));
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.loadingPhases$ = this.store.pipe(
      select(fromMasterState.isPhasesLoading)
		);
		this.traineeInPhase$ = this.store.pipe(
			select(fromMasterState.getTraineeInPhase)
		);
		this.loadingTraineeInPhase$ = this.store.pipe(
			select(fromMasterState.isTraineeInPhaseLoading)
		);

		// load phase then load trainee
		this.phases$
			.pipe(
				filter((v) => !isEmpty(v)),
				takeUntil(this.destroyed$),
				map((v) =>
					this.store.dispatch(
						MasterStateAction.FetchTraineeInPhase({ phaseId: v[0].PhaseId })
					)
				),
				first() // temporary: only auto load in first reload
			)
			.subscribe();
	}

	ngOnInit(): void {
		this.reloadView();
	}

	reloadView() {
		// this.refreshPhases();
		this.store.dispatch(MasterStateAction.FetchPhases());
	}

	getPhaseType(key) {
		return this.phaseTypes.find((p) => p.key === key).val;
	}

	submitPhaseForm(form: NgForm) {
		const { name, beginDate, endDate, type } = form.controls;
		if (this.editForm)
			this.store.dispatch(
				MasterStateAction.CreatePhase({
					name: name.value,
					beginDate: beginDate.value,
					endDate: endDate.value,
					phaseType: type.value,
				})
			);
		else
			this.store.dispatch(
				MasterStateAction.UpdatePhase({
					PhaseId: this.editForm.PhaseId,
					Description: name.value,
					EndDate: endDate.value,
					StartDate: beginDate.value,
				})
			);
	}

	addTraineesInPhase(form: NgForm) {
		const { selectPhase, traineeText, alsoAddSchedule } = form.controls;
		this.store.dispatch(
			MasterStateAction.CreateTraineeInPhase({
				binusianNumbers: traineeText.value,
				phaseId: selectPhase.value,
				isAddToSchedule: alsoAddSchedule.value,
			})
		);
	}

	// onChangePhaseType(phaseType) {
  //   // fetch phase
  //   this.store.dispatch(
  //     MasterStateAction.FetchPhases()
  //   );
  // }

	onChangePhase(phase: ClientPhase) {
		this.store.dispatch(
			MasterStateAction.FetchTraineeInPhase({ phaseId: phase.PhaseId })
		);
	}

	onSelectPhase(phase) {
		this.editForm = phase;
	}

	onDeletePhase() {
		this.store.dispatch(
			MasterStateAction.DeletePhase({ PhaseId: this.editForm.PhaseId })
		);
	}

	onDeleteTrainee(trainee: ClientTrainee) {
		this.store.dispatch(
			MasterStateAction.DeleteTraineeInPhase({
				PhaseId: this.currentPhase.PhaseId,
				TraineeId: trainee.TraineeId,
			})
		);
	}

	onCancelEdit() {
		this.editForm = null;
	}
}
