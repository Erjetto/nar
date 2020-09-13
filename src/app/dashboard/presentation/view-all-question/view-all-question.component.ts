import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, Subject, combineLatest } from 'rxjs';

import {
	MasterStateAction,
	fromMasterState,
	MainStateAction,
	fromMainState,
	PresentationStateAction,
	fromPresentationState,
} from 'src/app/shared/store-modules';

import {
	CoreTrainingPresentation,
	CoreTrainingPresentationQuestion,
	ClientSubject,
} from 'src/app/shared/models';
import { filter, withLatestFrom, takeUntil, tap } from 'rxjs/operators';
import { isEmpty } from 'lodash';

@Component({
	selector: 'rd-view-all-question',
	templateUrl: './view-all-question.component.html',
	styleUrls: ['./view-all-question.component.scss'],
})
export class ViewAllQuestionComponent extends DashboardContentBase implements OnInit, OnDestroy {
	presentations$: Observable<CoreTrainingPresentation>;

	filteredQuestions$: Observable<CoreTrainingPresentationQuestion>;
	subjects$: Observable<ClientSubject[]>;
	currentSubject$: Subject<ClientSubject> = new Subject();

	generations$: Observable<string>;

	constructor(protected store: Store<IAppState>) {
		super(store);
	}

	ngOnInit(): void {
		this.generations$ = this.store.pipe(select(fromMasterState.getGenerations));
		this.presentations$ = this.store.pipe(select(fromPresentationState.getPresentations));
		this.subjects$ = this.store.pipe(select(fromMasterState.getSubjects));

		this.subjects$ // Auto fetch presentation
			.pipe(
				filter((res) => !isEmpty(res)),
				withLatestFrom(this.currentGeneration$),
				takeUntil(this.destroyed$)
			)
			.subscribe(([subjects, gen]) => {
				this.currentSubject$.next(subjects[0]);
				this.store.dispatch(
					PresentationStateAction.FetchPresentations({
						generationId: gen.GenerationId,
						subjectId: subjects[0].SubjectId,
					})
				);
			});
	}
}
