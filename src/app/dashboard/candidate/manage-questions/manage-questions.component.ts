import { Component, OnInit } from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SubcoCandidateQuestionModel } from 'src/app/shared/models';
import { SubcoCandidateService } from 'src/app/shared/services/subco-candidate.service';
import * as CandidateStateAction from 'src/app/shared/stores/candidate/candidate.action';
import * as fromCandidateState from 'src/app/shared/stores/candidate/candidate.reducer';
import { clone, cloneDeep } from 'lodash';

@Component({
	selector: 'rd-manage-questions',
	templateUrl: './manage-questions.component.html',
	styleUrls: ['./manage-questions.component.scss'],
})
export class ManageQuestionsComponent implements OnInit {
	public questionModel$: Observable<SubcoCandidateQuestionModel>;

	public questions: string[] = []; // For flexible input

	constructor(
		private store: Store<IAppState>
	) {}

	ngOnInit(): void {
		this.questionModel$ = this.store.pipe(
			select(fromCandidateState.getQuestionModel)
    );

		this.questionModel$.subscribe(
			(model) => (this.questions = clone(model?.Questions))
		);

		this.store.dispatch(CandidateStateAction.FetchQuestions());
  }

	onSubmit(value: any) {
		this.store.dispatch(
			CandidateStateAction.SaveQuestions({ payload: this.questions })
		);
	}
}
