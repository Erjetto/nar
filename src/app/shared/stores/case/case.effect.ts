import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';


import * as CaseStateAction from './case.action';
import * as fromCaseState from './case.reducer';

import * as fromMainState from '../main/main.reducer';

import { Observable, from, of } from 'rxjs';
import { switchMap, withLatestFrom, mergeMap, share, tap, pluck, delay } from 'rxjs/operators';
import { Case, ClientPhase, ClientSubject, ClientCaseTrainer } from '../../models';
import { map } from 'lodash';
import { LeaderService } from '../../services/new/leader.service';

@Injectable({
	providedIn: 'root',
})
export class CaseStateEffects {
	constructor(
		private actions$: Actions,
		private mainStore: Store<fromMainState.IMainState>,
		private leaderService: LeaderService
	) {}

	@Effect()
	getCases$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.FetchCases),
		pluck('scheduleId'),
		switchMap((scheduleId: string) => this.leaderService.GetCase({ scheduleId })),
    mergeMap((results) => of(CaseStateAction.FetchCasesSuccess({ payload: results }))),
    share()
	);

	// @Effect()
	// getSubjects$: Observable<Action> = this.actions$.pipe(
	// 	ofType(CaseStateAction.FetchSubjects),
	// 	switchMap(() => {
	// 		return this.subjectService.getSubjects().pipe(
	// 			mergeMap((results: any) => {
	// 				const res = map(results, ClientSubject.fromJson);
	// 				return of(CaseStateAction.FetchSubjectsSuccess({ payload: res }));
	// 			})
	// 		);
	// 	})
	// );
}
