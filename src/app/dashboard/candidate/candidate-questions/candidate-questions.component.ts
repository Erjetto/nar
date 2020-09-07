import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store, select } from '@ngrx/store';

import { CandidateStateAction, fromCandidateState } from 'src/app/shared/store-modules';
import { clone } from 'lodash';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'rd-candidate-questions',
	templateUrl: './candidate-questions.component.html',
	styleUrls: ['./candidate-questions.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateQuestionsComponent extends DashboardContentBase
	implements OnInit, OnDestroy {

	questions: string[] = []; // For flexible input

	constructor(protected store: Store<IAppState>) {
		super(store);
	}

	ngOnInit(): void {
		this.store
			.pipe(
				select(fromCandidateState.getQuestionModel),
				takeUntil(this.destroyed$)
			)
			.subscribe((model) => (this.questions = clone(model?.Questions)));

		this.reloadView();
	}

	reloadView() {
		this.store.dispatch(CandidateStateAction.FetchQuestions());
	}

	onSubmit() {
		this.store.dispatch(
			CandidateStateAction.SaveQuestions({ payload: this.questions })
		);
	}
}
