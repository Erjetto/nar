import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import { CaseService } from '../../services/case.service';

import * as CaseStateAction from './case.action';
import * as fromCaseState from './case.reducer';

import * as fromMainState from '../main/main.reducer';

import { Observable, from, of } from 'rxjs';
import {
	switchMap,
	withLatestFrom,
	mergeMap,
	share,
	tap,
  pluck,
  delay,
} from 'rxjs/operators';
import { Case, ClientPhase, ClientSubject, ClientCaseTrainer } from '../../models';
import { map } from 'lodash';
// import { CaseService } from '../services/generation.service';
// import { Observable } from 'rxjs';
// import { withLatestFrom, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class CaseStateEffects {
	constructor(
		private actions$: Actions,
		private mainStore: Store<fromMainState.IMainState>,
		private caseService: CaseService,
	) {}

	@Effect()
	getCases$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.FetchCases), delay(500),
    pluck('scheduleId'),
		switchMap((scheduleId: string) => {
			return this.caseService.getCases(scheduleId).pipe(
				mergeMap((results: any) => {
					const res = map(results, Case.fromJson);
					return of(CaseStateAction.FetchCasesSuccess({ payload: res }));
				})
			);
		})
  );
  
	@Effect()
	getClientCaseTrainers$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.FetchClientCaseTrainers), delay(500),
		switchMap(() => {
			return this.caseService.getClientCaseTrainers().pipe(
				mergeMap((results: any) => {
					const res = map(results, ClientCaseTrainer.fromJson);
					return of(CaseStateAction.FetchClientCaseTrainersSuccess({ payload: res }));
				})
			);
		})
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
