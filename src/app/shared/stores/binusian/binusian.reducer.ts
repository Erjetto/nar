import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as MainStateAction from '../main/main.action';
import {
	ClientInterviewSchedule,
	ClientTrainee,
	ClientTraineeDailyAttendance,
	ClientTraineeData,
	ClientUserInRoles,
	SimpleTraineeData,
	TraineeSchedule,
} from '../../models';
import {
	FetchAllTraineesInCurrentGen,
	FetchTraineesSuccess,
	FetchTraineesSimpleData,
	FetchTraineesSimpleDataSuccess,
	FetchTraineesData,
	FetchTraineesDataSuccess,
	FetchTraineesBy,
	FetchAllTraineesSuccess,
	FetchMyData,
	FetchMyDataSuccess,
	FetchMySchedules,
	FetchMySchedulesSuccess,
	FetchAllTraineesInLatestPhase,
	FetchDailyAttendance,
	FetchDailyAttendanceSuccess,
	FetchMyInterviewSchedule,
	FetchMyInterviewScheduleSuccess,
} from './binusian.action';
import { arrayToObject } from '../../methods';

export interface IBinusianState {
	//#region Current User data here
	myDailyAttendance: ClientTraineeDailyAttendance;
	mySchedules: TraineeSchedule[];
	myInterviewSchedule: ClientInterviewSchedule[];
	myData: ClientTraineeData;

	loadingDailyAttendance: boolean;
	loadingMyData: boolean;
	loadingMySchedules: boolean;
	//#endregion

	traineesEntity: { [id: string]: ClientTrainee };

	allTrainees: ClientTrainee[]; // All trainee in one gen
	trainees: ClientTrainee[];
	traineesData: ClientTraineeData[];
	traineesSimpleData: SimpleTraineeData[];
	userInRoles: ClientUserInRoles[];

	loadingTrainees: boolean;
	loadingTraineesData: boolean;
	loadingTraineesSimpleData: boolean;
}

export const initialState: IBinusianState = {
	myDailyAttendance: null,
	myInterviewSchedule: [],

	myData: null,
	mySchedules: [],

	loadingDailyAttendance: false,
	loadingMyData: false,
	loadingMySchedules: false,

	traineesEntity: {},
	allTrainees: [],
	trainees: [],
	traineesData: [],
	traineesSimpleData: [],
	userInRoles: [],

	loadingTrainees: false,
	loadingTraineesData: false,
	loadingTraineesSimpleData: false,
};

export const BINUSIANSTATE_REDUCER_NAME = 'BinusianState';

export const BinusianStateReducer = createReducer(
	initialState,
	// Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, (state) => ({
		...initialState,
	})),

	on(FetchAllTraineesInCurrentGen, FetchTraineesBy, FetchAllTraineesInLatestPhase, (state) => ({
		...state,
		loadingTrainees: true,
	})),
	on(FetchAllTraineesSuccess, (state, { payload }) => ({
		...state,
		loadingTrainees: false,
		allTrainees: payload,
		traineesEntity: arrayToObject(payload, t => t.TraineeId)
	})),
	on(FetchTraineesSuccess, (state, { payload }) => ({
		...state,
		loadingTrainees: false,
		trainees: payload,
		traineesEntity: arrayToObject(payload, t => t.TraineeId)
	})),

	on(FetchTraineesSimpleData, (state) => ({ ...state, loadingTraineesSimpleData: true })),
	on(FetchTraineesSimpleDataSuccess, (state, { payload }) => ({
		...state,
		loadingTraineesSimpleData: false,
		traineesSimpleData: payload,
	})),

	on(FetchTraineesData, (state) => ({ ...state, loadingTraineesData: true })),
	on(FetchTraineesDataSuccess, (state, { payload }) => ({
		...state,
		loadingTraineesData: false,
		traineesData: payload,
	})),

	on(FetchMyData, (state) => ({ ...state, loadingMyData: true })),
	on(FetchMyDataSuccess, (state, { payload }) => ({
		...state,
		loadingMyData: false,
		myData: payload,
	})),

	on(FetchMySchedules, (state) => ({ ...state, loadingMySchedules: true })),
	on(FetchMySchedulesSuccess, (state, { payload }) => ({
		...state,
		loadingMySchedules: false,
		mySchedules: payload,
	})),

	on(FetchDailyAttendance, (state) => ({ ...state, loadingDailyAttendance: true })),
	on(FetchDailyAttendanceSuccess, (state, { payload }) => ({
		...state,
		loadingDailyAttendance: false,
		myDailyAttendance: payload,
	})),

	on(FetchMyInterviewScheduleSuccess, (state, { payload }) => ({
		...state,
		myInterviewSchedule: payload,
	}))
);

export const getBinusianState = createFeatureSelector<IBinusianState>(BINUSIANSTATE_REDUCER_NAME);

export const getBinusianStateBy = (fn: (_: IBinusianState) => any) =>
	createSelector(getBinusianState, fn);

export const getMyDailyAttendance = getBinusianStateBy((s) => s.myDailyAttendance);
export const getMyData = getBinusianStateBy((s) => s.myData);
export const getMySchedules = getBinusianStateBy((s) => s.mySchedules);

export const getTrainees = getBinusianStateBy((s) => s.trainees);
export const getAllTrainees = getBinusianStateBy((s) => s.allTrainees);
export const getTraineesEntity = getBinusianStateBy((s) => s.traineesEntity);
export const getTraineesData = getBinusianStateBy((s) => s.traineesData);
export const getTraineesSimpleData = getBinusianStateBy((s) => s.traineesSimpleData);

export const getmyInterviewSchedule = getBinusianStateBy(
	(s) => s.myInterviewSchedule
);

export const isDailyAttendanceLoading = getBinusianStateBy((s) => s.loadingDailyAttendance);
export const isTraineesSimpleDataLoading = getBinusianStateBy((s) => s.loadingTraineesSimpleData);
export const isTraineesLoading = getBinusianStateBy((s) => s.loadingTrainees);
export const isTraineesDataLoading = getBinusianStateBy((s) => s.loadingTraineesData);
export const isMyDataLoading = getBinusianStateBy((s) => s.loadingMyData);
export const isMySchedulesLoading = getBinusianStateBy((s) => s.loadingMySchedules);
