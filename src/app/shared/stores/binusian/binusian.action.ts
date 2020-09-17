import { createAction, props } from '@ngrx/store';
import { ClientTrainee, ClientTraineeData } from '../../models';

export const FetchAllTraineesData = createAction('[BinusianState] FetchAllTraineesData');
export const FetchTrainees = createAction('[BinusianState] FetchTrainees');

export const FetchTraineesSuccess = createAction(
	'[BinusianState] FetchTraineesSuccess',
	props<{ payload: ClientTrainee[] }>()
);
export const FetchTraineesDataSuccess = createAction(
	'[BinusianState] FetchTraineesDataSuccess',
	props<{ payload: ClientTraineeData[] }>()
);

// HMM: Move this to Master because this is unrelated to binusian and it's crud?
export const CreateTrainingSchedules = createAction(
	'[BinusianState] CreateTrainingSchedules',
	props<{ schedules: string[] }>()
);

export const CreateTraineeAttendances = createAction(
	'[BinusianState] CreateTraineeAttendances',
	props<{ attendances: string[] }>()
);

export const CreateLectureSchedules = createAction(
	'[BinusianState] CreateLectureSchedules',
	props<{ schedules: string[] }>()
);

