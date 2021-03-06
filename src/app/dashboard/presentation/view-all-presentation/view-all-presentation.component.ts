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
} from 'src/app/shared/models';
import { isEmpty as _isEmpty, sortBy as _sortBy } from 'lodash';
import { takeUntil, filter, withLatestFrom, map, tap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { RoleFlags } from 'src/app/shared/constants/role.constant';
import { allValuesNotEmpty } from 'src/app/shared/methods';

@Component({
	selector: 'rd-view-all-presentation',
	templateUrl: './view-all-presentation.component.html',
	styleUrls: ['./view-all-presentation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAllPresentationComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy
{
	phases$: Observable<ClientPhase[]>;
	subjects$: Observable<ClientSubject[]>;
	presentations$: Observable<CoreTrainingPresentation[]>;
	traineesInSubject$: Observable<string[]>;
	presentationsForTrainee$: Observable<CoreTrainingPresentation[]>;

	currentPresentation$ = new BehaviorSubject<CoreTrainingPresentation>(null);
	currentPresentationScoring$: Observable<TraineePresentation>;
	currentTraineeCode$: Subject<string> = new Subject();
	currentSubject$: Subject<ClientSubject> = new Subject();
	currentPhase$: Subject<ClientPhase> = new Subject();

	showScoringForm$ = new BehaviorSubject(false);
	scoringForm = this.fb.group({
		// phaseId: ['', Validators.required],
		// subjectId: ['', Validators.required],
		// traineeId: ['', Validators.required],
		// presentationNo: ['', Validators.required],
		notes: ['', Validators.required],
		status: ['', Validators.required],
		classControl: ['', Validators.required],
		understanding: ['', Validators.required],
		voice: ['', Validators.required],
	});
	scoringData: { generationId; phaseId; subjectId; traineeId; presentationNo };
	deleteQuestionReason = this.fb.control('');

	subjectsLoading$: Observable<boolean>;
	loadingPresentations$: Observable<boolean>;
	loadingMyPresentations$: Observable<boolean>;
	loadingViewPresentation$ = new BehaviorSubject(false);

	constant = {
		role: RoleFlags,
	};

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private presentationEffects: PresentationStateEffects,
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
			map((subs: ClientSubject[]) => [...subs].reverse()), // The last subject is the first in list
			tap((res) => this.currentSubject$.next(res[0]))
		);
		this.subjectsLoading$ = this.store.pipe(select(fromMasterState.isSubjectsLoading));

		this.presentations$ = this.store.pipe(select(fromPresentationState.getPresentations));

		// Get scoring from presentationScorings
		// Expectation: presentationScorings fetched only one using REST method
		// (see 'FetchPresentationScorings' below)
		this.currentPresentationScoring$ = this.store.pipe(
			select(fromPresentationState.getPresentationScorings),
			map((scorings) => scorings[0]),
			tap((s: TraineePresentation) =>
				_isEmpty(s) ? this.scoringForm.reset() : this.scoringForm.patchValue(s)
			)
		);

		this.loadingPresentations$ = this.store.pipe(
			select(fromPresentationState.isPresentationsLoading)
		);
		this.loadingMyPresentations$ = this.store.pipe(
			select(fromPresentationState.isMyPresentationsLoading)
		);

		//#endregion

		// When one of these changed, also change filtered trainees
		// Expected list: T000 - T999
		// Get all trainee from filtered trainee code
		// Get all distinct trainee code that has presentation in a subject
		this.traineesInSubject$ = combineLatest([this.currentSubject$, this.presentations$]).pipe(
			takeUntil(this.destroyed$),
			map(([sbj, presentations]) => [
				...new Set<string>(
					presentations.filter((p) => p.SubjectId === sbj?.SubjectId).map((p) => p.TraineeCode)
				),
			].sort())
		);

		// get current trainee's presentation numbers (1,2,...)
		this.presentationsForTrainee$ = combineLatest([
			this.currentSubject$,
			this.presentations$,
			this.currentTraineeCode$,
		]).pipe(
			takeUntil(this.destroyed$),
			map(([sbj, presentations, traineeCode]) =>
				presentations.filter((p) => p.SubjectId === sbj?.SubjectId && p.TraineeCode === traineeCode)
			)
		);

		//#region Bind to effects
		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingViewPresentation$.next(false);
		});
		this.mainEffects.changeGen$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(MasterStateAction.FetchPhases());
		});
		this.presentationEffects.updateTraineePresentation$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.store.dispatch(PresentationStateAction.FetchPresentationScorings(this.scoringData));
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
				this.scoringData = {
					generationId: gen.GenerationId,
					phaseId: res.PhaseId,
					subjectId: res.SubjectId,
					traineeId: res.TraineeId,
					presentationNo: res.PresentationNo,
				};
			});

		//#region Auto fetch

		this.currentSubject$
			.pipe(
				filter((res) => !_isEmpty(res)),
				takeUntil(this.destroyed$),
				withLatestFrom(this.currentGeneration$)
			)
			.subscribe(([sub, gen]) => {
				this.store.dispatch(
					PresentationStateAction.FetchPresentationsBy({
						generationId: gen.GenerationId,
						subjectId: sub.SubjectId,
					})
				);
			});
		//#endregion

		//#region Auto get first value in array
		this.traineesInSubject$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((traineeCodes) => this.currentTraineeCode$.next(traineeCodes[0]));

		this.presentationsForTrainee$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((presentations) => this.currentPresentation$.next(presentations[0]));
		//#endregion

		//#endregion
		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
	}

	get understandingValue() {
		return this.scoringForm.get('understanding').value;
	}

	get voiceValue() {
		return this.scoringForm.get('voice').value;
	}

	get classControlValue() {
		return this.scoringForm.get('classControl').value;
	}

	get statusValue() {
		return this.scoringForm.get('status').value;
	}

	// getSubjectById(subId) {
	// 	return this.subjects.find((s) => s.SubjectId === subId);
	// }

	submitScoringForm() {
		this.loadingViewPresentation$.next(true);
		this.store.dispatch(
			PresentationStateAction.SaveTraineePresentation({
				data: TraineePresentation.fromJson({
					...this.scoringForm.value,
					...this.scoringData,
				}),
			})
		);
	}

	deleteQuestion(question: CoreTrainingPresentationQuestion) {
		this.loadingViewPresentation$.next(true);
		this.store.dispatch(
			PresentationStateAction.DeleteCoreTrainingPresentationItem({
				filename: question.parent.presentationFileName,
				itemId: question.Question.Id,
				note: this.deleteQuestionReason.value ?? '',
			})
		);
	}
}
