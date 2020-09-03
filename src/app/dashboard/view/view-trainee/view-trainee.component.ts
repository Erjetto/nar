import {
	Component,
	OnInit,
	OnDestroy,
	ChangeDetectionStrategy,
} from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import {
	ClientPhase,
	ClientStatistic,
	ClientTrainee,
	ClientTraineeReputation,
} from 'src/app/shared/models';
import { MasterStateAction, fromMasterState } from 'src/app/shared/store-modules';
import { Observable, of, Subject, interval } from 'rxjs';

import { isEmpty } from 'lodash';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { MockData } from 'src/app/shared/mock-data';


@Component({
	selector: 'rd-view-trainee',
	templateUrl: './view-trainee.component.html',
	styleUrls: ['./view-trainee.component.scss'],
})
export class ViewTraineeComponent extends DashboardContentBase
	implements OnInit, OnDestroy {
	public viewMode: 'thumbnail' | 'list' = 'thumbnail';

	public phases$: Observable<ClientPhase[]>;
	public trainees$: Observable<ClientTraineeReputation[]>;
	public filteredTrainees$: Observable<ClientTraineeReputation[]>;

	public searchText = '';

	constructor(protected store: Store<IAppState>) {
		super(store);
	}

	ngOnInit(): void {
		console.log(this.viewMode);
		
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));

		this.trainees$ = of(
			MockData.GetTraineesReputationByPhase.TraineeReputation.map(
				ClientTraineeReputation.fromJson
			)
		);
		this.filteredTrainees$ = of(
			MockData.GetTraineesReputationByPhase.TraineeReputation.map(
				ClientTraineeReputation.fromJson
			)
		);

		this.reloadView();
	}

	reloadView() {
		this.store.dispatch(MasterStateAction.FetchPhases());
	}

	onSelectTrainee(trainee) {}

	onChangePhase(phase) {}
}
