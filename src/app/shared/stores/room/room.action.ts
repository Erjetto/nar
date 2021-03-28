import { createAction, props } from '@ngrx/store';
import { ClientRoom, ClientRoomTransaction } from '../../models';

export const FetchRooms = createAction('[RoomState] FetchRooms');
export const FetchRoomsSuccess = createAction(
	'[RoomState] FetchRoomsSuccess',
	props<{ payload: ClientRoom[] }>()
);

export const FetchRoomTransactionsByDate = createAction(
	'[RoomState] FetchRoomTransactionsByDate',
	props<{ date: Date }>()
);
export const FetchRoomTransactionsSuccess = createAction(
	'[RoomState] FetchRoomTransactionsSuccess',
	props<{ payload: ClientRoomTransaction[] }>()
);

export const CreateRoomTransaction = createAction(
	'[RoomState] CreateRoomTransaction',
	props<{
		Date: Date;
		Shift: number;
		PIC: string;
		Type: 'Presentation' | 'Room' | 'Teaching';
		Zoom: string;
		RoomId: string;
	}>()
);

export const DeleteRoomTransaction = createAction(
	'[RoomState] DeleteRoomTransaction',
	props<{ transactionId: string }>()
);

