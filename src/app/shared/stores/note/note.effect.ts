import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as NoteStateAction from './note.action';
import * as fromNoteState from './note.reducer';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, pluck, tap, share } from 'rxjs/operators';
import { NoteService } from '../../services/new/note.service';
import { GeneralService } from '../../services/new/general.service';

@Injectable({
	providedIn: 'root',
})
export class NoteStateEffects {
	constructor(
		private actions$: Actions,
		private generalService: GeneralService,
		private noteService: NoteService
	) {}

	@Effect()
	getEvaluation$: Observable<Action> = this.actions$.pipe(
		ofType(NoteStateAction.FetchEvaluation),
		switchMap((data) => this.noteService.GetEvaluation(data)),
		mergeMap((res) => of(NoteStateAction.FetchEvaluationSuccess({ payload: res }))),
		share()
	);

	@Effect()
	createEvaluationNote$: Observable<Action> = this.actions$.pipe(
		ofType(NoteStateAction.CreateEvaluationNote),
		switchMap((data) =>
			this.noteService.SaveEvaluationNote({
				notes: `[${data.evalType}] - ${data.notes}`,
				sdate: data.sdate,
			})
		),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('created evaluation note'))
				: of(MainStateAction.FailMessage('creating evaluation note'))
		),
		share()
	);

	@Effect()
	deleteEvaluationNote$: Observable<Action> = this.actions$.pipe(
		ofType(NoteStateAction.DeleteEvaluationNote),
		switchMap((data) => this.noteService.DeleteEvaluationNote(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('deleted evaluation note'))
				: of(MainStateAction.FailMessage('deleting evaluation note'))
		),
		share()
	);

	@Effect()
	getTraineesReputation$: Observable<Action> = this.actions$.pipe(
		ofType(NoteStateAction.FetchTraineesReputation),
		switchMap((data) => this.noteService.GetTraineesReputationByPhase(data)),
		mergeMap((res) => of(NoteStateAction.FetchTraineesReputationSuccess({ payload: res }))),
		share()
	);

	@Effect()
	getTraineeData$: Observable<Action> = this.actions$.pipe(
		ofType(NoteStateAction.FetchTraineeData),
		switchMap((data) => this.generalService.GetTraineeData(data)),
		mergeMap((res) => of(NoteStateAction.FetchTraineeDataSuccess({ payload: res }))),
		share()
	);

	@Effect()
	getTraineeDataForTrainer$: Observable<Action> = this.actions$.pipe(
		ofType(NoteStateAction.FetchTraineeDataForTrainer),
		switchMap((data) => this.noteService.GetTraineeDataForTrainer(data)),
		mergeMap((res) => of(NoteStateAction.FetchTraineeDataForTrainerSuccess({ payload: res }))),
		share()
	);

	@Effect()
	createTraineeNote$: Observable<Action> = this.actions$.pipe(
		ofType(NoteStateAction.CreateNote),
		switchMap((data) => this.noteService.SaveNote(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('inserted note'))
				: of(MainStateAction.FailMessage('inserting note'))
		),
		share()
	);

	@Effect()
	deleteTraineeNote$: Observable<Action> = this.actions$.pipe(
		ofType(NoteStateAction.DeleteNote),
		switchMap((data) => this.noteService.DeleteReputationNote(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('deleted note'))
				: of(MainStateAction.FailMessage('deleting note'))
		),
		share()
	);

	// @Effect()
	// getTraineeCommentHistory$: Observable<Action> = this.actions$.pipe(
	// 	ofType(NoteStateAction.FetchTraineeCommentHistory),
	// 	switchMap((data) => this.noteService.GetTraineeCommentHistory()),
	// 	mergeMap((res) => of(NoteStateAction.FetchTraineeCommentHistorySuccess({ payload: res }))),
	// 	share()
	// );
}
