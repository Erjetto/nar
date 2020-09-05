import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientInterviewQuestion, InterviewQuestionDetail } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { MainStateEffects, fromMasterState, MasterStateAction } from 'src/app/shared/store-modules';
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
		this.interviewQuestions$ = this.store.pipe(select(fromMasterState.getInterviewQuestion));
		this.interviewQuestionDetails$ = this.store.pipe(
			select(fromMasterState.getInterviewQuestionDetails)
		);
		this.interviewQuestionsLoading$ = this.store.pipe(
			select(fromMasterState.isInterviewQuestionsLoading)
		);
		this.interviewQuestionDetailsLoading$ = this.store.pipe(
			select(fromMasterState.isInterviewQuestionDetailsLoading)
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
					MasterStateAction.FetchInterviewQuestionDetails({
						interviewQuestionId: currGen.InterviewQuestionId,
					})
				)
			);

		this.mainEffects.crudSuccess$
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.currInterviewQuestion$))
			.subscribe(([action, currGenInterview]) => {
				this.store.dispatch(MasterStateAction.FetchInterviewQuestions());
				this.loadingFormInterviewQuestions$.next(false);
			});

		this.store.dispatch(MasterStateAction.FetchInterviewQuestions());
	}

	submitInterviewQuestionForm() {
		this.loadingFormInterviewQuestions$.next(true);
		this.store.dispatch(MasterStateAction.CreateInterviewQuestion(this.formInterviewQuestion.value));
	}
}
