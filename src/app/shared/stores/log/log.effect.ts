import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as LogStateAction from './log.action';
import * as fromMainState from '../main/main.reducer';
import * as fromMasterState from '../master/master.reducer';
import * as fromLogState from './log.reducer';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, pluck, tap, share, withLatestFrom } from 'rxjs/operators';
import { LogService } from '../../services/new/log.service';
import { RoomService } from '../../services/new/room.service';
import { DateHelper } from '../../utilities/date-helper';

import { EMPTY_GUID, User } from '../../models';
import { IAppState } from 'src/app/app.reducer';
import { isEmptyGuid } from '../../methods';

@Injectable({
	providedIn: 'root',
})
export class LogStateEffects {
	constructor(
		protected store: Store<IAppState>,
		private actions$: Actions,
		private roomService: RoomService,
		private logService: LogService
	) {}

	@Effect()
	getLogRooms$: Observable<Action> = this.actions$.pipe(
		ofType(LogStateAction.FetchLogRooms),
		switchMap((data) => this.roomService.GetLogPICRoomNote(data)),
		mergeMap((res) => of(LogStateAction.FetchLogRoomsSuccess({ payload: res }))),
		share()
	);

	@Effect()
	getLogBooks$: Observable<Action> = this.actions$.pipe(
		ofType(LogStateAction.FetchLogBooks),
		switchMap((data) => this.roomService.GetBookLog(data)),
		mergeMap((res) => of(LogStateAction.FetchLogBooksSuccess({ payload: res }))),
		share()
	);

	@Effect()
	saveLogRooms$: Observable<Action> = this.actions$.pipe(
		ofType(LogStateAction.SaveLogRooms),
		withLatestFrom(this.store.pipe(select(fromMainState.getCurrentUser))),
		switchMap(([data, user]: [any, User]) =>
			data.id === EMPTY_GUID
				? this.roomService.SaveLogPICRoomNote({
						data: {
							ComputerSeat: JSON.stringify(data.computerSeat),
							Log: JSON.stringify(data.note),
							Presentation: JSON.stringify(data.presentation),
							Room: data.room,
							UserId: user.UserId,
						},
				  })
				: this.roomService.UpdateLogRoom({
						data: {
							ComputerSeat: JSON.stringify(data.computerSeat),
							Log: JSON.stringify(data.note),
							Presentation: JSON.stringify(data.presentation),
							Room: data.room,
							UserId: user.UserId,
						},
						id: data.id,
						time: DateHelper.dateToFormat(new Date(), 'dd-MM-yyyy'),
				  })
		),
		mergeMap((res) =>
			res !== EMPTY_GUID
				? of(MainStateAction.SuccessfullyMessage('saved the log'))
				: of(MainStateAction.FailMessage('saving log'))
		),
		share()
	);

	@Effect()
	saveLogBooks$: Observable<Action> = this.actions$.pipe(
		ofType(LogStateAction.SaveLogBooks),
		pluck('data'),
		switchMap((data) =>
			isEmptyGuid(data.Id)
				? this.roomService.SaveBookLog({ data })
				: this.roomService.UpdateBookLogDetail({ data, id: data.Id })
		),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('saved the log'))
				: of(MainStateAction.FailMessage('saving log'))
		),
		share()
	);

	//#region Delete
	@Effect()
	deleteLogBooks$: Observable<Action> = this.actions$.pipe(
		ofType(LogStateAction.DeleteLogBook),
		switchMap((data) => this.logService.DeleteLogBookRecap(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('deleted the log'))
				: of(MainStateAction.FailMessage('deleting log'))
		),
		share()
	);
	@Effect()
	deleteLogRooms$: Observable<Action> = this.actions$.pipe(
		ofType(LogStateAction.DeleteLogRoom),
		switchMap((data) => this.roomService.RemoveLogPICRoomNote(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('deleted the log'))
				: of(MainStateAction.FailMessage('deleting log'))
		),
		share()
	);
	//#endregion
}
