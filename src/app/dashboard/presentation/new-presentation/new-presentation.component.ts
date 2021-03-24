import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { FormBuilder, Validators, FormArray } from '@angular/forms';
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
import { map, takeUntil, filter, withLatestFrom } from 'rxjs/operators';
import { isEmpty as _isEmpty } from 'lodash';
import { TryGetCoreTrainingPhase } from 'src/app/shared/methods';

@Component({
	selector: 'rd-new-presentation',
	templateUrl: './new-presentation.component.html',
	styleUrls: ['./new-presentation.component.scss'],
})
export class NewPresentationComponent extends DashboardContentBase implements OnInit, OnDestroy {
	phases$: Observable<ClientPhase[]>;
	subjects$: Observable<ClientSubject[]>;

	loadingFormPresentation$ = new BehaviorSubject<boolean>(false);

	presentationForm = this.fb.group({
		generationId: [''],
		phaseId: [''],
		materialName: ['', Validators.required],
		subjectId: ['', Validators.required],
		questions: this.fb.array([this.fb.control('')]),
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
		this.subjects$ = this.store.pipe(
			select(fromMasterState.getSubjects),
			map((subs: ClientSubject[]) => [...subs].reverse()) // The last subject is the first in list
		);

		this.phases$
			.pipe(
				filter((res) => !_isEmpty(res)),
				takeUntil(this.destroyed$),
				withLatestFrom(this.currentGeneration$)
			)
			.subscribe(([phases, gen]) => {
				const corePhase = TryGetCoreTrainingPhase(phases);
				this.presentationForm.patchValue({
					generationId: gen.GenerationId,
					phaseId: corePhase.PhaseId,
				});
				this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: corePhase.PhaseId }));
			});

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

		const {
			generationId,
			phaseId,
			materialName,
			subjectId,
			questions,
			comments,
		} = this.presentationForm.value;

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
