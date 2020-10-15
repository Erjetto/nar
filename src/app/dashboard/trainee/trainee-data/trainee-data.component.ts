import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	MainStateEffects,
	MasterStateEffects,
	fromBinusianState,
	BinusianStateAction,
} from 'src/app/shared/store-modules';
import { ClientTraineeData } from 'src/app/shared/models';
import { takeUntil, map } from 'rxjs/operators';
import { sortBy as _sortBy} from 'lodash';

@Component({
	selector: 'rd-trainee-data',
	templateUrl: './trainee-data.component.html',
	styleUrls: ['./trainee-data.component.scss'],
})
export class TraineeDataComponent extends DashboardContentBase implements OnInit, OnDestroy {
  viewDateFormat = 'dd MMM yyyy';

	trainees$: Observable<ClientTraineeData[]>;
	currentTrainee$ = new BehaviorSubject<ClientTraineeData>(null);
	loadingTrainees$: Observable<boolean>;
	viewingTable = false;

	constructor(protected store: Store<IAppState>, private mainEffects: MainStateEffects) {
		super(store);
	}

	ngOnInit(): void {
		this.trainees$ = this.store.pipe(
			select(fromBinusianState.getTraineesData),
			map((datas) => _sortBy(datas, 'TraineeName'))
		);
		this.loadingTrainees$ = this.store.pipe(select(fromBinusianState.isTraineesDataLoading));

		this.mainEffects.changeGen$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.store.dispatch(BinusianStateAction.FetchTraineesData()));

		this.store.dispatch(BinusianStateAction.FetchTraineesData());
  }
  
  showTraineeData(data: ClientTraineeData){
    this.currentTrainee$.next(data);
  }
}
