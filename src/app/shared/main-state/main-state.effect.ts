import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import * as MainStateAction from './main-state.action';
import * as fromMainState from './main-state.reducer';
// import { GenerationService } from '../services/generation.service';
// import { Observable } from 'rxjs';
// import { withLatestFrom, switchMap } from 'rxjs/operators';

@Injectable()
export class MainStateEffects {
	constructor(
		private actions$: Actions,
		private store: Store<fromMainState.MainState>,
		private genService: GenerationService
  ) {}
  
  // @Effect()
  // getGenerations: Observable<Action> = this.actions$.pipe(
  //   ofType(MainStateAction.ChangeGeneration)
  // )
  // @Effect()
  // changeGeneration: Observable<Action> = this.actions$.pipe(
  //   ofType(MainStateAction.ChangeGeneration),
  //   switchMap(() => {
  //     let res = this.genService.
  //   })    
  // )
}
