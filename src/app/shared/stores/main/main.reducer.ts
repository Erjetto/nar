import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';

import * as MainStateAction from './main.action';
import { Toast } from '../../models';
import { drop, filter, min, max } from 'lodash';

export interface IMainState {
	messagesMax: number;
	messages: Toast[];

	currentRole: string;
	currentGeneration: string;
}

export const initialState: IMainState = {
	messagesMax: 4,
	messages: [
		new Toast('info', 'Lorem ipsum dolor sit amet'),
		new Toast('success', 'Fetch data success 2'),
		new Toast('warning', 'Fetch data failed 3'),
		new Toast('danger', 'Fetch data failed 4'),
	],

	currentGeneration: '20-1',
	currentRole: 'AssistantSupervisor',
};

export const MAINSTATE_REDUCER_NAME = 'MainState';

export const MainStateReducer = createReducer(
	initialState,

	on(MainStateAction.ToastMessage, (state, { message, messageType }) => ({
    ...state,
    // Only show the last 4 toast
		messages: [
			...drop(state.messages, max([state.messages.length - state.messagesMax + 1, 0])),
			new Toast(messageType, message),
		],
	})),

	// TODO: Check if works
	on(MainStateAction.RemoveMessage, (state, { index }) => ({
		...state,
		messages: filter(state.messages, (v, i) => i !== index),
	})),

	on(MainStateAction.ChangeGeneration, (state, { name }) => ({
		...state,
		currentGeneration: name,
	})),

	on(MainStateAction.ChangeRole, (state, { name }) => ({
		...state,
		currentRole: name,
	}))

	// on(MainStateAction.FetchGenerationsSuccess, (state, { payload }) => ({
	// 	...state,
	// 	generations: payload,
	// })),

	// on(MainStateAction.FetchPhases, (state) => ({
	// 	...state,
	// 	loadingPhases: true,
	// })),
	// on(MainStateAction.FetchSubjects, (state) => ({
	// 	...state,
	// 	loadingSubjects: true,
	// })),
	// on(MainStateAction.FetchSchedules, (state) => ({
	// 	...state,
	// 	loadingSchedules: true,
	// })),

	// on(MainStateAction.FetchPhasesSuccess, (state, { payload }) => ({
	// 	...state,
	// 	phases: payload,
	// 	loadingPhases: false,
	// })),

	// on(MainStateAction.FetchSubjectsSuccess, (state, { payload }) => ({
	// 	...state,
	// 	subjects: payload,
	// 	loadingSubjects: false,
	// })),

	// on(MainStateAction.FetchSchedulesSuccess, (state, { payload }) => ({
	// 	...state,
	// 	schedules: payload,
	// 	loadingSchedules: false,
	// }))

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

export const getToastMessages = getMainStateBy((s) => s.messages);

export const getCurrentGeneration = getMainStateBy((s) => s.currentGeneration);
export const getCurrentRole = getMainStateBy((s) => s.currentRole);
// export const getGenerations = getMainStateBy((s) => s.generations);
// export const getPhases = getMainStateBy((s) => s.phases);
// export const getSubjects = getMainStateBy((s) => s.subjects);
// export const getSchedules = getMainStateBy((s) => s.schedules);

// export const getRoles = getMainStateBy(s => s.roles);
