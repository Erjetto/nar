import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientPhase, ClientTrainee } from 'src/app/shared/models';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { NgForm } from '@angular/forms';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import {
	MasterStateAction,
	fromMasterState,
	MasterStateEffects,
	MainStateEffects,
	MainStateAction,
} from 'src/app/shared/store-modules';
import { filter, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { isEmpty as _isEmpty } from 'lodash';

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

	// Ganti jadi ambil dari store
	phaseTypes = [{ key: 'ar', val: 'Assistant Recruitment' }];

	editForm$ = new BehaviorSubject<ClientPhase>(null);
	currentPhase$ = new BehaviorSubject<ClientPhase>(null);

	traineeInPhase$: Observable<ClientTrainee[]>;
	phases$: Observable<ClientPhase[]>;

	loadingInsertPhase$ = new BehaviorSubject(false);
	loadingInsertTraineeInPhase$ = new BehaviorSubject(false);
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
		this.phases$ = this.store.pipe(
			select(fromMasterState.getPhases),
			filter((res) => !_isEmpty(res)),
			tap((res) => this.currentPhase$.next(res[0])) // Auto first in select
		);
		this.traineeInPhase$ = fromMasterState.getTraineeInPhaseFromEntity(
			this.store,
			this.currentPhase$
		);

		this.loadingViewPhases$ = this.store.pipe(select(fromMasterState.isPhasesLoading));
		this.loadingViewTraineeInPhase$ = this.store.pipe(
			select(fromMasterState.isTraineeInPhaseLoading)
		);

		//#region Subscribe to effects
		// Remove Loading
		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
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

		// Reload Trainee in Phase
		merge(this.masterEffects.createTraineeInPhase$, this.masterEffects.deleteTraineeInPhase$)
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.currentPhase$))
			.subscribe(([, phase]) =>
				this.store.dispatch(MasterStateAction.FetchTraineeInPhase({ phaseId: phase.PhaseId }))
			);

		//#endregion

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
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
		this.loadingInsertTraineeInPhase$.next(true);
		const { selectPhase, traineeText, alsoAddSchedule } = form.value;
		this.store.dispatch(
			MasterStateAction.CreateTraineeInPhase({
				binusianNumbers: traineeText.split('\n'),
				phaseId: selectPhase.PhaseId,
				isAddToSchedule: !!alsoAddSchedule,
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
}
