import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	MainStateEffects,
	CandidateStateEffects,
	CandidateStateAction,
	fromCandidateState,
	MainStateAction,
} from 'src/app/shared/store-modules';
import { FormBuilder } from '@angular/forms';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { SubcoCandidateQuestionModel, SubcoCandidateAnswerModel } from 'src/app/shared/models';
import { takeUntil, filter, withLatestFrom, tap } from 'rxjs/operators';
import { isEmpty as _isEmpty } from 'lodash';
import { adjustControlsInFormArray, dateInRange } from 'src/app/shared/methods';

@Component({
	selector: 'rd-fill-answers',
	templateUrl: './fill-answers.component.html',
	styleUrls: ['./fill-answers.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FillAnswersComponent extends DashboardContentBase implements OnInit, OnDestroy {
	questionModel$: Observable<SubcoCandidateQuestionModel>;
	userAnswers$: Observable<SubcoCandidateAnswerModel[]>;
	currentUserAnswer$ = new BehaviorSubject<SubcoCandidateAnswerModel>(null);
	loadingViewQuestions$ = new BehaviorSubject<boolean>(false);

	canAnswer$ = new BehaviorSubject<boolean>(false);

	answersForm = this.fb.array([]);

	constructor(
		protected store: Store<IAppState>,
		private candidateEffects: CandidateStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.questionModel$ = this.store.pipe(select(fromCandidateState.getQuestionModel));
		this.userAnswers$ = this.store.pipe(select(fromCandidateState.getCurrentUserAnswer));

		this.store
			.pipe(takeUntil(this.destroyed$), select(fromCandidateState.isLoadingQuestionsModel))
			.subscribe(this.loadingViewQuestions$);
		this.store
			.pipe(takeUntil(this.destroyed$), select(fromCandidateState.isLoadingAnswersModel))
			.subscribe(this.loadingViewQuestions$);

		this.questionModel$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$),
				withLatestFrom(this.currentUserAnswer$, this.canAnswer$)
			)
			.subscribe(
				([qst, ans, canAnswer]: [
					SubcoCandidateQuestionModel,
					SubcoCandidateAnswerModel,
					boolean
				]) => {
					adjustControlsInFormArray(this.answersForm, qst.Questions.length);
					if (!canAnswer) this.answersForm.disable();
					else this.answersForm.enable();
					this.answersForm.patchValue(ans?.Answers);
				}
			);

		// Fetch Question for selected answer
		this.currentUserAnswer$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((a) => {
				this.canAnswer$.next(dateInRange(a.StartDate, a.EndDate));
				this.store.dispatch(
					CandidateStateAction.FetchQuestionsById({
						questionId: a.SubcoCandidateQuestionId,
					})
				);
				this.loadingViewQuestions$.next(true);
			});

		// Remove loading
		merge(this.candidateEffects.getAnswers$, this.candidateEffects.getQuestionsById$) // saveanswer
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.loadingViewQuestions$.next(false);
			});

		// Re-fetch after save answer
		merge(this.candidateEffects.updateAnswers$)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.store.dispatch(CandidateStateAction.FetchCurrentUserAnswer());
			});

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: CandidateStateAction.FetchCurrentUserAnswer(),
				selectorToBeChecked: fromCandidateState.getCurrentUserAnswer,
			})
		);
	}

	saveAnswers() {
		this.store.dispatch(
			CandidateStateAction.SaveAnswers({
				answerId: this.currentUserAnswer$.value.Id,
				answers: this.answersForm.value,
			})
		);
		this.loadingViewQuestions$.next(true);
	}
}
