import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	OnDestroy,
} from '@angular/core';
import { ClientPhase, ClientTrainee } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { LeaderService } from 'src/app/shared/services/new/leader.service';
import { NgForm } from '@angular/forms';
import { GeneralService } from 'src/app/shared/services/new/general.service';

@Component({
	selector: 'rd-manage-phase',
	templateUrl: './manage-phase.component.html',
	styleUrls: ['./manage-phase.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagePhaseComponent extends DashboardContentBase
	implements OnInit, OnDestroy {
	public editDateFormat = 'dd-MM-yyyy';
	public viewDateFormat = 'EEEE, MMM dd yyyy';

	public traineeInPhase: ClientTrainee[];

	public phases: ClientPhase[];
	public phaseTypes = [{ key: 'ar', val: 'Assistant Recruitment' }];

	public currentPhase: ClientPhase;
	public editForm: ClientPhase;

	constructor(
		private generalService: GeneralService,
		private leaderService: LeaderService,
		private store: Store<IAppState>,
		action: ActionsSubject
	) {
		super(action);
  }
  
	ngOnInit(): void {
    this.reloadView();
  }

	reloadView() {
    this.refreshPhases();
  }

	refreshPhases() {
		this.generalService.GetPhasesCurrentGeneration().subscribe((res) => {
      console.log(res);
			this.phases = [...res];
			this.currentPhase = res[0];
			this.refreshTraineeInPhase();
		});
	}

	refreshTraineeInPhase() {
		if (!this.currentPhase) return;
		this.leaderService
			.GetTraineesByPhase(this.currentPhase.PhaseId)
			.subscribe((res) => {
				this.traineeInPhase = res;
			});
	}

	getPhaseType(key) {
		return this.phaseTypes.find((p) => p.key === key).val;
	}

	createPhase(form: NgForm) {
		const { name, beginDate, endDate, type } = form.controls;
		this.leaderService.SavePhase({
			name: name.value,
			beginDate: beginDate.value,
			endDate: endDate.value,
			type: type.value,
		});
	}

	addTraineesInPhase(form: NgForm) {
    console.log(form);
		const { selectPhase, traineeText, alsoAddSchedule } = form.controls;
		this.leaderService.SaveTraineesToPhase({
			binusianNumbers: traineeText.value,
			phaseId: selectPhase.value,
			isAddToSchedule: alsoAddSchedule.value,
		});
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
