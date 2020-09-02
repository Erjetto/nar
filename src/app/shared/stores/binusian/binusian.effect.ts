import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';


import * as BinusianStateAction from './binusian.action';
import * as fromBinusianState from './binusian.reducer';

import * as fromMainState from '../main/main.reducer';

import { Observable, from, of } from 'rxjs';
import { switchMap, withLatestFrom, mergeMap, share, tap, pluck, delay } from 'rxjs/operators';
import { Case, ClientPhase, ClientSubject, ClientCaseTrainer } from '../../models';
import { map } from 'lodash';
import { LeaderService } from '../../services/new/leader.service';
import { TraineeService } from '../../services/new/trainee.service';
import { GeneralService } from '../../services/new/general.service';

@Injectable({
	providedIn: 'root',
})
export class BinusianStateEffects {
	constructor(
		private actions$: Actions,
		private mainStore: Store<fromMainState.IMainState>,
		private leaderService: LeaderService,
		private generalService: GeneralService,
		private traineeService: TraineeService
	) {}

	@Effect()
	getTrainees$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchTrainees),
    switchMap(() => this.generalService.GetTrainees()),
		mergeMap((results) => of(BinusianStateAction.FetchTraineesSuccess({ payload: results })))
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
