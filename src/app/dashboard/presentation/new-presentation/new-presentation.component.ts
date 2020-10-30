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
	TraineePresentation,
	CoreTrainingPresentation,
	ClientPhase,
	ClientSubject,
	CoreTrainingPresentationComment,
	CoreTrainingPresentationQuestion,
	CoreTrainingPresentationItem,
} from 'src/app/shared/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';
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
				takeUntil(this.destroyed$)
			)
			.subscribe((phases) => {
				const corePhase = TryGetCoreTrainingPhase(phases);
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
		const c = this.fb.control('');
		this.questionsArray.push(c);
		// Auto focus here
	}

	saveCoreTrainingPresentation() {
		console.log(this.presentationForm.value);
		return;
		const { materialName, subjectId, questions, comments } = this.presentationForm.value;

		this.store.dispatch(
			PresentationStateAction.SaveCoreTrainingPresentation({
				data: new CoreTrainingPresentation(
					'',
					null,
					'',
					materialName,
					'',
					new CoreTrainingPresentationComment(comments),
					null,
					0,
					questions.map(
						(q: string) =>
							new CoreTrainingPresentationQuestion(
								new CoreTrainingPresentationItem([], [], '', '', '', '', q)
							)
					),
					subjectId
				),
			})
		);
	}
}
