import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as MainStateAction from './main.action';
import { Toast, Message, User, ClientGeneration, Role } from '../../models';
import * as _ from 'lodash';

export interface IMainState {
	currentUser: User;

	messagesMax: number;
	messages: Toast[];

	announcements: Message[]; // Home Message
	isLoadingAnnouncements: boolean;
	uploadedFiles: { fileid: string; filename: string }[];

	currentRole: Role;
	currentGeneration: ClientGeneration;
	currentGenerationId: string;
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

	announcements: [],
	isLoadingAnnouncements: false,

	currentGeneration: null,
	currentGenerationId: '',
	currentRole: null,
};

export const MAINSTATE_REDUCER_NAME = 'MainState';

export const MainStateReducer = createReducer(
	initialState,

	on(MainStateAction.LoginSuccess, MainStateAction.SetCurrentUser, (state, { user }) => ({
		...state,
		currentUser: { ...user, ActiveRole: user.Role.roleName },
		currentRole: user.Role,
	})),

	on(MainStateAction.LogoutSuccess, (state) => ({ ...state, user: null })),

	on(MainStateAction.ToastMessage, (state, { message, messageType }) => ({
		...state,
		// Only show the last n toast
		messages: [
			..._.drop(state.messages, _.max([state.messages.length - state.messagesMax + 1, 0])),
			new Toast(messageType, message),
		],
	})),

	on(MainStateAction.RemoveMessage, (state, { index }) => ({
		...state,
		messages: _.filter(state.messages, (v, i) => i !== index),
	})),

	on(MainStateAction.ChangeGenerationSuccess, MainStateAction.SetGeneration, (state, { gen }) => ({
		...state,
		currentGeneration: gen,
		currentGenerationId: gen.GenerationId,
	})),

	on(MainStateAction.ChangeRoleSuccess, (state, { role }) => ({
		...state,
		currentRole: role,
	})),

	on(MainStateAction.FetchAnnouncements, (state) => ({
		...state,
		isLoadingAnnouncements: true,
	})),

	on(MainStateAction.FetchAnnouncementsSuccess, (state, { announcements }) => ({
		...state,
		announcements,
		isLoadingAnnouncements: false,
	})),

	on(MainStateAction.UploadFileSuccess, (state, { fileids, filenames }) => ({
		...state,
		uploadedFiles: _.zip(fileids, filenames).map((v) => ({ fileid: v[0], filename: v[1] })),
	})),

	on(MainStateAction.RemoveUploadedFiles, (state) => ({
		...state,
		uploadedFiles: [],
	})),
);

export const getMainState = createFeatureSelector<IMainState>(MAINSTATE_REDUCER_NAME);

export const getMainStateBy = (fn: (_: IMainState) => any) => createSelector(getMainState, fn);

export const getCurrentUser = getMainStateBy((s) => s.currentUser);

export const getToastMessages = getMainStateBy((s) => s.messages);
export const getAnnouncements = getMainStateBy((s) => s.announcements);
export const isAnnouncementsLoading = getMainStateBy((s) => s.isLoadingAnnouncements);

export const getCurrentGeneration = getMainStateBy((s) => s.currentGeneration);
export const getCurrentGenerationId = getMainStateBy((s) => s.currentGenerationId);
export const getCurrentRole = getMainStateBy((s) => s.currentRole);

export const getUploadedFiles = getMainStateBy((s) => s.uploadedFiles);