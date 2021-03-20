import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {
	CoreTrainingPresentation,
	CoreTrainingPresentationQuestion,
	CoreTrainingPresentationItem,
	QuestionStatus,
} from 'src/app/shared/models';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, Subject, BehaviorSubject, combineLatest, merge } from 'rxjs';
import {
	fromPresentationState,
	PresentationStateAction,
	PresentationStateEffects,
	MainStateEffects,
} from 'src/app/shared/store-modules';
import { map, takeUntil, tap, startWith, filter, first, withLatestFrom } from 'rxjs/operators';
import { RoleFlags } from 'src/app/shared/constants/role.constant';
import {
	NgForm,
	FormControl,
	Validators,
	FormBuilder,
	FormArray,
	AbstractControl,
} from '@angular/forms';
import { isEmpty as _isEmpty, cloneDeep as _cloneDeep } from 'lodash';

@Component({
	selector: 'rd-view-question',
	templateUrl: './view-question.component.html',
	styleUrls: ['./view-question.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewQuestionComponent extends DashboardContentBase implements OnInit, OnDestroy {
	presentation$: Observable<CoreTrainingPresentation>;
	questionsByTrainee$: Observable<CoreTrainingPresentationQuestion[]>;
	question$: Observable<CoreTrainingPresentationQuestion>;

	generationId$ = new BehaviorSubject<string>('');
	traineeId$ = new BehaviorSubject<string>('');
	questionId$ = new BehaviorSubject<string>('');

	loadingPresentations$: Observable<boolean>;
	loadingViewQuestion$ = new BehaviorSubject<boolean>(false);

	answersForm = this.fb.array([
		// 	// Automatically generated after fetching question
		// 	// this.fb.group({
		// 	//   isEditing: [false],
		// 	//   answer: ['', Validators.required],
		// 	//   newComments: ['', Validators.required],
		// 	//   comments: this.fb.array([])
		// 	// })
	]);
	newAnswerText = this.fb.control('', Validators.required);

	constant = { role: RoleFlags };
	currQuestionData: { filename: string };

	constructor(
		protected store: Store<IAppState>,
		private presentationEffects: PresentationStateEffects,
		private mainEffects: MainStateEffects,
		private activatedRoute: ActivatedRoute,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.loadingPresentations$ = this.store.pipe(
			select(fromPresentationState.isPresentationsLoading)
		);
		this.loadingPresentations$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(this.loadingViewQuestion$);
		//#region Bind from store
		this.questionsByTrainee$ = this.store.pipe(select(fromPresentationState.getQuestionsByTrainee));
		//#endregion

		// Find question in an already fetched presentation, and also process it
		this.question$ = combineLatest([
			this.store.pipe(select(fromPresentationState.getQuestionsByTrainee)),
			this.questionId$,
			this.traineeId$,
		]).pipe(
			map(
				([questions, questionId, traineeId]: // Kasih tahu type biar autocomplete muncul
				[{ [id: string]: CoreTrainingPresentationQuestion[] }, string, string]) => {
					// Clone because store data is read-only
					const qst = _cloneDeep(questions[traineeId]?.find((q) => q.Question.Id === questionId));

					if (qst == null) return null;
					// Remove deleted answers
          qst.Answers = qst.Answers.filter((a) => !a.Text.includes('[DELETED]'));
          this.loadingViewQuestion$.next(false);
					return qst;
				}
			)
		);

		this.presentation$ = this.question$.pipe(map((q) => q?.parent));

		this.activatedRoute.params.subscribe((params) => {
			const { questionId, traineeId, generationId } = params;
			this.traineeId$.next(traineeId);
			this.generationId$.next(generationId);
			this.questionId$.next(questionId);
		});

    // Selalu hilangkan loading pertama waktu load presentation, jadi kasi jeda 
    // utk solusi sementara
    setTimeout(() => {
      this.mainEffects.afterRequest$
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => this.loadingViewQuestion$.next(false));
    }, 1000);

		merge(
			this.presentationEffects.addCoreTrainingPresentationAnswer$,
			this.presentationEffects.addCoreTrainingPresentationComment$,
			this.presentationEffects.updateCoreTrainingPresentationAnswer$,
			this.presentationEffects.updateCoreTrainingPresentationComment$,
			this.presentationEffects.deleteCoreTrainingPresentationItem$
		)
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.traineeId$, this.generationId$))
			.subscribe(([action, trId, genId]) =>{
				this.store.dispatch(
					PresentationStateAction.FetchPresentationsBy({
						generationId: genId,
						traineeId: trId,
					})
				)
        this.loadingViewQuestion$.next(true);
			});

		combineLatest([this.question$, this.traineeId$, this.generationId$])
			// Trigger fetch until this.question$ get value other than empty value
			.pipe(takeUntil(this.destroyed$))
			.subscribe(([qst, trId, genId]) => {
				if (_isEmpty(qst)) {
					this.store.dispatch(
						PresentationStateAction.FetchPresentationsBy({
							generationId: genId,
							traineeId: trId,
						})
					);
					this.loadingViewQuestion$.next(true);
				} else {
					this.currQuestionData = {
						filename: qst.parent.presentationFileName,
					};
					// Create form controls for all answer & comments so we can put
					// control for every question & answers including unowned ones
					this.answersForm = this.fb.array(
						qst.Answers.map((a) =>
							// this.answersForm.push(
							this.fb.group({
								isEditing: [false],
								isEditingComments: this.fb.array(a.Comments.map((c) => this.fb.control(false))),
							})
						)
						// );
					);
				}
			});
		this.loadingViewQuestion$.next(true);
	}

	isAnswerEditing(answerIdx) {
		return this.answersForm.value[answerIdx]['isEditing'];
	}

	isCommentEditing(answerIdx, commentIdx) {
		return this.answersForm.value[answerIdx]['isEditingComments'][commentIdx];
	}

	toggleEdit(answerIdx, commentIdx?) {
		console.log(answerIdx, commentIdx);

		let control: AbstractControl = null;
		if (commentIdx === undefined) control = this.answersForm.controls[answerIdx].get('isEditing');
		else
			control = (this.answersForm.controls[answerIdx].get('isEditingComments') as FormArray)
				.controls[commentIdx];

		control.setValue(!control.value);
	}

	addAnswer() {
		this.store.dispatch(
			PresentationStateAction.AddCoreTrainingPresentationAnswer({
				filename: this.currQuestionData.filename,
				questionId: this.questionId$.value,
				text: this.newAnswerText.value,
			})
		);
		this.loadingViewQuestion$.next(true);
	}

	updateAnswer(answerId: string, status?: QuestionStatus, answerChange?: string) {
		this.store.dispatch(
			PresentationStateAction.UpdateCoreTrainingPresentationItem({
				filename: this.currQuestionData.filename,
				itemId: answerId,
				status,
				text: answerChange,
			})
		);
		this.loadingViewQuestion$.next(true);
	}

	deleteAnswer(answerId: string) {
		this.store.dispatch(
			PresentationStateAction.DeleteCoreTrainingPresentationItem({
				filename: this.currQuestionData.filename,
				itemId: answerId,
				note: '',
			})
		);
		this.loadingViewQuestion$.next(true);
	}

	addComment(form: NgForm) {
		const { itemId, comment } = form.value;
		this.store.dispatch(
			PresentationStateAction.AddCoreTrainingPresentationComment({
				filename: this.currQuestionData.filename,
				itemId,
				text: comment,
			})
		);
		this.loadingViewQuestion$.next(true);
	}

	// NOTE: Comment can't be edited and deleted yet

	updateComment(form: NgForm) {
		const { itemId, commentId, comment } = form.value;
		this.store.dispatch(
			PresentationStateAction.UpdateCoreTrainingPresentationComment({
				filename: this.currQuestionData.filename,
				itemId,
				comment,
				commentId,
			})
		);
		this.loadingViewQuestion$.next(true);
	}

	deleteComment(answerId: string, commentId: string) {
		this.store.dispatch(
			PresentationStateAction.DeleteCoreTrainingPresentationComment({
				filename: this.currQuestionData.filename,
				itemId: answerId,
				commentId,
			})
		);
		this.loadingViewQuestion$.next(true);
	}
}
