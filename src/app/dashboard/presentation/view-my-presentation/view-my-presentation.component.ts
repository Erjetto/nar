import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

import {
	MasterStateAction,
	fromMasterState,
	PresentationStateAction,
	fromPresentationState,
	MainStateEffects,
	PresentationStateEffects,
	MainStateAction,
} from 'src/app/shared/store-modules';

import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import {
	ClientSubject,
	CoreTrainingPresentation,
	ClientPhase,
	TraineePresentation,
	CoreTrainingPresentationQuestion,
	User,
} from 'src/app/shared/models';
import { isEmpty as _isEmpty, sortBy as _sortBy } from 'lodash';
import {
	takeUntil,
	filter,
	withLatestFrom,
	map,
	delay,
	tap,
	first,
	delayWhen,
} from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { RoleFlags } from 'src/app/shared/constants/role.constant';
import { arrayToObject } from 'src/app/shared/methods';

@Component({
	selector: 'rd-view-my-presentation',
	templateUrl: './view-my-presentation.component.html',
	styleUrls: ['./view-my-presentation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewMyPresentationComponent extends DashboardContentBase implements OnInit, OnDestroy {
	phases$: Observable<ClientPhase[]>;
	subjects$: Observable<ClientSubject[]>;
	myPresentationList$: Observable<CoreTrainingPresentation[]>;

	currentPresentation$ = new BehaviorSubject<CoreTrainingPresentation>(null);
	currentPhase$: Subject<ClientPhase> = new Subject();

	loadingFilterPresentation$: Observable<boolean>;
	loadingViewPresentation$ = new BehaviorSubject(false);

	constant = {
		role: RoleFlags,
	};
	subjectNameDict: { [id: string]: string } = {};

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind from store
		this.phases$ = this.store.pipe(
			select(fromMasterState.getPhases),
			tap((res) => this.currentPhase$.next(res[0]))
		);
		this.subjects$ = this.store.pipe(
			select(fromMasterState.getSubjects),
			tap(
				(subs: ClientSubject[]) =>
					(this.subjectNameDict = arrayToObject(
						subs,
						(s) => s.SubjectId,
						(s) => s.Name
					))
			),
			tap(console.log),
			map((subs: ClientSubject[]) => [...subs].reverse()) // The last subject is the first in list
		);

		this.loadingFilterPresentation$ = combineLatest([
			this.store.pipe(select(fromMasterState.isSubjectsLoading)),
			this.store.pipe(select(fromPresentationState.isMyPresentationsLoading)),
		]).pipe(
			map((vals: boolean[]) => vals.some((v) => v === true))
		);
		
		this.myPresentationList$ = this.store.pipe(
			select(fromPresentationState.getMyPresentations),
			// Wait for subjectDict
			delayWhen(() => this.subjects$.pipe(filter((v) => !_isEmpty(v)))), 
			map((presentations) => _sortBy(presentations, 'PresentationDate').reverse()),
			tap((presentations) => this.currentPresentation$.next(presentations[0]))
		);
		//#endregion

		//#region Bind to effects
		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingViewPresentation$.next(false);
		});
		this.mainEffects.changeGen$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(MasterStateAction.FetchPhases());
		});
		//#endregion

		this.currentPhase$
			.pipe(
				filter((res) => !_isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((p) => {
				this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: p.PhaseId }));
			});

		this.currentPresentation$ // Auto fetch Presentation Status
			.pipe(
				filter((res) => !_isEmpty(res)),
				takeUntil(this.destroyed$),
				withLatestFrom(this.currentGeneration$)
			)
			.subscribe(([res, gen]) => {
				this.store.dispatch(
					PresentationStateAction.FetchPresentationScorings({
						generationId: gen.GenerationId,
						phaseId: res.PhaseId,
						subjectId: res.SubjectId,
						traineeId: res.TraineeId,
						presentationNo: res.PresentationNo,
					})
				);
			});

		//#endregion

		this.store.dispatch(PresentationStateAction.FetchMyPresentations());
		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
	}
}
