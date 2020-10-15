import { createAction, props, Action } from '@ngrx/store';
import { Message, User, ClientGeneration, Role, ToastType } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const Login = createAction(
	'[MainState] Login',
	props<{ userName: string; password: string; isPersistent: boolean }>()
);
export const LoginSuccess = createAction('[MainState] LoginSuccess', props<{ user: User }>());
export const Logout = createAction('[MainState] Logout');
export const LogoutSuccess = createAction('[MainState] LogoutSuccess');
export const SetCurrentUser = createAction('[MainState] SetCurrentUser', props<{ user: User }>());

export const ChangeRole = createAction('[MainState] ChangeRole', props<{ role: Role }>());
export const FetchCurrentGeneration = createAction('[MainState] GetCurrentGeneration');
export const ChangeGeneration = createAction(
	'[MainState] ChangeGeneration',
	props<{ genId: string }>()
);

export const ChangeRoleSuccess = createAction(
	'[MainState] ChangeRoleSuccess',
	props<{ role: Role }>()
);
export const ChangeGenerationSuccess = createAction(
	'[MainState] ChangeGenerationSuccess',
	props<{ gen: ClientGeneration }>()
);
export const SetGeneration = createAction(
	// Change gen without reset store values
	'[MainState] SetGeneration',
	props<{ gen: ClientGeneration }>()
);

export const ToastMessage = createAction(
	'[MainState] ToastMessage',
	props<{
		message: string;
		messageType: ToastType;
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
	props<{
		note: string;
		title: string;
		fileId: string;
		memberType: string;
	}>()
);
export const UpdateAnnouncement = createAction(
	'[MainState] UpdateAnnouncement',
	props<{
		messageId: string;
		note: string;
		title: string;
		fileId: string;
		mType: string;
	}>()
);
export const DeleteAnnouncement = createAction(
	'[MainState] DeleteAnnouncement',
	props<{ messageId: string }>()
);
export const CreateAnnouncementSuccess = createAction('[MainState] CreateAnnouncementSuccess');
export const UpdateAnnouncementSuccess = createAction('[MainState] UpdateAnnouncementSuccess');

export const DownloadFile = createAction('[MainState] DownloadFile', props<{ fileId: string}>());
export const UploadFile = createAction('[MainState] UploadFile', props<{ files: FileList }>());
export const UploadFileSuccess = createAction(
	'[MainState] UploadFileSuccess',
	props<{ fileids: string[]; filenames: string[] }>()
);
export const UploadFileFailed = createAction('[MainState] UploadFileFailed');
export const RemoveUploadedFiles = createAction('[MainState] RemoveUploadedFiles');

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
    message: `Request Failed :
URL: ${error.url.replace(environment.apiUrl, '')}
Exception Type: ${error.error.ExceptionType}
"${error.error.Message}"`,
	});

export const UnexpectedResultMessage = (doingWhat: string, result: any): Action =>
	ToastMessage({
		messageType: 'danger',
		message: `Unexpected result from ${doingWhat} : ${JSON.stringify(result)}`,
	});

export const InfoMessage = (what: string): Action =>
	ToastMessage({
		messageType: 'info',
		message: what,
	});

export const WarningMessage = (what: string): Action =>
	ToastMessage({
		messageType: 'warning',
		message: what,
	});

// export const ErrorGetMessage = (what: string): Action =>
// 	ToastMessage({
// 		messageType: 'danger',
// 		message: 'Failed to get ' + what,
// 	});

export const FailMessage = (doingWhat: string, why?: string): Action =>
	ToastMessage({
		messageType: 'danger',
		message: 'Failed ' + doingWhat + (!!why ? ': \n' + why : ''),
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
