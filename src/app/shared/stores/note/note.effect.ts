import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as NoteStateAction from './note.action';
import * as fromNoteState from './note.reducer';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, pluck, tap, share } from 'rxjs/operators';
import { NoteService } from '../../services/new/note.service';
import * as _ from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class NoteStateEffects {
	constructor(private actions$: Actions, private noteService: NoteService) {}


	@Effect()
	getEvaluation$: Observable<Action> = this.actions$.pipe(
		ofType(NoteStateAction.FetchEvaluation),
		switchMap((data) => this.noteService.GetEvaluation(data)),
		mergeMap((res) => of(NoteStateAction.FetchEvaluationSuccess({ payload: res }))),
		share()
	);

}
