import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as CandidateStateAction from './candidate.action';
import * as fromCandidateState from './candidate.reducer';

import { Observable, from, of } from 'rxjs';
import {
	switchMap,
	withLatestFrom,
	mergeMap,
	share,
	concatMap,
} from 'rxjs/operators';
import { SubcoCandidateQuestionModel, SubcoCandidateAnswerModel } from '../../models';
import { SubcoCandidateService } from '../../services/subco-candidate.service';
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
		switchMap((action) =>
			this.candidateService.getQuestionForCurrentGen().pipe(
				mergeMap((res) =>
					of(
						CandidateStateAction.FetchQuestionsSuccess({
							payload: SubcoCandidateQuestionModel.fromJson(res),
						})
					)
				)
			)
		)
	);

	@Effect()
	getAnswers$: Observable<Action> = this.actions$.pipe(
		ofType(CandidateStateAction.FetchAnswers),
		switchMap((action) =>
			this.candidateService.getAnswersForCurrentGen().pipe(
				mergeMap((res) =>
					of(
						CandidateStateAction.FetchAnswersSuccess({
							payload: map(res, SubcoCandidateAnswerModel.fromJson),
						})
					), 
				)
			)
		)
	);

	@Effect()
	generationChanged$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.ChangeGeneration),
		// withLatestFrom(
		//   this.store.pipe(select(fromCandidateState.getCandidateState)),
		//   (action: Action, state: fromCandidateState.ICandidateState) => state
		// ),
		switchMap((action) =>
			of(
				CandidateStateAction.FetchAnswers(),
				CandidateStateAction.FetchQuestions()
			)
		)
	);
	// @Effect()
	// changeGeneration = this.actions$.pipe(
	//   ofType(CandidateStateAction.ChangeGeneration),

	// )
}
