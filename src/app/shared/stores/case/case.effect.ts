import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';


import * as CaseStateAction from './case.action';

import * as fromMainState from '../main/main.reducer';

import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, share, pluck } from 'rxjs/operators';
import { LeaderService } from '../../services/new/leader.service';

@Injectable({
	providedIn: 'root',
})
export class CaseStateEffects {
	constructor(
		private actions$: Actions,
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
