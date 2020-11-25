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

import { User } from '../../models';
import { IAppState } from 'src/app/app.reducer';

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
			this.roomService.UpdateLogRoom({
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
			res === true
				? of(MainStateAction.SuccessfullyMessage('saved the log'))
				: of(MainStateAction.FailMessage('saving log'))
    ),
    share()
  );
  
  
	@Effect()
	getRooms$: Observable<Action> = this.actions$.pipe(
		ofType(LogStateAction.FetchRooms),
		switchMap((data) => this.roomService.GetAllRooms()),
    mergeMap((res) => of(LogStateAction.FetchRoomsSuccess({ payload: res }))),
    share()
	);
}