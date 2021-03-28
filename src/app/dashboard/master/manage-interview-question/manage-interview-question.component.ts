import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientInterviewQuestion, InterviewQuestionDetail } from 'src/app/shared/models';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	MainStateEffects,
	fromInterviewState,
	InterviewStateAction,
	InterviewStateEffects,
	MainStateAction,
} from 'src/app/shared/store-modules';
import { Observable, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { takeUntil, map, filter } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { isEmpty as _isEmpty } from 'lodash';

@Component({
	selector: 'rd-manage-interview-question',
	templateUrl: './manage-interview-question.component.html',
	styleUrls: ['./manage-interview-question.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageInterviewQuestionComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
	formInterviewQuestion = this.fb.group({
		questionName: ['', Validators.required],
		questions: ['[english],[indonesian],[weight]', Validators.required],
	});

	interviewQuestions$: Observable<ClientInterviewQuestion[]>;
	interviewQuestionDetails$: Observable<InterviewQuestionDetail[]>;
	interviewQuestionsLoading$: Observable<boolean>;
	interviewQuestionDetailsLoading$: Observable<boolean>;

	currInterviewQuestion$ = new BehaviorSubject<ClientInterviewQuestion>(null);

	loadingViewInterviewQuestions$ = new BehaviorSubject<boolean>(false);
	loadingFormInterviewQuestions$ = new BehaviorSubject<boolean>(false);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private interviewEffects: InterviewStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.interviewQuestions$ = this.store.pipe(select(fromInterviewState.getInterviewQuestions));
		this.interviewQuestionDetails$ = this.store.pipe(
			select(fromInterviewState.getInterviewQuestionDetails)
		);
		this.interviewQuestionsLoading$ = this.store.pipe(
			select(fromInterviewState.isInterviewQuestionsLoading)
		);
		this.interviewQuestionDetailsLoading$ = this.store.pipe(
			select(fromInterviewState.isInterviewQuestionDetailsLoading)
		);
		
		combineLatest([
			this.interviewQuestionDetailsLoading$,
			this.interviewQuestionsLoading$,
		]).pipe(
			takeUntil(this.destroyed$),
			map(([a, b]) => a || b)
		).subscribe(this.loadingViewInterviewQuestions$);

		//#endregion

		//#region Auto select first in array
		this.interviewQuestions$.pipe(takeUntil(this.destroyed$)).subscribe((genInterview) => {
			this.currInterviewQuestion$.next(genInterview[0]);
		});
		//#endregion

		//#region Auto fetch
		this.currInterviewQuestion$ // Fetch interview question details
			.pipe(takeUntil(this.destroyed$), filter(v => !_isEmpty(v)))
			.subscribe((currGen) =>
				this.store.dispatch(
					InterviewStateAction.FetchInterviewQuestionDetails({
						interviewQuestionId: currGen.InterviewQuestionId,
					})
				)
			);
		//#endregion

		//#region Subscribe to effects
		merge(
			this.interviewEffects.createInterviewQuestion$,
			this.interviewEffects.deleteInterviewQuestion$
		)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.store.dispatch(InterviewStateAction.FetchInterviewQuestions()));

		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingFormInterviewQuestions$.next(false);
		});
		//#endregion

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: InterviewStateAction.FetchInterviewQuestions(),
				selectorToBeChecked: fromInterviewState.getInterviewQuestions,
			})
		);
	}

	submitInterviewQuestionForm() {
		this.loadingFormInterviewQuestions$.next(true);
		const {questionName, questions} = this.formInterviewQuestion.value;
		this.store.dispatch(
			InterviewStateAction.CreateInterviewQuestion({
				questionName,
				questions: questions.split('\n').map(s => s.trim())
			})
		);
	}

	deleteInterviewQuestion(){
		this.loadingViewInterviewQuestions$.next(true);
		this.store.dispatch(
			InterviewStateAction.DeleteInterviewQuestion({
				interviewQuestionId: this.currInterviewQuestion$.value.InterviewQuestionId
			})
		);
	}
}
