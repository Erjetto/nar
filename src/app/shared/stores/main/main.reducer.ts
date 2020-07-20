import {
	ActionReducer,
	ActionReducerMap,
	createFeatureSelector,
	createReducer,
	createSelector,
	MetaReducer,
	on,
} from '@ngrx/store';

import * as MainStateAction from './main.action';
import { Role, ClientGeneration } from '../../models';

export interface IMainState {
  // roles: Role[];
	generations: ClientGeneration[];
	currentRole: string;
	currentGeneration: string;
}

export const initialState: IMainState = {
  // roles: [],
  generations: [],
	currentGeneration: '20-1',
	currentRole: 'AssistantSupervisor',
};

export const MAINSTATE_REDUCER_NAME = 'MainState';

export const MainStateReducer = createReducer(
	initialState,
	on(MainStateAction.ChangeGeneration, (state, { payload }) => ({
		...state,
		currentGeneration: payload,
	})),

	on(MainStateAction.ChangeRole, (state, { payload }) => ({
		...state,
		currentRole: payload,
  })),
  
  on(MainStateAction.FetchGenerationsSuccess, (state, { payload }) => ({
		...state,
		generations: payload,
  })),
  
  // on(MainStateAction.FetchRolesSuccess, (state, { payload }) => ({
	// 	...state,
	// 	roles: payload,
  // }))
);

export const getMainState = createFeatureSelector<IMainState>(
	MAINSTATE_REDUCER_NAME
);

export const getMainStateBy = (fn: (_: IMainState) => any) =>
	createSelector(getMainState, fn);

export const getCurrentGeneration = getMainStateBy(s => s.currentGeneration);
export const getCurrentRole = getMainStateBy(s => s.currentRole);
export const getGenerations = getMainStateBy(s => s.generations);
// export const getRoles = getMainStateBy(s => s.roles);
