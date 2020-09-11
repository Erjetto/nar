import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as MainStateAction from './main.action';
import { Toast, Message, User } from '../../models';
import { drop, filter, min, max, zip, isArray } from 'lodash';

export interface IMainState {
	currentUser: User;

	messagesMax: number;
	messages: Toast[];

	announcement: Message[]; // Home Message
	uploadedFiles: { fileid: string; filename: string }[];

	currentRole: string;
	currentGeneration: string;
}

export const initialState: IMainState = {
	currentUser: null,

	messagesMax: 5,
	messages: [
		new Toast('info', 'Lorem ipsum dolor sit amet'),
		// new Toast('success', 'Fetch data success 2'),
		// new Toast('warning', 'Fetch data failed 3'),
		// new Toast('danger', 'Fetch data failed 4'),
	],
	uploadedFiles: [],

	announcement: [],

	currentGeneration: '20-1',
	currentRole: 'AssistantSupervisor',
};

export const MAINSTATE_REDUCER_NAME = 'MainState';

export const MainStateReducer = createReducer(
	initialState,

	on(MainStateAction.LoginSuccess, MainStateAction.SetCurrentUser, (state, { user }) => ({
		...state,
		currentUser: user,
	})),
	on(MainStateAction.LogoutSuccess, (state) => ({ ...state, user: null })),

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

	on(MainStateAction.UploadFileSuccess, (state, { fileids, filenames }) => ({
		...state,
		uploadedFiles: zip(fileids, filenames).map((v) => ({ fileid: v[0], filename: v[1] })),
	}))
);

export const getMainState = createFeatureSelector<IMainState>(MAINSTATE_REDUCER_NAME);

export const getMainStateBy = (fn: (_: IMainState) => any) => createSelector(getMainState, fn);

export const getCurrentUser = getMainStateBy((s) => s.currentUser);

export const getToastMessages = getMainStateBy((s) => s.messages);
export const getAnnouncements = getMainStateBy((s) => s.announcement);

export const getCurrentGeneration = getMainStateBy((s) => s.currentGeneration);
export const getCurrentRole = getMainStateBy((s) => s.currentRole);
