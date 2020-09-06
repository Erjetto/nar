import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientInterviewQuestion, InterviewQuestionDetail } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { MainStateEffects, fromInterviewState, InterviewStateAction } from 'src/app/shared/store-modules';
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

    public formInterviewQuestion = this.fb.group({
      questionName: ['', Validators.required],
		  questions: ['[english],[indonesian],[weight]', Validators.required]
    })

	public interviewQuestions$: Observable<ClientInterviewQuestion[]>;
	public interviewQuestionDetails$: Observable<InterviewQuestionDetail[]>;
	public interviewQuestionsLoading$: Observable<boolean>;
	public interviewQuestionDetailsLoading$: Observable<boolean>;

	public currInterviewQuestion$ = new Subject<ClientInterviewQuestion>();

	public loadingViewInterviewQuestions$: Observable<boolean>;
	public loadingFormInterviewQuestions$ = new BehaviorSubject<boolean>(false);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
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

		this.interviewQuestions$.pipe(takeUntil(this.destroyed$)).subscribe((genInterview) => {
			this.currInterviewQuestion$.next(genInterview[0]);
		});

		this.currInterviewQuestion$ // Fetch interview question details
			.pipe(takeUntil(this.destroyed$))
			.subscribe((currGen) =>
				this.store.dispatch(
					InterviewStateAction.FetchInterviewQuestionDetails({
						interviewQuestionId: currGen.InterviewQuestionId,
					})
				)
			);

		this.mainEffects.crudSuccess$
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.currInterviewQuestion$))
			.subscribe(([action, currGenInterview]) => {
				this.store.dispatch(InterviewStateAction.FetchInterviewQuestions());
				this.loadingFormInterviewQuestions$.next(false);
			});

		this.store.dispatch(InterviewStateAction.FetchInterviewQuestions());
	}

	submitInterviewQuestionForm() {
		this.loadingFormInterviewQuestions$.next(true);
		this.store.dispatch(InterviewStateAction.CreateInterviewQuestion(this.formInterviewQuestion.value));
	}
}
