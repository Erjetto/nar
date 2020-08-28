import { createAction, props } from '@ngrx/store';
import { Message } from '../../models';

export const ChangeRole = createAction(
	'[MainState] ChangeRole',
	props<{ name: string }>()
);
export const ChangeGeneration = createAction(
	'[MainState] ChangeGeneration',
	props<{ name: string }>()
);

export const ToastMessage = createAction(
	'[MainState] ToastMessage',
	props<{
		message: string;
		messageType: 'info' | 'success' | 'danger' | 'warning';
	}>()
);
export const RemoveMessage = createAction(
	'[MainState] PopMessage',
	props<{ index: number }>()
);

export const FetchAnnouncements = createAction(
	'[MainState] FetchAnnouncements'
);

export const FetchAnnouncementsSuccess = createAction(
	'[MainState] FetchAnnouncementsSuccess',
	props<{ announcements: Message[] }>()
);

export const CreateAnnouncement = createAction(
	'[MainState] CreateAnnouncement',
	props<{ memberType: string; title: string; content: string; file: string }>()
);

export const UploadFile = createAction(
	'[MainState] UploadFile',
	props<{ file: File }>()
);

export const UploadFileSuccess = createAction(
	'[MainState] UploadFileSuccess',
	props<{ fileid: string, filename: string }>()
);

export const UploadFileFailed = createAction(
	'[MainState] UploadFileFailed'
);
