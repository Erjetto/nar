import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store, ActionsSubject } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { tap, switchMap, takeUntil, mergeAll } from 'rxjs/operators';

import { ClientPhase, ClientStatistic } from '../../shared/models';
import * as MainStateAction from '../../shared/stores/main/main.action';
import { RefreshOnChange } from '../refresh-on-change.component';
import { Observable, of, Subject } from 'rxjs';
import { HomeService } from 'src/app/shared/services/home.service';
import { PhaseService } from 'src/app/shared/services/phase.service';

@Component({
	selector: 'rd-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	public selectedPhase = 'Desc';
	public phases: ClientPhase[];

	public statistics: ClientStatistic[] = [];

	public isLoading$: Observable<boolean>;
	public destroyed$: Subject<any> = new Subject();

	constructor(
		private store: Store<IAppState>,
		private actionsSubject: ActionsSubject,
		private homeService: HomeService,
		private phaseService: PhaseService
	) {}

	ngOnInit(): void {
		this.actionsSubject
			.pipe(
				ofType(MainStateAction.ChangeGeneration, MainStateAction.ChangeRole),
				takeUntil(this.destroyed$)
			)
			.subscribe((o) => this.reloadView(o.payload));

		this.isLoading$ = of(false);

		this.phaseService.getPhases().subscribe((res) => {
			this.phases = res.map(ClientPhase.fromJson);
		});

		this.reloadView();
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	reloadView(input?: any) {
		// console.log('ReloadView from Home because it has no state for reloading data');

		this.homeService.getTraineeStatistics().subscribe((res) => {
			this.statistics = res.map(ClientStatistic.fromJson);
		});
	}
}
