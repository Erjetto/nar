import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	MainStateEffects,
	PresentationStateEffects,
	PresentationStateAction,
	fromMasterState,
	MasterStateAction,
	MainStateAction,
} from 'src/app/shared/store-modules';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import {
	CoreTrainingPresentation,
	ClientPhase,
	ClientSubject,
	CoreTrainingPresentationComment,
	CoreTrainingPresentationQuestion,
	CoreTrainingPresentationItem,
} from 'src/app/shared/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, takeUntil, filter, withLatestFrom, tap } from 'rxjs/operators';
import { isEmpty as _isEmpty } from 'lodash';
import { TryGetCoreTrainingPhase } from 'src/app/shared/methods';
import { getSubjectsFromEntity } from 'src/app/shared/stores/master/master.reducer';

@Component({
	selector: 'rd-new-presentation',
	templateUrl: './new-presentation.component.html',
	styleUrls: ['./new-presentation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPresentationComponent extends DashboardContentBase implements OnInit, OnDestroy {
	phases$: Observable<ClientPhase[]>;
	subjects$: Observable<ClientSubject[]>;
	currentPhase$ = new BehaviorSubject<ClientPhase>(null);

	loadingFormPresentation$ = new BehaviorSubject(false);

	presentationForm = this.fb.group({
		generationId: [null],
		phaseId: [null],
		materialName: ['', Validators.required],
		subjectId: [null, Validators.required],
		questions: this.fb.array([this.fb.control('', Validators.required)]),
		comments: ['', Validators.required],
		presentationNo: [0],
	});

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private presentationEffects: PresentationStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		// this.subjects$ = this.store.pipe(
		// 	select(fromMasterState.getSubjects),
		// 	map((subs: ClientSubject[]) => [...subs].reverse()) // The last subject is the first in list
		// );
		this.subjects$ = getSubjectsFromEntity(
			this.store,
			this.currentPhase$,
			this.loadingFormPresentation$
		);

		this.phases$
			.pipe(
				filter((res) => !_isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((phases) => {
				const corePhase = TryGetCoreTrainingPhase(phases);
				this.currentPhase$.next(corePhase);
			});

		this.currentPhase$
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.currentGeneration$))
			.subscribe(([phase, gen]) =>
				this.presentationForm.patchValue({
					generationId: gen.GenerationId,
					phaseId: phase.PhaseId,
				})
			);

		this.subjects$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((subjects) => {
				this.presentationForm.get('subjectId').setValue(subjects[0].SubjectId);
			});

		this.mainEffects.changeGen$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(MasterStateAction.FetchPhases());
		});

		this.presentationEffects.createTraineePresentation$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.loadingFormPresentation$.next(false);
			});

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
	}

	get questionsArray() {
		return this.presentationForm.get('questions') as FormArray;
	}

	get commentControl() {
		return this.presentationForm.get('comments') as FormControl;
	}

	deleteQuestion(index) {
		this.questionsArray.removeAt(index);
	}

	addQuestion() {
		const c = this.fb.control('', Validators.required);
		this.questionsArray.push(c);
		// Auto focus here
	}

	saveCoreTrainingPresentation() {
		this.loadingFormPresentation$.next(true);

		const { generationId, phaseId, materialName, subjectId, questions, comments } =
			this.presentationForm.value;

		const data = new CoreTrainingPresentation();
		data.GenerationId = generationId;
		data.PhaseId = phaseId;
		data.SubjectId = subjectId;
		data.PresentationComment = new CoreTrainingPresentationComment(comments);
		data.Material = materialName;
		data.Questions = questions.map(
			(q: string) => new CoreTrainingPresentationQuestion(new CoreTrainingPresentationItem(q))
		);
		data.PresentationDate = new Date();
		this.store.dispatch(PresentationStateAction.SaveCoreTrainingPresentation({ data }));
	}
}
