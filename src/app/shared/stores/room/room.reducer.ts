import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as RoomStateAction from '../room/room.action';
import { isEmpty as _isEmpty, sortBy as _sortBy } from 'lodash';
import { ClientRoom, ClientRoomTransaction } from '../../models';

export interface IRoomState {
	rooms: ClientRoom[];
	roomTransactions: ClientRoomTransaction[];

	loadingRooms: boolean;
	loadingRoomTransactions: boolean;
}

export const initialState: IRoomState = {
	rooms: [],
	roomTransactions: [],

	loadingRooms: false,
	loadingRoomTransactions: false,
};

export const ROOMSTATE_REDUCER_NAME = 'RoomState';

export const RoomStateReducer = createReducer(
	initialState,
	// Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, () => ({
		...initialState,
	})),

	on(RoomStateAction.FetchRooms, (state) => ({
		...state,
		loadingRooms: true,
	})),

	on(RoomStateAction.FetchRoomsSuccess, (state, { payload }) => ({
		...state,
		rooms: payload,
		loadingRooms: false,
	})),

	on(RoomStateAction.FetchRoomTransactionsByDate, (state) => ({
		...state,
		loadingRoomTransactions: true,
	})),

	on(RoomStateAction.FetchRoomTransactionsSuccess, (state, { payload }) => ({
		...state,
		roomTransactions: payload,
		loadingRoomTransactions: false,
	}))
);

export const getRoomState = createFeatureSelector<IRoomState>(ROOMSTATE_REDUCER_NAME);

export const getRoomStateBy = (fn: (_: IRoomState) => any) => createSelector(getRoomState, fn);

export const getRooms = getRoomStateBy((s) => s.rooms);
export const isRoomsLoading = getRoomStateBy((s) => s.loadingRooms);

export const getRoomTransactions = getRoomStateBy((s) => s.roomTransactions);
export const isRoomTransactionsLoading = getRoomStateBy((s) => s.loadingRoomTransactions);

/**
 * Expectation:
 * {'1': [....], '2': [....], ...}
 */
export const getRoomTransactionsByShift = createSelector(getRoomTransactions, (roomTransactions) =>
	roomTransactions.reduce(
		(prev, curr) => ({
			...prev,
			...{ [curr.Shift]: [...(prev[curr.Shift] ?? []), curr] },
		}),
		{}
	)
);
