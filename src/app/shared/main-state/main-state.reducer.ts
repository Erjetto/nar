import {
	ActionReducer,
	ActionReducerMap,
	createFeatureSelector,
	createReducer,
	createSelector,
	MetaReducer,
	on,
} from '@ngrx/store';

import { getCategoryState } from 'TEMP/shared/category.reducer';
import * as MainStateAction from './main-state.action';
export interface MainState {
	currentRole: number;
	currentGeneration: string;
}

export const initialState: MainState = {
	currentGeneration: '',
	currentRole: 0,
};

export const MAINSTATE_REDUCER_NAME = 'Main';

export const MainStateReducer = createReducer(
	initialState,
	on(MainStateAction.ChangeGeneration, (state, { payload }) => ({
		...state,
		currentGeneration: payload,
	})),

	on(MainStateAction.ChangeRole, (state, { payload }) => ({
		...state,
		currentRole: payload,
	}))
);

export const getMainState = createFeatureSelector<MainState>(
	MAINSTATE_REDUCER_NAME
);

export const getMainStateBy = (fn: (_: MainState) => any) =>
	createSelector(getMainState, fn);

export const getCurrentGeneration = getMainStateBy(s => s.currentGeneration);
export const getCurrentRole = getMainStateBy(s => s.currentRole);
