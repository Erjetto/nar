import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as CaseStateAction from './case.action';
import * as MainStateAction from '../main/main.action';

import * as fromMainState from '../main/main.reducer';

import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, share, pluck } from 'rxjs/operators';
import { LeaderService } from '../../services/new/leader.service';
import { isEmpty as _isEmpty } from 'lodash';
import { TraineeService } from '../../services/new/trainee.service';

@Injectable({
	providedIn: 'root',
})
export class CaseStateEffects {
	constructor(
		private actions$: Actions,
		private leaderService: LeaderService,
		private traineeService: TraineeService
	) {}

	@Effect()
	getCases$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.FetchCases),
		switchMap((data) => this.leaderService.GetCase(data)),
		mergeMap((results) => of(CaseStateAction.FetchCasesSuccess({ payload: results }))),
		share()
	);

	@Effect()
	getCasesForTrainee$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.FetchTraineeCasesBy),
		switchMap((data) =>
			_isEmpty(data.subjectId)
				? this.traineeService.GetCaseByPhase(data)
				: this.traineeService.GetCaseBySubject({ phaseId: data.phaseId, subjectId: data.subjectId })
		),
		mergeMap((results) => of(CaseStateAction.FetchTraineeCasesSuccess({ payload: results }))),
		share()
	);

	@Effect()
	createCase$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.CreateCase),
		switchMap((data) => this.leaderService.SaveCase(data)),
		mergeMap((res) =>
			_isEmpty(res)
				? of(MainStateAction.SuccessfullyMessage('created case'))
				: of(MainStateAction.FailMessage('creating case', res.join('\n')))
		),
		share()
	);

	@Effect()
	updateCase$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.UpdateCase),
		switchMap((data) =>
			!_isEmpty(data.fileId)
				? this.leaderService.UpdateCaseIncludingFile({ ...data, fileId: data.fileId })
				: this.leaderService.UpdateCase(data)
		),
		mergeMap((res) =>
			_isEmpty(res)
				? of(MainStateAction.SuccessfullyMessage('updated case'))
				: of(MainStateAction.FailMessage('updating case', res.join('\n')))
		),
		share()
	);

	@Effect()
	deleteCase$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.DeleteCase),
		switchMap((data) => this.leaderService.DeleteCase(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('deleted case'))
				: of(MainStateAction.FailMessage('deleting case'))
		),
		share()
	);

	@Effect()
	submitTraineeAnswer$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.SubmitTraineeAnswer),
		switchMap((data) => this.traineeService.SaveAnswer(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('submitted answer'))
				: of(MainStateAction.FailMessage('submitting answer'))
		),
		share()
	);
}
