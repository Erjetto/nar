import { createAction, props } from '@ngrx/store';
import { ClientEvaluation, ClientRoom, ClientTraineeReputation, LogBookPIC, LogRoomPIC } from '../../models';

export const FetchLogRooms = createAction('[LogState] FetchLogRooms', props<{ date: Date }>());
export const FetchLogBooks = createAction(
	'[LogState] FetchLogBooks',
	props<{ start: Date; end: Date }>()
);

export const FetchLogRoomsSuccess = createAction(
	'[LogState] FetchLogRoomsSuccess',
	props<{ payload: LogRoomPIC[] }>()
);
export const FetchLogBooksSuccess = createAction(
	'[LogState] FetchLogBooksSuccess',
	props<{ payload: LogBookPIC[] }>()
);

export const SaveLogRooms = createAction(
	'[LogState] SaveLogRooms',
	props<{ computerSeat; note; presentation; room; id: string }>()
);
export const SaveLogBooks = createAction(
	'[LogState] SaveLogBooks',
	props<{ data: LogBookPIC; }>()
);

export const DeleteLogRoom = createAction(
	'[LogState] DeleteLogRoom',
	props<{ id:string }>()
);
export const DeleteLogBook = createAction(
	'[LogState] DeleteLogBook',
	props<{ id:string }>()
);

export const FetchRooms = createAction('[LogState] FetchRooms');

export const FetchRoomsSuccess = createAction(
	'[LogState] FetchRoomsSuccess',
	props<{ payload: ClientRoom[] }>()
);