import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import { ClientRoom, LogBookPIC, LogRoomPIC } from '../../models';
import { isEmpty as _isEmpty, sortBy as _sortBy } from 'lodash';
import {
	FetchLogBooks,
	FetchLogBooksSuccess,
	FetchLogRooms,
	FetchLogRoomsSuccess,
} from './log.action';

export interface ILogState {
  rooms: ClientRoom[];
	logBooks: LogBookPIC[];
	logRooms: LogRoomPIC[];

	loadingLogBooks: boolean;
	loadingLogRooms: boolean;
}

export const initialState: ILogState = {
  rooms: [],
	logBooks: null,
	logRooms: null,

	loadingLogBooks: false,
	loadingLogRooms: false,
};

export const LOGSTATE_REDUCER_NAME = 'LogState';

export const LogStateReducer = createReducer(
	initialState,
	// Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, () => ({
		...initialState,
	})),

	on(FetchLogRooms, (state) => ({ ...state, loadingLogRooms: true })),
	on(FetchLogBooks, (state) => ({ ...state, loadingLogBooks: true })),

	on(FetchLogRoomsSuccess, (state, { payload }) => ({
		...state,
		logRooms: payload,
		loadingLogRooms: false,
	})),
	on(FetchLogBooksSuccess, (state, { payload }) => ({
    ...state,
		logBooks: payload,
		loadingLogBooks: false,
  })),
  
);

export const getLogState = createFeatureSelector<ILogState>(LOGSTATE_REDUCER_NAME);

export const getLogStateBy = (fn: (_: ILogState) => any) => createSelector(getLogState, fn);

export const getLogBooks = getLogStateBy((s) => s.logBooks);
export const getLogRooms = getLogStateBy((s) => s.logRooms);
export const isLogBooksLoading = getLogStateBy((s) => s.loadingLogBooks);
export const isLogRoomsLoading = getLogStateBy((s) => s.loadingLogRooms);
