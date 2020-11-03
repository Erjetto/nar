import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { IAppState } from 'src/app/app.reducer';
import { ClientSubject, ClientPhase, Case, ClientCaseTrainee } from 'src/app/shared/models';
import {
	CaseStateEffects,
	fromCaseState,
  fromMainState,
	fromMasterState,
	MainStateAction,
	MainStateEffects,
	MasterStateAction,
} from 'src/app/shared/store-modules';
import { isEmpty as _isEmpty} from 'lodash';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { DashboardContentBase } from '../dashboard-content-base.component';

@Component({
	selector: 'rd-trainee-upload',
	templateUrl: './trainee-upload.component.html',
	styleUrls: ['./trainee-upload.component.scss'],
})
export class TraineeUploadComponent extends DashboardContentBase implements OnInit, OnDestroy {
	viewDateFormat = DateHelper.TIME_DATE_FORMAT;
	currentViewPhase$ = new BehaviorSubject<ClientPhase>(null);
	currentViewSubject$ = new BehaviorSubject<ClientSubject>(null);

	phases$: Observable<ClientPhase[]>;
	subjectList$: Observable<ClientSubject[]>;
	caseList$: Observable<ClientCaseTrainee>;
	subjectsEntity$: Observable<{ [phaseId: string]: ClientSubject[] }>;

  loadingPage$ = new BehaviorSubject<boolean>(false);
  uploadForms = this.fb.array([]);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
    private caseEffects: CaseStateEffects,
    private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));

		this.subjectsEntity$ = this.store.pipe(select(fromMasterState.getSubjectsEntity));
		this.subjectList$ = this.getSubjectsFromEntity(this.currentViewPhase$);

		this.caseList$ = this.store.pipe(select(fromCaseState.getCases));
		this.store
			.pipe(select(fromCaseState.getCasesLoading), takeUntil(this.destroyed$))
      .subscribe(this.loadingPage$);
      
		//#endregion

		//#region auto select first in array
		this.phases$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
			this.currentViewPhase$.next(res[0]);
		});
		this.subjectList$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
			this.currentViewSubject$.next(res[0]);
		});
		//#endregion

		//#region Subscribe to effects
		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.loadingPage$.next(false));

		//#endregion

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
	}

	getSubjectsFromEntity(phaseObservable: Observable<ClientPhase>, loader?: Subject<boolean>) {
		return combineLatest([this.subjectsEntity$, phaseObservable]).pipe(
			map(([entity, currPhase]) => {
				if (!currPhase) return [];
				if (!!currPhase && !!entity[currPhase.PhaseId]) {
					loader?.next(false);
					return entity[currPhase.PhaseId];
				} else {
					loader?.next(true);
					this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: currPhase.PhaseId }));
					return [];
				}
			})
		);
	}
}
