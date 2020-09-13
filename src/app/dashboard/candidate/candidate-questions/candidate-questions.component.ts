import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store, select } from '@ngrx/store';

import {
	CandidateStateAction,
	fromCandidateState,
	MainStateEffects,
	CandidateStateEffects,
	fromMainState,
} from 'src/app/shared/store-modules';
import { clone, isEmpty } from 'lodash';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { takeUntil, filter, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { SubcoCandidateQuestionModel } from 'src/app/shared/models';
import { FormBuilder, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { FetchQuestions } from 'src/app/shared/stores/candidate/candidate.action';

@Component({
	selector: 'rd-candidate-questions',
	templateUrl: './candidate-questions.component.html',
	styleUrls: ['./candidate-questions.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateQuestionsComponent extends DashboardContentBase implements OnInit, OnDestroy {
	questionModel$: Observable<SubcoCandidateQuestionModel>;
	loadingViewQuestions$: Observable<boolean>;

	questionsForm = this.fb.group({
		questions: this.fb.array([]),
	});

	questions: string[] = []; // For flexible input

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private candidateEffects: CandidateStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.questionModel$ = this.store.pipe(select(fromCandidateState.getQuestionModel));
		this.loadingViewQuestions$ = this.store.pipe(
			select(fromCandidateState.isLoadingQuestionsModel)
		);

		this.questionModel$
      .pipe(takeUntil(this.destroyed$), tap(console.log))
			.subscribe((model) => this.updateQuestions(model?.Questions));
		// (this.questions = clone(model?.Questions)));

		merge(this.mainEffects.changeGen$, this.candidateEffects.updateQuestions$)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.store.dispatch(CandidateStateAction.FetchQuestions());
			});

		this.store.dispatch(CandidateStateAction.FetchQuestions());
	}

	get questionsArray() {
		return this.questionsForm.get('questions') as FormArray;
	}

	removeQuestion(idx) {
		this.questionsArray.removeAt(idx);
	}

	addQuestion(value) {
		this.questionsArray.push(this.fb.control(value, Validators.required));
	}

	updateQuestions(value: string[]) {
		if (isEmpty(value)) {
			this.questionsArray.clear();
			return;
    }
    
		while (value.length - this.questionsArray.length > 0) {
			this.questionsArray.push(this.fb.control('', Validators.required));
		}
		while (value.length - this.questionsArray.length > 0) {
			this.questionsArray.removeAt(this.questionsArray.length - 1);
		}
		this.questionsArray.setValue(value);
	}

	saveQuestions() {
		this.store.dispatch(CandidateStateAction.SaveQuestions({ questions: this.questionsArray.value }));
	}
}
