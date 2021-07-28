import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, combineLatest, merge, BehaviorSubject } from 'rxjs';

import {
	MasterStateAction,
	fromMasterState,
	MainStateAction,
	PresentationStateAction,
	fromPresentationState,
	MainStateEffects,
} from 'src/app/shared/store-modules';

import {
	CoreTrainingPresentation,
	CoreTrainingPresentationQuestion,
	ClientSubject,
	ClientPhase,
} from 'src/app/shared/models';
import { filter, withLatestFrom, takeUntil, map, startWith, tap } from 'rxjs/operators';
import { isEmpty as _isEmpty } from 'lodash';
import { FormBuilder } from '@angular/forms';
import { RoleFlags } from 'src/app/shared/constants/role.constant';
import { TryGetCoreTrainingPhase } from 'src/app/shared/methods';

@Component({
	selector: 'rd-view-all-question',
	templateUrl: './view-all-question.component.html',
	styleUrls: ['./view-all-question.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAllQuestionComponent extends DashboardContentBase implements OnInit, OnDestroy {
	viewDateFormat = 'dd MMM yyyy hh:mm a';
	filterForm = this.fb.group(
		{
			search: [''],
			status: [''],
			subjectId: [''],
		},
		{ updateOn: 'blur' }
	);

	constant = {
		role: RoleFlags,
	};
	presentations$: Observable<CoreTrainingPresentation>;
	questionsBySubjectEntity$: Observable<{
		[subjectId: string]: CoreTrainingPresentationQuestion[];
	}>;
	numOfQuestionsByStatus$: Observable<{ total; correct; wrong; unchecked; unanswered }>;

	phases$: Observable<ClientPhase[]>;
	subjects$: Observable<ClientSubject[]>;
	currentPhase$ = new BehaviorSubject<ClientPhase>(null);

	loadingSubjects$: Observable<boolean>;
	loadingPresentations$: Observable<boolean>;
	loadingViewQuestions$ = new BehaviorSubject<boolean>(false);
	filteredQuestions$: Observable<CoreTrainingPresentationQuestion[]>;

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.phases$ = this.store.pipe(
			select(fromMasterState.getPhases),
			filter((res) => !_isEmpty(res)),
			tap((res) => this.currentPhase$.next(res[0])) // Auto first in select
		);
		// get subjects by phase
		this.subjects$ = fromMasterState.getSubjectsFromEntity(
			this.store,
			this.currentPhase$,
			this.loadingViewQuestions$
		);

		this.presentations$ = this.store.pipe(select(fromPresentationState.getPresentations));
		this.loadingSubjects$ = this.store.pipe(select(fromMasterState.isSubjectsLoading));
		this.loadingPresentations$ = this.store.pipe(
			select(fromPresentationState.isPresentationsLoading)
		);
		merge(this.loadingPresentations$, this.loadingSubjects$)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(this.loadingViewQuestions$);

		this.questionsBySubjectEntity$ = this.store.pipe(
			select(fromPresentationState.getQuestionsBySubject)
		);

		this.filteredQuestions$ = combineLatest([
			this.questionsBySubjectEntity$,
			this.filterForm.valueChanges.pipe(startWith({})),
		]).pipe(
			map(([entity, filters]) => {
				if (_isEmpty(filters.subjectId)) return []; // Must have subjectId filter
				let arr: CoreTrainingPresentationQuestion[] = entity[filters.subjectId];
				if (_isEmpty(arr)) return []; // If not exists yet the return []
				
				// TEMPORARY: Status unanswered berdasarkan Answers.length
				if (!_isEmpty(filters.status)) {
					// if(filters.status === 'unanswered')
					// 	arr = arr.filter((q) => q.Answers.length === 0)
					// else 
						arr = arr.filter((q) => q.Status === filters.status);
				}

				if (!_isEmpty(filters.search))
					arr = arr.filter((q) => q.Question.Text.includes(filters.search));

				return arr;
			})
		);

		this.numOfQuestionsByStatus$ = combineLatest([
			this.questionsBySubjectEntity$,
			this.filterForm.valueChanges.pipe(startWith({})),
		]).pipe(
			map(([entity, filters]) => {
				const res = { total: 0, correct: 0, wrong: 0, unchecked: 0, unanswered:0 };
				if (_isEmpty(filters.subjectId)) return res; // Must have subjectId filter
				
				const arr: CoreTrainingPresentationQuestion[] = entity[filters.subjectId];
				if (_isEmpty(arr)) return res; // If not exists
				
				arr.forEach((q) => {
					// TEMPORARY: Status unanswered berdasarkan Answers.length
					// if(q.Answers.length === 0) res.unanswered++;
					// else 
						res[q.Status]++;
				});
				res.total = res.correct + res.wrong + res.unchecked;
				return res;
			})
		);

		// Auto fetch presentations by subject
		combineLatest([this.filterForm.get('subjectId').valueChanges, this.currentGeneration$])
			.pipe(
				takeUntil(this.destroyed$),
				withLatestFrom(this.questionsBySubjectEntity$),
				filter(([[subId, gen], entity]) => gen != null && subId !== '')
			)
			.subscribe(([[subId, gen], entity]) => {
				if (!subId) return [];
				if (!!subId && !_isEmpty(entity[subId])) return entity[subId];
				else
					this.store.dispatch(
						PresentationStateAction.FetchPresentationsBy({
							generationId: gen.GenerationId,
							subjectId: subId,
						})
					);
				return [];
			});

		this.store
			.pipe(
				select(fromMasterState.getPhases),
				filter((v) => !_isEmpty(v), takeUntil(this.destroyed$))
			)
			.subscribe((phases: ClientPhase[]) => {
				const corePhase = TryGetCoreTrainingPhase(phases);
				if (corePhase)
					this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: corePhase.PhaseId }));
			});

		this.subjects$
			.pipe(
				filter((res) => !_isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((subjects) => {
				this.filterForm.patchValue({ subjectId: subjects[0].SubjectId });
			});

		this.mainEffects.changeGen$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.store.dispatch(MasterStateAction.FetchPhases()));

		this.filterForm.valueChanges
			.pipe(takeUntil(this.destroyed$))
			.subscribe((data) => this.store.dispatch(PresentationStateAction.SetQuestionsFilter(data)));

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
	}

	refreshData() {
		this.store.dispatch(
			PresentationStateAction.FetchPresentationsBy({
				generationId: this.currentGeneration$.value.GenerationId,
				subjectId: this.filterForm.get('subjectId').value,
			})
		);
	}

	exportIntoExcel() {
		this.store.dispatch(
			PresentationStateAction.ExportAllQuestionsInGeneration({
				generationId: this.currentGeneration$.value.GenerationId,
			})
		);
	}

	deleteQuestion(qst: CoreTrainingPresentationQuestion) {}

	trackByQuestionId(idx: number, qst: CoreTrainingPresentationQuestion) {
		return qst.Question.Id;
	}
}
