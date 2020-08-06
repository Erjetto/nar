import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SubcoCandidateQuestionModel } from 'src/app/shared/models';
import { SubcoCandidateService } from 'src/app/shared/services/subco-candidate.service';
import * as CandidateStateAction from 'src/app/shared/stores/candidate/candidate.action';
import * as fromCandidateState from 'src/app/shared/stores/candidate/candidate.reducer';
import { clone, cloneDeep } from 'lodash';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'rd-candidate-questions',
	templateUrl: './candidate-questions.component.html',
	styleUrls: ['./candidate-questions.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateQuestionsComponent extends DashboardContentBase
	implements OnInit, OnDestroy {

	public questions: string[] = []; // For flexible input

	constructor(actionsSubject: ActionsSubject, private store: Store<IAppState>) {
		super(actionsSubject);
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

	onSubmit(value: any) {
		this.store.dispatch(
			CandidateStateAction.SaveQuestions({ payload: this.questions })
		);
	}
}
