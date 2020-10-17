import { createAction, props } from '@ngrx/store';
import { ClientTrainee, ClientTraineeData, SimpleTraineeData } from '../../models';

export const FetchTraineesSimpleData = createAction('[BinusianState] FetchTraineesSimpleData');
export const FetchTraineesData = createAction('[BinusianState] FetchTraineesData');
// TODO: Ganti semua FetchTrainees jadi FetchTraineesBy
export const FetchAllTraineesInCurrentGen = createAction('[BinusianState] FetchAllTraineesInCurrentGen');
export const FetchTraineesBy = createAction(
  '[BinusianState] FetchTrainees', 
  props<{ scheduleId?: string, phaseId?: string }>()
);

export const FetchTraineesSimpleDataSuccess = createAction(
	'[BinusianState] FetchTraineesSimpleDataSuccess',
	props<{ payload: SimpleTraineeData[] }>()
);
export const FetchAllTraineesSuccess = createAction(
	'[BinusianState] FetchAllTraineesSuccess',
	props<{ payload: ClientTrainee[] }>()
);
export const FetchTraineesSuccess = createAction(
	'[BinusianState] FetchTraineesSuccess',
	props<{ payload: ClientTrainee[] }>()
);
export const FetchTraineesDataSuccess = createAction(
	'[BinusianState] FetchTraineesDataSuccess',
	props<{ payload: ClientTraineeData[] }>()
);

export const DeleteTrainee = createAction(
	'[BinusianState] DeleteTrainee',
	props<{ binusianNumber: string }>()
);

export const CreateTrainees = createAction(
	'[BinusianState] CreateTrainees',
	props<{ datas: string[] }>()
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

