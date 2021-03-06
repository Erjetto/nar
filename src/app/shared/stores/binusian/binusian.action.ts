import { createAction, props } from '@ngrx/store';
import {
	AdditionalTraineeData,
	ClientInterviewSchedule,
	ClientTrainee,
	ClientTraineeDailyAttendance,
	ClientTraineeData,
	FLKNote,
	FLKQueue,
	SimpleTraineeData,
	TraineeSchedule,
} from '../../models';

export const FetchTraineesSimpleData = createAction('[BinusianState] FetchTraineesSimpleData');
export const FetchTraineesData = createAction('[BinusianState] FetchTraineesData');
export const ExportTraineesData = createAction('[BinusianState] ExportTraineesData');
export const ExportTraineesSchedule = createAction(
	'[BinusianState] ExportTraineesSchedule',
	props<{ binusianNumber: string; period: string; startDate: string; endDate: string }>()
);
// TODO: Ganti semua FetchTrainees jadi FetchTraineesBy
export const FetchAllTraineesInLatestPhase = createAction(
	'[BinusianState] FetchAllTraineesInLatestPhase'
);
export const FetchAllTraineesInCurrentGen = createAction(
	'[BinusianState] FetchAllTraineesInCurrentGen'
);
export const FetchTraineesBy = createAction(
	'[BinusianState] FetchTrainees',
	props<{ scheduleId?: string; phaseId?: string }>()
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

// Used in Home
export const FetchDailyAttendance = createAction('[BinusianState] FetchDailyAttendance');
export const FetchDailyAttendanceSuccess = createAction(
	'[BinusianState] FetchDailyAttendanceSuccess',
	props<{ payload: ClientTraineeDailyAttendance }>()
);

// Used in My Data
export const FetchMyData = createAction('[BinusianState] FetchMyData');
export const FetchMyDataSuccess = createAction(
	'[BinusianState] FetchMyDataSuccess',
	props<{ payload: ClientTraineeData }>()
);
export const UpdateMyData = createAction(
	'[BinusianState] UpdateMyData',
	props<{ traineeData: AdditionalTraineeData }>()
);
export const FetchMySchedules = createAction(
	'[BinusianState] FetchMySchedules',
	props<{ binusianNumber: string }>()
);
export const FetchMySchedulesSuccess = createAction(
	'[BinusianState] FetchMySchedulesSuccess',
	props<{ payload: TraineeSchedule[] }>()
);

export const UpdateTraineeActive = createAction(
	'[BinusianState] UpdateTraineeActive',
	props<{
		isActive: boolean;
		reason: string;
		traineeId: string;
	}>()
);

export const FetchMyInterviewSchedule = createAction('[BinusianState] FetchMyInterviewSchedule');

export const FetchMyInterviewScheduleSuccess = createAction(
	'[BinusianState] FetchMyInterviewScheduleSuccess',
	props<{ payload: ClientInterviewSchedule[] }>()
);

//#region FLK
export const FetchMyFLKQueues = createAction('[BinusianState] FetchMyFLKQueues');
export const FetchMyFLKNote = createAction('[BinusianState] FetchMyFLKNote');
export const FetchMyFLKQueuesSuccess = createAction(
	'[BinusianState] FetchMyFLKQueuesSuccess',
	props<{ payload: FLKQueue[] }>()
);
export const FetchMyFLKNoteSuccess = createAction(
	'[BinusianState] FetchMyFLKNoteSuccess',
	props<{ payload: FLKNote }>()
);
export const CreateFLKQueue = createAction(
	'[BinusianState] CreateFLKQueue',
	props<{ fileId: string }>()
);
export const UpdateFLKNote = createAction(
	'[BinusianState] UpdateFLKNote',
	props<{ note: string }>()
);
//#endregion
