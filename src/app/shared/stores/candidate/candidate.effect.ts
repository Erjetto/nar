import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as CandidateStateAction from './candidate.action';
import * as fromCandidateState from './candidate.reducer';

import { Observable, from, of } from 'rxjs';
import { switchMap, withLatestFrom, mergeMap, share, concatMap } from 'rxjs/operators';
import { SubcoCandidateQuestionModel, SubcoCandidateAnswerModel } from '../../models';
import { SubcoCandidateService } from '../../services/new/subco-candidate.service';
import { map, tap } from 'lodash';
// import { GenerationService } from '../services/generation.service';
// import { withLatestFrom, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class CandidateStateEffects {
	constructor(
		private actions$: Actions,
		private store: Store<fromCandidateState.ICandidateState>,
		private candidateService: SubcoCandidateService
	) {}

	@Effect()
	getQuestions$: Observable<Action> = this.actions$.pipe(
		ofType(CandidateStateAction.FetchQuestions),
		switchMap((action) => this.candidateService.GetQuestionsForTrainerGeneration()),
		mergeMap((res) =>
			of(
				CandidateStateAction.FetchQuestionsSuccess({
					payload: SubcoCandidateQuestionModel.fromJson(res),
				})
			)
		),
		share()
	);

	@Effect()
	getAnswers$: Observable<Action> = this.actions$.pipe(
		ofType(CandidateStateAction.FetchAnswers),
		switchMap((action) => this.candidateService.GetAnswersFromTrainerGeneration()),
		mergeMap((res) =>
			of(
				CandidateStateAction.FetchAnswersSuccess({
					payload: map(res, SubcoCandidateAnswerModel.fromJson),
				})
			)
		),
		share()
  );
  
}
