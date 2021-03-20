import {
	createFeatureSelector,
	createReducer,
	createSelector,
	MemoizedSelector,
	on,
} from '@ngrx/store';

import {
	Toast,
	Message,
	User,
	ClientGeneration,
	Role,
	Notification,
	ClientTrainerTeachingSchedule,
} from '../../models';
import {
	isEmpty as _isEmpty,
	drop as _drop,
	max as _max,
	filter as _filter,
	zip as _zip,
} from 'lodash';
import {
	LoginSuccess,
	SetCurrentUser,
	LogoutSuccess,
	ToastMessage,
	RemoveMessage,
	ChangeGenerationSuccess,
	SetGeneration,
	ChangeRoleSuccess,
	FetchAnnouncements,
	FetchAnnouncementsSuccess,
	RemoveUploadedFiles,
	FetchNotifications,
	FetchNotificationsSuccess,
	MarkNotificationReadSuccess,
	FetchUserTeachingSchedules,
	FetchUserTeachingSchedulesSuccess,
} from './main.action';
import { RoleFlags } from '../../constants/role.constant';

export interface IMainState {
	currentUser: User;

	messagesMax: number;
	messages: Toast[];

	announcements: Message[]; // Home Message
	isLoadingAnnouncements: boolean;

	notifications: Notification[];
	isLoadingNotifications: boolean;

	currentRole: Role;
	currentGeneration: ClientGeneration;
	currentGenerationId: string;

	teachingSchedules: ClientTrainerTeachingSchedule[];
	loadingTeachingSchedules: boolean;
}

export const initialState: IMainState = {
	currentUser: null,

	messagesMax: 5,
	messages: [],

	announcements: [],
	isLoadingAnnouncements: false,

	notifications: [],
	isLoadingNotifications: false,

	currentGeneration: null,
	currentGenerationId: '',
	currentRole: null,

	teachingSchedules: [],
	loadingTeachingSchedules: false,
};

export const MAINSTATE_REDUCER_NAME = 'MainState';

export const MainStateReducer = createReducer(
	initialState,

	on(LoginSuccess, SetCurrentUser, (state, { user }) => ({
		...state,
		currentUser: { ...user, ActiveRole: Role.from(user.Role.roleName) },
		currentRole: user.Role,
	})),

	on(LogoutSuccess, (state) => ({
		...state,
		currentUser: null,
		currentRole: Role.from(RoleFlags.Guest),
	})),

	on(ToastMessage, (state, { message, messageType }) => ({
		...state,
		// Only show the last n toast
		messages: [
			..._drop(state.messages, _max([state.messages.length - state.messagesMax + 1, 0])),
			new Toast(messageType, message),
		],
	})),

	on(RemoveMessage, (state, { index }) => ({
		...state,
		messages: _filter(state.messages, (v, i) => i !== index),
	})),

	on(ChangeGenerationSuccess, SetGeneration, (state, { gen }) => ({
		...state,
		currentGeneration: gen,
		currentGenerationId: gen.GenerationId,
	})),

	on(ChangeRoleSuccess, (state, { role }) => ({
		...state,
		currentRole: role,
	})),

	on(FetchAnnouncements, (state) => ({
		...state,
		isLoadingAnnouncements: true,
	})),

	on(FetchAnnouncementsSuccess, (state, { announcements }) => ({
		...state,
		announcements,
		isLoadingAnnouncements: false,
	})),

	on(FetchNotifications, (state) => ({
		...state,
		isLoadingNotifications: true,
	})),

	on(FetchNotificationsSuccess, (state, { payload }) => ({
		...state,
		notifications: payload,
		isLoadingNotifications: false,
	})),

	on(MarkNotificationReadSuccess, (state, { notificationId }) => ({
		...state,
		notifications: state.notifications.map((n) =>
			!notificationId || notificationId === n.Id ? n.markedRead : n
		),
		isLoadingNotifications: false,
	})),

	on(FetchUserTeachingSchedules, (state) => ({
		...state,
		loadingTeachingSchedules: true,
	})),
	on(FetchUserTeachingSchedulesSuccess, (state, { payload }) => ({
		...state,
		loadingTeachingSchedules: false,
		teachingSchedules: payload,
	})),

	on(RemoveUploadedFiles, (state) => ({
		...state,
		uploadedFiles: [],
	}))
);

export const getMainState = createFeatureSelector<IMainState>(MAINSTATE_REDUCER_NAME);

export const getMainStateBy = (fn: (_: IMainState) => any) => createSelector(getMainState, fn);

export const getCurrentUser = getMainStateBy((s) => s.currentUser);

export const getToastMessages = getMainStateBy((s) => s.messages);
export const getAnnouncements = getMainStateBy((s) => s.announcements);
export const isAnnouncementsLoading = getMainStateBy((s) => s.isLoadingAnnouncements);
export const getNotifications = getMainStateBy((s) => s.notifications);
export const isNotificationsLoading = getMainStateBy((s) => s.isLoadingNotifications);
export const getUserTeachingSchedules = getMainStateBy((s) => s.teachingSchedules);
export const isUserTeachingSchedulesLoading = getMainStateBy((s) => s.loadingTeachingSchedules);

export const getCurrentGeneration = getMainStateBy((s) => s.currentGeneration);
export const getCurrentGenerationId = getMainStateBy((s) => s.currentGenerationId);
export const getCurrentRole = getMainStateBy((s) => s.currentRole);
