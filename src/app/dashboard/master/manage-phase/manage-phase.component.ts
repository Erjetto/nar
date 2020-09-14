import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientPhase, ClientTrainee } from 'src/app/shared/models';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { NgForm } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest, merge } from 'rxjs';

import {
	MasterStateAction,
	fromMasterState,
	MasterStateEffects,
	MainStateEffects,
	MasterStateReducer,
} from 'src/app/shared/store-modules';
import { map, takeUntil, first } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
	selector: 'rd-manage-phase',
	templateUrl: './manage-phase.component.html',
	styleUrls: ['./manage-phase.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagePhaseComponent extends DashboardContentBase implements OnInit, OnDestroy {
	binusianPrefix = (new Date().getFullYear() % 100) + 3;
	editDateFormat = 'yyyy-MM-dd';
	viewDateFormat = 'EEEE, MMM dd yyyy';

	phaseTypes = [{ key: 'ar', val: 'Assistant Recruitment' }];

	editForm$ = new BehaviorSubject<ClientPhase>(null);
	currentPhase$ = new BehaviorSubject<ClientPhase>(null);

	traineeInPhaseEntity$: Observable<{ [phaseId: string]: ClientTrainee[] }>;
	traineeInPhase$: Observable<ClientTrainee[]>;
	phases$: Observable<ClientPhase[]>;

	loadingInsertPhase$ = new BehaviorSubject<boolean>(false);
	loadingInsertTraineeInPhase$ = new BehaviorSubject<boolean>(false);
	loadingViewTraineeInPhase$: Observable<boolean>;
	loadingViewPhases$: Observable<boolean>;

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private masterEffects: MasterStateEffects
	) {
		super(store);
	}

	ngOnInit(): void {
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.traineeInPhaseEntity$ = this.store.pipe(select(fromMasterState.getTraineesInPhaseEntity));
		this.traineeInPhase$ = this.getTraineeInPhaseFromEntity(this.currentPhase$);

		this.loadingViewPhases$ = this.store.pipe(select(fromMasterState.isPhasesLoading));
		this.loadingViewTraineeInPhase$ = this.store.pipe(
			select(fromMasterState.isTraineeInPhaseLoading)
		);

		//#region Auto select first in array
		this.phases$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((phases) => this.currentPhase$.next(phases[0]));
		//#endregion

		//#region Subscribe to effects
		// Remove Loading
		merge(this.mainEffects.afterRequest$)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.loadingInsertPhase$.next(false);
				this.loadingInsertTraineeInPhase$.next(false);
			});

		// Reload Phase List
		merge(
			this.masterEffects.createPhase$,
			this.masterEffects.updatePhase$,
			this.masterEffects.deletePhase$,
			this.mainEffects.changeGen$
		)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.store.dispatch(MasterStateAction.FetchPhases()));

		//#endregion

		this.store.dispatch(MasterStateAction.FetchPhases());
	}

	getPhaseType(key) {
		return this.phaseTypes.find((p) => p.key === key).val;
	}

	submitPhaseForm(form: NgForm) {
		const { phaseName, beginDate, endDate } = form.value;
		if (this.editForm$.value == null)
			this.store.dispatch(
				MasterStateAction.CreatePhase({
					name: phaseName,
					beginDate,
					endDate,
					phaseType: 'ar',
				})
			);
		else
			this.store.dispatch(
				MasterStateAction.UpdatePhase({
					PhaseId: this.editForm$.value.PhaseId,
					Description: phaseName,
					EndDate: endDate,
					StartDate: beginDate,
				})
			);
		this.loadingInsertPhase$.next(true);
	}

	addTraineesInPhase(form: NgForm) {
		const { selectPhase, traineeText, alsoAddSchedule } = form.value;
		this.loadingInsertTraineeInPhase$.next(true);
		this.store.dispatch(
			MasterStateAction.CreateTraineeInPhase({
				binusianNumbers: traineeText,
				phaseId: selectPhase,
				isAddToSchedule: alsoAddSchedule,
			})
		);
	}

	selectPhase(phase) {
		this.editForm$.next(phase);
	}

	deletePhase() {
		this.store.dispatch(MasterStateAction.DeletePhase({ PhaseId: this.editForm$.value.PhaseId }));
		this.loadingInsertPhase$.next(true);
	}

	deleteTrainee(trainee: ClientTrainee) {
		this.store.dispatch(
			MasterStateAction.DeleteTraineeInPhase({
				PhaseId: this.currentPhase$.value.PhaseId,
				TraineeId: trainee.TraineeId,
			})
		);
	}

	cancelEdit() {
		this.editForm$.next(null);
	}

	getTraineeInPhaseFromEntity(phaseObservable: Observable<ClientPhase>) {
		return combineLatest([this.traineeInPhaseEntity$, phaseObservable]).pipe(
			map(([entity, currPhase]) => {
				// If no curr phase yet, then skip fetch
				if (!currPhase) return [];
				// if entity has it, then pass value
				if (!!entity[currPhase.PhaseId]) return entity[currPhase.PhaseId];
				else {
					this.store.dispatch(
						MasterStateAction.FetchTraineeInPhase({ phaseId: currPhase.PhaseId })
					);
					return [];
				}
			})
		);
	}
}
