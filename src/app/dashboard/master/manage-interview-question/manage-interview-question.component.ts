import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientInterviewQuestion, InterviewQuestionDetail } from 'src/app/shared/models';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	MainStateEffects,
	fromInterviewState,
	InterviewStateAction,
	MasterStateEffects,
	InterviewStateEffects,
	MainStateAction,
} from 'src/app/shared/store-modules';
import { Observable, BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { takeUntil, map, withLatestFrom, tap } from 'rxjs/operators';
import { NgForm, FormBuilder, Validators } from '@angular/forms';

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

	currInterviewQuestion$ = new Subject<ClientInterviewQuestion>();

	loadingViewInterviewQuestions$: Observable<boolean>;
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
		this.loadingViewInterviewQuestions$ = combineLatest([
			this.interviewQuestionDetailsLoading$,
			this.interviewQuestionsLoading$,
		]).pipe(map(([a, b]) => a || b));
		//#endregion

		//#region Auto select first in array
		this.interviewQuestions$.pipe(takeUntil(this.destroyed$)).subscribe((genInterview) => {
			this.currInterviewQuestion$.next(genInterview[0]);
		});
		//#endregion

		//#region Auto fetch
		this.currInterviewQuestion$ // Fetch interview question details
			.pipe(takeUntil(this.destroyed$))
			.subscribe((currGen) =>
				this.store.dispatch(
					InterviewStateAction.FetchInterviewQuestionDetails({
						interviewQuestionId: currGen.InterviewQuestionId,
					})
				)
			);
		//#endregion

		//#region Subscribe to effects
		this.interviewEffects.createInterviewQuestion$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.store.dispatch(InterviewStateAction.FetchInterviewQuestions()));

		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe((action) => {
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
		this.store.dispatch(
			InterviewStateAction.CreateInterviewQuestion(this.formInterviewQuestion.value)
		);
	}
}
