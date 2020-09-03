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
	tap,
	switchMap,
	takeUntil,
	mergeAll,
	take,
	first,
	filter,
  map,
  mergeMap,
} from 'rxjs/operators';

import { ClientPhase, ClientStatistic } from 'src/app/shared/models';
import { MasterStateAction, fromMasterState } from 'src/app/shared/store-modules';

import { Observable, of, Subject, interval } from 'rxjs';
import { HomeService } from 'src/app/shared/services/home.service';
import { DashboardContentBase } from '../dashboard-content-base.component';
import { isEmpty } from 'lodash';
import { GeneralService } from 'src/app/shared/services/new/general.service';

@Component({
	selector: 'rd-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends DashboardContentBase
	implements OnInit, OnDestroy {
	public phases$: Observable<ClientPhase[]>;
  
	public currentPhase$: Subject<ClientPhase> = new Subject();
	public statistics$: Subject<ClientStatistic[]> = new Subject();

	public isLoading$: Observable<boolean>;
	// public isLoading = {isLoading: true};
	public destroyed$: Subject<any> = new Subject();

	constructor(
		protected store: Store<IAppState>,
		private generalService: GeneralService,
	) {
		super(store);
	}

	ngOnInit(): void {
    this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
    
    // On phase change, get statistic trainee
    this.currentPhase$.pipe(
      filter((res) => !isEmpty(res)),
      takeUntil(this.destroyed$),
      switchMap(phase => this.generalService.GetStatisticTrainee({phaseId: phase.PhaseId})),
      map(statistics => this.statistics$.next(statistics))
    ).subscribe();
    
    this.store.dispatch(MasterStateAction.FetchPhases());
  }

}
