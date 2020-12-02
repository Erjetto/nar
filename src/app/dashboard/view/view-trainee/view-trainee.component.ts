import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import {
	ClientPhase,
	ClientStatistic,
	ClientTrainee,
	ClientTraineeReputation,
} from 'src/app/shared/models';
import {
	MasterStateAction,
	fromMasterState,
	NoteStateAction,
	MainStateEffects,
	MainStateAction,
	fromNoteState,
} from 'src/app/shared/store-modules';
import { Observable, of, Subject, interval, BehaviorSubject, combineLatest } from 'rxjs';

import { DashboardContentBase } from '../../dashboard-content-base.component';
import { MockData } from 'src/app/shared/mock-data';
import { debounceTime, delay, distinctUntilChanged, filter, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { TryGetCoreTrainingPhase } from 'src/app/shared/methods';
import { FormControl } from '@angular/forms';
import { isEmpty as _isEmpty } from 'lodash';

@Component({
	selector: 'rd-view-trainee',
	templateUrl: './view-trainee.component.html',
	styleUrls: ['./view-trainee.component.scss'],
})
export class ViewTraineeComponent extends DashboardContentBase implements OnInit, OnDestroy {
	viewMode: 'thumbnail' | 'list' = 'thumbnail';

	phases$: Observable<ClientPhase[]>;
	currentPhase$ = new BehaviorSubject<ClientPhase>(null);

	trainees$: Observable<ClientTraineeReputation[]>;
	filteredTrainees$: Observable<ClientTraineeReputation[]>;

	searchText = '';
	searchTextControl = new FormControl('');

	constructor(protected store: Store<IAppState>, private mainEffects: MainStateEffects) {
		super(store);
	}

	ngOnInit(): void {
		//#region bind to store
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.trainees$ = this.store.pipe(select(fromMasterState.getPhases));
		//#endregion

		this.trainees$ = this.store.pipe(select(fromNoteState.getTraineesReputation));
		this.filteredTrainees$ = combineLatest([
			this.trainees$,
			this.searchTextControl.valueChanges.pipe(startWith(''), debounceTime(400), distinctUntilChanged()),
		]).pipe(
			map(([trainees, searchText]) =>
				trainees.filter((t) =>
          `${t.TraineeName} ${t.TraineeNumber} ${t.TraineeCode} ${t.Gender} ${t.Major}`
            .toLowerCase().includes(searchText)
				)
			)
		);

		//#region bind to effects
		this.mainEffects.changeGen$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(MasterStateAction.FetchPhases());
		});

		// Setiap load phases, selalu coba cari phase core training
		this.phases$
			.pipe(takeUntil(this.destroyed$), map(TryGetCoreTrainingPhase))
			.subscribe(this.currentPhase$);

		this.currentPhase$.pipe(filter(v=>!_isEmpty(v)),takeUntil(this.destroyed$)).subscribe((phase) => {
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

	onSelectTrainee(trainee) {}

	onChangePhase(phase) {}
}
