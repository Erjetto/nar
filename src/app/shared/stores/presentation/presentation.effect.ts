import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as PresentationStateAction from './presentation.action';
import * as fromPresentationState from './presentation.reducer';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, pluck, tap, share } from 'rxjs/operators';
import { PresentationService } from '../../services/new/presentation.service';
import { isEmpty } from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class PresentationStateEffects {
	constructor(private actions$: Actions, private presentationService: PresentationService) {}

	// @Effect()
	// getPresentationsByGeneration$: Observable<Action> = this.actions$.pipe(
	//   ofType(PresentationStateAction.FetchPresentations),
	//   switchMap(data => this.presentationService.FindCoreTrainingPresentationByGeneration(data)),
	//   mergeMap(res =>
	//     !isEmpty(res)
	//     ? of(PresentationStateAction.FetchPresentationsSuccess({payload: res}))
	//     : of(MainStateAction.ToastMessage({
	//       messageType: 'danger',
	//       message: 'Failed to get presentations'
	//     }))
	// ))

	@Effect()
	getPresentationsBySubject$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.FetchPresentations),
		switchMap((data) => this.presentationService.FindCoreTrainingPresentationBySubject(data)),
		mergeMap((res) => of(PresentationStateAction.FetchPresentationsSuccess({ payload: res }))),
		share()
	);

	@Effect()
	getPresentationStatus$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.FetchPresentationStatus),
		switchMap((data) => this.presentationService.GetPresentationStatus(data)),
		mergeMap((res) => of(PresentationStateAction.FetchPresentationStatusSuccess({ payload: res }))),
		share()
	);
}
