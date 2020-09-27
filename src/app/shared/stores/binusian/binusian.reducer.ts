import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as BinusianStateAction from './binusian.action';
import * as MainStateAction from '../main/main.action';
import { Role, ClientTrainee, ClientTraineeData, ClientUserInRoles, SimpleTraineeData } from '../../models';

export interface IBinusianState {
	traineesEntity: { [id: string]: ClientTrainee };

  trainees: ClientTrainee[];
  traineesData: ClientTraineeData[];
  traineesSimpleData: SimpleTraineeData[];
  userInRoles: ClientUserInRoles[];

  loadingTrainees: boolean;
	loadingTraineesData: boolean;
	loadingTraineesSimpleData: boolean;
}

export const initialState: IBinusianState = {
	traineesEntity: null,
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

	on(BinusianStateAction.FetchTrainees, (state) => ({ ...state, loadingTrainees: true })),
	on(BinusianStateAction.FetchTraineesSuccess, (state, { payload }) => ({
    ...state,
    loadingTrainees: false,
		trainees: payload,
		traineesEntity: payload.reduce((accum, curr) => ({ ...accum, [curr.TraineeId]: curr }), {}),
	})),

	on(BinusianStateAction.FetchTraineesSimpleData, (state) => ({ ...state, loadingTraineesSimpleData: true })),
	on(BinusianStateAction.FetchTraineesSimpleDataSuccess, (state, { payload }) => ({
    ...state,
    loadingTraineesSimpleData: false,
		traineesSimpleData: payload,
	}))
	// on(BinusianStateAction.FetchTraineesByPhaseSuccess, (state, {payload}) => ({...state, traineesByPhase: payload})),
	// on(BinusianStateAction.FetchTraineesByScheduleSuccess, (state, {payload}) => ({...state, traineesBySchedule: payload})),
);

export const getBinusianState = createFeatureSelector<IBinusianState>(BINUSIANSTATE_REDUCER_NAME);

export const getBinusianStateBy = (fn: (_: IBinusianState) => any) =>
	createSelector(getBinusianState, fn);

export const getTrainees = getBinusianStateBy((s) => s.trainees);
export const getTraineesEntity = getBinusianStateBy((s) => s.traineesEntity);
export const getTraineesSimpleData = getBinusianStateBy((s) => s.traineesSimpleData);
export const isTraineesSimpleDataLoading = getBinusianStateBy((s) => s.loadingTraineesSimpleData);
