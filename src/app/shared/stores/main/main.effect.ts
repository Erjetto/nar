import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import { GenerationService } from '../../services/generation.service';
import * as MainStateAction from './main.action';
import * as fromMainState from './main.reducer';
import { Observable, from, of } from 'rxjs';
import {
	switchMap,
	withLatestFrom,
	mergeMap,
	share,
	tap,
  pluck,
} from 'rxjs/operators';
import { ClientGeneration, ClientPhase, ClientSubject } from '../../models';
import { map } from 'lodash';
import { PhaseService } from '../../services/phase.service';
import { SubjectService } from '../../services/subject.service';
// import { GenerationService } from '../services/generation.service';
// import { Observable } from 'rxjs';
// import { withLatestFrom, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class MainStateEffects {
	constructor(
		private actions$: Actions,
		private store: Store<fromMainState.IMainState>,
		private genService: GenerationService,
		private phaseService: PhaseService,
		private subjectService: SubjectService
	) {}

	@Effect()
	getGenerations$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.FetchGenerations),
		// withLatestFrom(
		//   this.store.pipe(select(fromMainState.getMainState)),
		//   (action: Action, state: fromMainState.IMainState) => state
		// ),
		switchMap(() => {
			return this.genService.getGenerations().pipe(
				// of(MainStateAction.FetchGenerationsSuccess({ payload: map(results, ClientGeneration.fromJson) }))
				mergeMap((results: any) => {
					const res = map(results, ClientGeneration.fromJson);
					return of(MainStateAction.FetchGenerationsSuccess({ payload: res }));
				})
			);
		})
	);

	@Effect()
	getPhases$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.FetchPhases),
		switchMap(() => {
			return this.phaseService.getPhases().pipe(
				mergeMap((results: any) => {
					const res = map(results, ClientPhase.fromJson);
					return of(MainStateAction.FetchPhasesSuccess({ payload: res }));
				})
			);
		})
	);

	@Effect()
	getSubjects$: Observable<Action> = this.actions$.pipe(
    ofType(MainStateAction.FetchSubjects, MainStateAction.SetPhase),
    pluck('PhaseId'),
		switchMap((phaseId: string) => {
			return this.subjectService.getSubjects(phaseId).pipe(
				mergeMap((results: any) => {
					const res = map(results, ClientSubject.fromJson);
					return of(MainStateAction.FetchSubjectsSuccess({ payload: res }));
				})
			);
		})
	);

	@Effect()
	getSchedule$: Observable<Action> = this.actions$.pipe(
    ofType(MainStateAction.FetchSchedules, MainStateAction.SetSubject),
    pluck('PhaseId'),
		switchMap((phaseId: string) => {
			return this.subjectService.getSubjects(phaseId).pipe(
				mergeMap((results: any) => {
					const res = map(results, ClientSubject.fromJson);
					return of(MainStateAction.FetchSubjectsSuccess({ payload: res }));
				})
			);
		})
	);
}
