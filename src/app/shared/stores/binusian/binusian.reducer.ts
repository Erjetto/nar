import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';

import {
  Role, ClientTrainee,
  
} from '../../models';

export interface IBinusianState {
  trainees: ClientTrainee[]
}

export const initialState: IBinusianState = {
  trainees: []
};

export const BINUSIANSTATE_REDUCER_NAME = 'BinusianState';

export const BinusianStateReducer = createReducer(
  initialState,
  
);

export const getBinusianState = createFeatureSelector<IBinusianState>(
	BINUSIANSTATE_REDUCER_NAME
);

export const getBinusianStateBy = (fn: (_: IBinusianState) => any) =>
	createSelector(getBinusianState, fn);

export const getTrainees = getBinusianStateBy(s => s.trainees);