import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as BinusianStateAction from './binusian.action';
import * as MainStateAction from '../main/main.action';
import { Role, ClientTrainee, ClientTraineeData, ClientUserInRoles } from '../../models';

export interface IBinusianState {
	traineesEntity: { [id: string]: ClientTrainee };

  trainees: ClientTrainee[];
  allTraineesData: ClientTraineeData[];
  userInRoles: ClientUserInRoles[];

  loadingTrainees: boolean;
	loadingTraineesData: boolean;
}

export const initialState: IBinusianState = {
	traineesEntity: null,
	trainees: [],
	allTraineesData: [],
  userInRoles: [],
  
	loadingTrainees: false,
	loadingTraineesData: false,
};

export const BINUSIANSTATE_REDUCER_NAME = 'BinusianState';

export const BinusianStateReducer = createReducer(
	initialState,
  // Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, (state) => ({
		...initialState,
	})),

	on(BinusianStateAction.FetchTrainees, (state) => ({ ...state, loadingTrainees: true })),
	on(BinusianStateAction.FetchTraineesSuccess, (state) => ({ ...state, loadingTrainees: false })),

	on(BinusianStateAction.FetchTraineesSuccess, (state, { payload }) => ({
		...state,
		trainees: payload,
		traineesEntity: payload.reduce((accum, curr) => ({ ...accum, [curr.TraineeId]: curr }), {}),
	}))
	// on(BinusianStateAction.FetchTraineesByPhaseSuccess, (state, {payload}) => ({...state, traineesByPhase: payload})),
	// on(BinusianStateAction.FetchTraineesByScheduleSuccess, (state, {payload}) => ({...state, traineesBySchedule: payload})),
);

export const getBinusianState = createFeatureSelector<IBinusianState>(BINUSIANSTATE_REDUCER_NAME);

export const getBinusianStateBy = (fn: (_: IBinusianState) => any) =>
	createSelector(getBinusianState, fn);

export const getTrainees = getBinusianStateBy((s) => s.trainees);
export const getTraineesEntity = getBinusianStateBy((s) => s.traineesEntity);
