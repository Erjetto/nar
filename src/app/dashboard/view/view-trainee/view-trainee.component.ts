import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store, select } from '@ngrx/store';

import { ClientPhase, ClientTraineeReputation } from 'src/app/shared/models';
import {
	MasterStateAction,
	fromMasterState,
	NoteStateAction,
	MainStateEffects,
	MainStateAction,
	fromNoteState,
} from 'src/app/shared/store-modules';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';

import { DashboardContentBase } from '../../dashboard-content-base.component';
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	startWith,
	takeUntil,
} from 'rxjs/operators';
import { TryGetCoreTrainingPhase } from 'src/app/shared/methods';
import { FormControl } from '@angular/forms';
import { isEmpty as _isEmpty } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'rd-view-trainee',
	templateUrl: './view-trainee.component.html',
	styleUrls: ['./view-trainee.component.scss'],
})
export class ViewTraineeComponent extends DashboardContentBase implements OnInit, OnDestroy {
	viewMode = 'Thumbnail';
	traineeActivityFilter$ = new BehaviorSubject<string>('All');

	phases$: Observable<ClientPhase[]>;
	currentPhase$ = new BehaviorSubject<ClientPhase>(null);

	trainees$: Observable<ClientTraineeReputation[]>;
	filteredTrainees$: Observable<ClientTraineeReputation[]>;

	activeNumber$: Observable<number>;
	inactiveNumber$: Observable<number>;

	loadingTrainee$: Observable<boolean>;

	searchText = '';
	searchTextControl = new FormControl('');

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private router: Router,
		private route: ActivatedRoute
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region bind to store
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.loadingTrainee$ = this.store.pipe(select(fromNoteState.isLoadingTraineesReputation));
		//#endregion

		this.trainees$ = this.store.pipe(select(fromNoteState.getTraineesReputation));
		this.filteredTrainees$ = combineLatest([
			this.trainees$,
			this.searchTextControl.valueChanges.pipe(
				startWith(''),
				debounceTime(400),
				distinctUntilChanged()
			),
			this.traineeActivityFilter$,
		]).pipe(
			map(([trainees, searchText, activityFilter]) => {
				let filtered = trainees;
				const isActive = activityFilter === 'Active';
				
				if (activityFilter !== 'All') {
					filtered = filtered.filter((t) => t.IsActive === isActive);
				}
				if(searchText !== ''){
					filtered = filtered.filter((t) =>
						`${t.TraineeName} ${t.TraineeNumber} ${t.TraineeCode} ${t.Gender} ${t.Major}`
							.toLowerCase()
							.includes(searchText)
					);
				}

				return filtered;
			})
		);
		this.activeNumber$ = this.filteredTrainees$.pipe(
			map((trainees) => trainees.reduce((prev, curr) => prev + (curr.IsActive ? 1 : 0), 0))
		);
		this.inactiveNumber$ = this.filteredTrainees$.pipe(
			map((trainees) => trainees.reduce((prev, curr) => prev + (!curr.IsActive ? 1 : 0), 0))
		);

		//#region bind to effects
		this.mainEffects.changeGen$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(MasterStateAction.FetchPhases());
		});

		// Setiap load phases, selalu coba cari phase core training
		this.phases$
			.pipe(takeUntil(this.destroyed$), map(TryGetCoreTrainingPhase))
			.subscribe(this.currentPhase$);

		this.currentPhase$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((phase) => {
				this.store.dispatch(
					NoteStateAction.FetchTraineesReputation({
						phaseId: phase.PhaseId,
					})
				);
			});
		//#endregion

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
	}

	viewTraineeDetail(trainee: ClientTraineeReputation) {
		this.router.navigate([trainee.TraineeId, false], { relativeTo: this.route });
	}

	traineeRowInactiveClass = (row: any) => ({ 'trainee-row-inactive': !row.IsActive });
	traineeThumbnailInactiveClass = (data: any) => ({ 'trainee-inactive': !data.IsActive });
}
