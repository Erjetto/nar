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
} from 'rxjs/operators';

import { ClientPhase, ClientStatistic } from 'src/app/shared/models';
import * as MasterStateAction from 'src/app/shared/stores/master/master.action';
import * as fromMasterState from 'src/app/shared/stores/master/master.reducer';
import { Observable, of, Subject, interval } from 'rxjs';
import { HomeService } from 'src/app/shared/services/home.service';
import { DashboardContentBase } from '../dashboard-content-base.component';
import { isEmpty } from 'lodash';

@Component({
	selector: 'rd-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends DashboardContentBase
	implements OnInit, OnDestroy {
	public selectedPhase = 'Desc';
	public phases$: Observable<ClientPhase[]>;

	public statistics: ClientStatistic[] = [];

	public isLoading$: Observable<boolean>;
	// public isLoading = {isLoading: true};
	public destroyed$: Subject<any> = new Subject();

	constructor(
		actionsSubject: ActionsSubject,
		private store: Store<IAppState>,
		private homeService: HomeService,
	) {
		super(actionsSubject);
	}

	ngOnInit(): void {
    this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
    // this.phases$.pipe(take(4)).subscribe(console.log);

		// this.phases$.pipe(
		//   first(), // === take(1)
		//   filter(res => isEmpty(res)), // if null, then continue to tap()
		//   tap(() => this.store.dispatch(MainStateAction.FetchPhases()))
    // ).subscribe();
    
    // this.isLoading$ = interval(1500).pipe(
    //   take(20),
    //   map(val => val%2===0)
    // );
    

    
		this.reloadView();
	}

	reloadView() {
		// console.log('ReloadView from Home because it has no state for reloading data');
		this.store.dispatch(MasterStateAction.FetchPhases());

		// this.phases$.pipe(
		//   filter(res => !isEmpty(res)),
		//   tap((phases) => {
		//     this.selectedPhase = phases[0].Description;
		//     this.homeService.getTraineeStatistics(this.selectedPhase).subscribe((res) => {
		//       this.statistics = res.map(ClientStatistic.fromJson);
		//     });
		//   }),
		//   first()
		// ).subscribe();
	}

	onChangePhase() {
		this.homeService
			.getTraineeStatistics(this.selectedPhase)
			.subscribe((res) => {
				this.statistics = res.map(ClientStatistic.fromJson);
			});
	}
}
