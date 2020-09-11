import { createAction, props, Action } from '@ngrx/store';
import { Message, User } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

export const Login = createAction(
	'[MainState] Login',
	props<{ userName: string; password: string; isPersistent: boolean }>()
);
export const LoginSuccess = createAction('[MainState] LoginSuccess', props<{ user: User }>());
export const Logout = createAction('[MainState] Logout');
export const LogoutSuccess = createAction('[MainState] LogoutSuccess');
export const SetCurrentUser = createAction('[MainState] SetCurrentUser', props<{ user: User }>());

export const ChangeRole = createAction('[MainState] ChangeRole', props<{ name: string }>());
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
export const RemoveMessage = createAction('[MainState] PopMessage', props<{ index: number }>());

export const FetchAnnouncements = createAction('[MainState] FetchAnnouncements');
export const FetchAnnouncementsSuccess = createAction(
	'[MainState] FetchAnnouncementsSuccess',
	props<{ announcements: Message[] }>()
);
export const CreateAnnouncement = createAction(
	'[MainState] CreateAnnouncement',
	props<{ memberType: string; title: string; content: string; file: string }>()
);

export const UploadFile = createAction('[MainState] UploadFile', props<{ files: FileList }>());
export const UploadFileSuccess = createAction(
	'[MainState] UploadFileSuccess',
	props<{ fileids: string[]; filenames: string[] }>()
);
export const UploadFileFailed = createAction('[MainState] UploadFileFailed');

//#region Global
export const AfterRequest = createAction('[MainState] AfterRequest');
export const RequestFailed = createAction('[MainState] RequestFailed');
export const RequestSuccess = createAction('[MainState] RequestSuccess');
// export const CreateSuccess = createAction('[MainState] CreateSuccess');
// export const UpdateSuccess = createAction('[MainState] UpdateSuccess');
// export const DeleteSuccess = createAction('[MainState] DeleteSuccess');
//#endregion

//#region Simplified Toast Message
export const SuccessfullyMessage = (doingWhat: string): Action =>
	ToastMessage({
		messageType: 'success',
		message: 'Successfully ' + doingWhat,
	});

export const RequestFailedMessage = (error: HttpErrorResponse): Action =>
	ToastMessage({
		messageType: 'danger',
		message: `Request Failed : ${error.message}`,
	});

export const UnexpectedResultMessage = (doingWhat: string, result: any): Action =>
	ToastMessage({
		messageType: 'danger',
		message: `Unexpected result from ${doingWhat} : ${JSON.stringify(result)}`,
	});

// export const ErrorGetMessage = (what: string): Action =>
// 	ToastMessage({
// 		messageType: 'danger',
// 		message: 'Failed to get ' + what,
// 	});

export const FailMessage = (doingWhat: string, why?: string): Action =>
	ToastMessage({
		messageType: 'danger',
		message: 'Failed ' + doingWhat + (!!why ? ': ' + why : ''),
	});

// export const EmptyGetMessage = (what: string): Action =>
// 	ToastMessage({
// 		messageType: 'danger',
// 		message: what + ' is empty',
// 	});

export const NotImplementedMessage = (doingWhat: string): Action =>
	ToastMessage({
		messageType: 'danger',
		message: 'Error in ' + doingWhat + ': Not implemented yet',
	});
//#endregion
