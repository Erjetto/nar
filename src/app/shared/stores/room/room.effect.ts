import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import * as RoomStateAction from '../room/room.action';
import * as MainStateAction from '../main/main.action';
import * as fromMainState from '../main/main.reducer';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, share, withLatestFrom } from 'rxjs/operators';
import { GeneralService } from '../../services/new/general.service';
import { RoomService } from '../../services/new/room.service';
import { DateHelper } from '../../utilities/date-helper';
import { IAppState } from 'src/app/app.reducer';
import { User } from '../../models';

@Injectable({
	providedIn: 'root',
})
export class RoomStateEffects {
	constructor(
		private actions$: Actions,
		private store: Store<IAppState>,
		private generalService: GeneralService,
		private roomService: RoomService
	) {}

	@Effect()
	getRooms$: Observable<Action> = this.actions$.pipe(
		ofType(RoomStateAction.FetchRooms),
		switchMap(() => this.roomService.GetAllRooms()),
		mergeMap((res) => of(RoomStateAction.FetchRoomsSuccess({ payload: res }))),
		share()
	);

	@Effect()
	getRoomTransactions$: Observable<Action> = this.actions$.pipe(
		ofType(RoomStateAction.FetchRoomTransactionsByDate),
		switchMap((data) =>
			this.roomService.GetRoomsTransactionByDate({
				date: DateHelper.dateToFormat(data.date, 'yyyy-MM-dd'),
			})
		),
		mergeMap((res) => of(RoomStateAction.FetchRoomTransactionsSuccess({ payload: res }))),
		share()
	);

	@Effect()
	createRoomTransactions$: Observable<Action> = this.actions$.pipe(
		ofType(RoomStateAction.CreateRoomTransaction),
		switchMap((data) =>
			this.roomService.SaveRoomTransaction({
				...data,
				Date: DateHelper.dateToFormat(data.Date, 'M-dd-yyyy'),
			})
		),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('saved the room transaction'))
				: of(MainStateAction.FailMessage('saving room transaction'))
		),
		share()
	);

	@Effect()
	deleteRoomTransactions$: Observable<Action> = this.actions$.pipe(
		ofType(RoomStateAction.DeleteRoomTransaction),
		withLatestFrom(this.store.pipe(select(fromMainState.getCurrentUser))),
		switchMap(([data, user]: [any, User]) =>
			this.roomService.RemoveRoomTransaction({
				transactionId: data.transactionId,
				userId: user.UserId,
			})
		),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('deleted the room transaction'))
				: of(MainStateAction.FailMessage('deleting room transaction'))
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
