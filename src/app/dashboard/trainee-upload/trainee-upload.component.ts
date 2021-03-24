import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { filter, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { IAppState } from 'src/app/app.reducer';
import {
	ClientSubject,
	ClientPhase,
	ClientCaseTrainee,
	ClientCaseTraineeDetail,
} from 'src/app/shared/models';
import {
	CaseStateAction,
	CaseStateEffects,
	fromCaseState,
	fromMasterState,
	MainStateAction,
	MainStateEffects,
	MasterStateAction,
} from 'src/app/shared/store-modules';
import { isEmpty as _isEmpty } from 'lodash';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { DashboardContentBase } from '../dashboard-content-base.component';
import { adjustControlsInFormArray, fileFormFactory, isEmptyGuid } from 'src/app/shared/methods';

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

	loadingPage$ = new BehaviorSubject<boolean>(false);
	uploadForms = this.fb.array([]);

	constructor(
		protected store: Store<IAppState>,
		private caseEffects: CaseStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));

		this.subjectList$ = fromMasterState
			.getSubjectsFromEntity(this.store, this.currentViewPhase$)
			.pipe(map((subs) => [new ClientSubject('All'), ...subs]));

		this.caseList$ = this.store.pipe(
			select(fromCaseState.getClientCaseTrainees),
			tap((cases) => {
				if (cases == null) return;
				this.uploadForms.reset();

				adjustControlsInFormArray(this.uploadForms, cases.Detail.length, fileFormFactory);
				this.uploadForms.patchValue(
					cases.Detail.map((d) => ({
						fileId: !isEmptyGuid(d.AnswerId) ? d.AnswerId : null,
						fileName: `${d.CaseName} answer`,
					}))
				);
			})
		);
		this.store
			.pipe(select(fromCaseState.isCasesLoading), takeUntil(this.destroyed$))
			.subscribe(this.loadingPage$);

		//#endregion

		//#region auto select first in array
		this.phases$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
			this.currentViewPhase$.next(res[0]);
		});
		this.subjectList$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
			this.currentViewSubject$.next(res[0]);
		});

		// Reload cases ketika submit atau ubah subject
		merge(this.currentViewSubject$, this.caseEffects.submitTraineeAnswer$)
			.pipe(
				takeUntil(this.destroyed$),
				withLatestFrom(this.currentViewSubject$, this.currentViewPhase$),
				filter(([act, sub, phs]) => !_isEmpty(phs))
			)
			.subscribe(([act, sub, phs]) => {
				this.store.dispatch(
					CaseStateAction.FetchTraineeCasesBy({
						phaseId: phs.PhaseId,
						subjectId: sub.Name === 'All' ? undefined : sub.SubjectId,
					})
				);
			});
		//#endregion

		//#region Subscribe to effects
		// this.mainEffects.afterRequest$
		// 	.pipe(takeUntil(this.destroyed$))
		// 	.subscribe(() => this.loadingPage$.next(false));

		//#endregion

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
	}

	uploadAnswer(control: AbstractControl, c: ClientCaseTraineeDetail) {
		this.loadingPage$.next(true);
		this.store.dispatch(
			CaseStateAction.SubmitTraineeAnswer({
				phaseId: this.currentViewPhase$.value.PhaseId,
				caseId: c.CaseId,
				fileId: control.get('fileId').value,
			})
		);
	}
}
