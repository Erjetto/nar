import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
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

import { ClientPhase, ClientStatistic, Message } from 'src/app/shared/models';
import {
	MasterStateAction,
	fromMasterState,
	fromMainState,
	MainStateAction,
	MainStateEffects,
} from 'src/app/shared/store-modules';

import { Observable, of, Subject, interval, BehaviorSubject } from 'rxjs';
import { DashboardContentBase } from '../dashboard-content-base.component';
import { isEmpty } from 'lodash';
import { GeneralService } from 'src/app/shared/services/new/general.service';

@Component({
	selector: 'rd-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends DashboardContentBase implements OnInit, OnDestroy {
	phases$: Observable<ClientPhase[]>;
	announcements$: Observable<Message[]>;

	currentPhase$ = new Subject<ClientPhase>();
	statistics$ = new Subject<ClientStatistic[]>();

	loadingTraineeStatistic$ = new BehaviorSubject<boolean>(true);
	loadingAnnouncements$: Observable<boolean>;
	// isLoading = {isLoading: true};
	destroyed$: Subject<any> = new Subject();

	constructor(
		protected store: Store<IAppState>,
		private generalService: GeneralService,
		private mainEffects: MainStateEffects
	) {
		super(store);
	}

	ngOnInit(): void {
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.announcements$ = this.store.pipe(select(fromMainState.getAnnouncements));
		this.loadingAnnouncements$ = this.store.pipe(select(fromMainState.isAnnouncementsLoading));

		this.phases$
			.pipe(
				filter((v) => !isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((phases) => this.currentPhase$.next(phases[0]));

		// On phase change, get statistic trainee
		this.currentPhase$
			.pipe(
				filter((res) => !isEmpty(res)),
				takeUntil(this.destroyed$),
				tap(() => this.loadingTraineeStatistic$.next(true)),
				switchMap((phase) => this.generalService.GetStatisticTrainee({ phaseId: phase.PhaseId }))
			)
			.subscribe((statistics) => {
				this.loadingTraineeStatistic$.next(false);
				this.statistics$.next(statistics);
			});

		this.mainEffects.changeGen$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(MasterStateAction.FetchPhases());
			this.store.dispatch(MainStateAction.FetchAnnouncements());
		});

		this.store.dispatch(MasterStateAction.FetchPhases());
		this.store.dispatch(MainStateAction.FetchAnnouncements());
	}
}
