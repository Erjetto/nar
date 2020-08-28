import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';

import * as MainStateAction from './main.action';
import { Toast, Message } from '../../models';
import { drop, filter, min, max } from 'lodash';

export interface IMainState {
	messagesMax: number;
  messages: Toast[];
  
  announcement: Message[]; // Home Message

	currentRole: string;
	currentGeneration: string;
}

export const initialState: IMainState = {
	messagesMax: 5,
	messages: [
		new Toast('info', 'Lorem ipsum dolor sit amet'),
		new Toast('success', 'Fetch data success 2'),
		new Toast('warning', 'Fetch data failed 3'),
		new Toast('danger', 'Fetch data failed 4'),
  ],
  
  announcement: [],

	currentGeneration: '20-1',
	currentRole: 'AssistantSupervisor',
};

export const MAINSTATE_REDUCER_NAME = 'MainState';

export const MainStateReducer = createReducer(
	initialState,

	on(MainStateAction.ToastMessage, (state, { message, messageType }) => ({
    ...state,
    // Only show the last n toast
		messages: [
			...drop(state.messages, max([state.messages.length - state.messagesMax + 1, 0])),
			new Toast(messageType, message),
		],
	})),

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
  })),

	on(MainStateAction.FetchAnnouncementsSuccess, (state, { announcements }) => ({
		...state,
		announcement: announcements,
  })),

);

export const getMainState = createFeatureSelector<IMainState>(
	MAINSTATE_REDUCER_NAME
);

export const getMainStateBy = (fn: (_: IMainState) => any) =>
	createSelector(getMainState, fn);

export const getToastMessages = getMainStateBy((s) => s.messages);
export const getAnnouncements = getMainStateBy((s) => s.announcement);

export const getCurrentGeneration = getMainStateBy((s) => s.currentGeneration);
export const getCurrentRole = getMainStateBy((s) => s.currentRole);