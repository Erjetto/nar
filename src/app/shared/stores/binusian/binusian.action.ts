import { createAction, props } from '@ngrx/store';
import { ClientTrainee, ClientTraineeData } from '../../models';

export const FetchAllTraineesData = createAction('[BinusianState] FetchAllTraineesData');
export const FetchTrainees = createAction('[BinusianState] FetchTrainees');
export const FetchTraineesByPhase = createAction(
	'[BinusianState] FetchTraineesByPhase',
	props<{ phaseId: string }>()
);
export const FetchTraineesBySchedule = createAction(
	'[BinusianState] FetchTraineesBySchedule',
	props<{ scheduleId: string }>()
);


export const FetchTraineesSuccess = createAction(
	'[BinusianState] FetchTraineesSuccess',
	props<{ payload: ClientTrainee[] }>()
);
export const FetchTraineesByPhaseSuccess = createAction(
	'[BinusianState] FetchTraineesByPhaseSuccess',
	props<{ payload: ClientTrainee[] }>()
);
export const FetchTraineesByScheduleSuccess = createAction(
	'[BinusianState] FetchTraineesByScheduleSuccess',
	props<{ payload: ClientTrainee[] }>()
);

export const FetchTraineesDataSuccess = createAction(
	'[BinusianState] FetchTraineesDataSuccess',
	props<{ payload: ClientTraineeData[] }>()
);
