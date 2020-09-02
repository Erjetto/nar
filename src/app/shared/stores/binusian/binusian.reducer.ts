import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as BinusianStateAction from './binusian.action';
import { Role, ClientTrainee, ClientTraineeData } from '../../models';

export interface IBinusianState {
	trainees: ClientTrainee[];
	traineesByPhase: ClientTrainee[];
	traineesBySchedule: ClientTrainee[];

	allTraineesData: ClientTraineeData[];
	loadingTrainees: boolean;
	loadingTraineesData: boolean;
}

export const initialState: IBinusianState = {
	trainees: [],
	traineesByPhase: [],
	traineesBySchedule: [],

	allTraineesData: [],
	loadingTrainees: false,
	loadingTraineesData: false,
};

export const BINUSIANSTATE_REDUCER_NAME = 'BinusianState';

export const BinusianStateReducer = createReducer(
	initialState,

	// on(
	// 	BinusianStateAction.FetchTrainees,
	// 	BinusianStateAction.FetchTraineesByPhase,
  //   BinusianStateAction.FetchTraineesBySchedule,
  //   (state) => ({...state, loadingTrainees: true})
  // ),
	// on(
	// 	BinusianStateAction.FetchTraineesSuccess,
	// 	BinusianStateAction.FetchTraineesByPhaseSuccess,
  //   BinusianStateAction.FetchTraineesByScheduleSuccess,
  //   (state) => ({...state, loadingTrainees: false})
  // ),
  
  // on(BinusianStateAction.FetchTraineesSuccess, (state, {payload}) => ({...state, trainees: payload})),
  // on(BinusianStateAction.FetchTraineesByPhaseSuccess, (state, {payload}) => ({...state, traineesByPhase: payload})),
  // on(BinusianStateAction.FetchTraineesByScheduleSuccess, (state, {payload}) => ({...state, traineesBySchedule: payload})),
);

export const getBinusianState = createFeatureSelector<IBinusianState>(BINUSIANSTATE_REDUCER_NAME);

export const getBinusianStateBy = (fn: (_: IBinusianState) => any) =>
	createSelector(getBinusianState, fn);

export const getTrainees = getBinusianStateBy((s) => s.trainees);
