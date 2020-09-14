import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';


import * as BinusianStateAction from './binusian.action';

import * as fromMainState from '../main/main.reducer';

import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, share } from 'rxjs/operators';
import * as _ from 'lodash';
import { LeaderService } from '../../services/new/leader.service';
import { TraineeService } from '../../services/new/trainee.service';
import { GeneralService } from '../../services/new/general.service';

@Injectable({
	providedIn: 'root',
})
export class BinusianStateEffects {
	constructor(
		private actions$: Actions,
		private generalService: GeneralService	) {}

	@Effect()
	getTrainees$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchTrainees),
    switchMap(() => this.generalService.GetTrainees()),
    mergeMap((results) => of(BinusianStateAction.FetchTraineesSuccess({ payload: results }))),
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
