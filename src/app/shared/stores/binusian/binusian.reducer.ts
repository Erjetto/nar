import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as MainStateAction from '../main/main.action';
import {
	ClientTrainee,
  ClientTraineeDailyAttendance,
	ClientTraineeData,
	ClientUserInRoles,
	SimpleTraineeData,
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
} from './binusian.action';

export interface IBinusianState {
  traineeDailyAttendance: ClientTraineeDailyAttendance;

	traineesEntity: { [id: string]: ClientTrainee };

	allTrainees: ClientTrainee[];
	trainees: ClientTrainee[];
	traineesData: ClientTraineeData[];
	traineesSimpleData: SimpleTraineeData[];
	userInRoles: ClientUserInRoles[];

	loadingTrainees: boolean;
	loadingTraineesData: boolean;
	loadingTraineesSimpleData: boolean;
}

export const initialState: IBinusianState = {
  traineeDailyAttendance: null,

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

	on(FetchAllTraineesInCurrentGen, FetchTraineesBy, (state) => ({
		...state,
		loadingTrainees: true,
	})),
	on(FetchAllTraineesSuccess, (state, { payload }) => ({
		...state,
		loadingTrainees: false,
		allTrainees: payload,
		traineesEntity: payload.reduce((accum, curr) => ({ ...accum, [curr.TraineeId]: curr }), {}),
	})),
	on(FetchTraineesSuccess, (state, { payload }) => ({
		...state,
		loadingTrainees: false,
		trainees: payload,
		traineesEntity: payload.reduce((accum, curr) => ({ ...accum, [curr.TraineeId]: curr }), {}),
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
	}))
	// on(FetchTraineesByPhaseSuccess, (state, {payload}) => ({...state, traineesByPhase: payload})),
	// on(FetchTraineesByScheduleSuccess, (state, {payload}) => ({...state, traineesBySchedule: payload})),
);

export const getBinusianState = createFeatureSelector<IBinusianState>(BINUSIANSTATE_REDUCER_NAME);

export const getBinusianStateBy = (fn: (_: IBinusianState) => any) =>
	createSelector(getBinusianState, fn);

export const getDailyAttendance = getBinusianStateBy((s) => s.traineeDailyAttendance);
export const getTrainees = getBinusianStateBy((s) => s.trainees);
export const getAllTrainees = getBinusianStateBy((s) => s.allTrainees);
export const getTraineesEntity = getBinusianStateBy((s) => s.traineesEntity);
export const getTraineesData = getBinusianStateBy((s) => s.traineesData);
export const getTraineesSimpleData = getBinusianStateBy((s) => s.traineesSimpleData);
export const isTraineesSimpleDataLoading = getBinusianStateBy((s) => s.loadingTraineesSimpleData);
export const isTraineesDataLoading = getBinusianStateBy((s) => s.loadingTraineesData);
