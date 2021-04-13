import { createAction, props, Action, MemoizedSelector, State } from '@ngrx/store';
import { Message, User, ClientGeneration, Role, ToastType, Notification, ClientTrainerTeachingSchedule } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/app/app.reducer';
import { Observable } from 'rxjs';
import { OtherService } from '../../services/new/other.service';

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

//#region Announcements
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
//#endregion

//#region Notification
export const FetchNotifications = createAction('[MainState] FetchNotifications');
export const FetchNotificationsSuccess = createAction(
	'[MainState] FetchNotificationsSuccess',
	props<{ payload: Notification[] }>()
);

export const MarkAllNotificationsRead = createAction('[MainState] MarkAllNotificationsRead');
export const DeleteAllNotifications = createAction('[MainState] DeleteAllNotifications');
export const MarkNotificationRead = createAction(
	'[MainState] MarkNotificationRead',
	props<{ notificationId: string }>()
);
export const MarkNotificationReadSuccess = createAction(
	'[MainState] MarkNotificationReadSuccess',
	props<{ notificationId?: string }>()
);
//#endregion

//#region Teaching Schedules
export const FetchUserTeachingSchedules = createAction('[MasterState] FetchUserTeachingSchedules');
export const FetchUserTeachingSchedulesSuccess = createAction(
	'[MasterState] FetchUserTeachingSchedulesSuccess',
	props<{ payload: ClientTrainerTeachingSchedule[] }>()	
);

//#endregion

//#region Download & Upload
export const DownloadFile = createAction('[MainState] DownloadFile', props<{ fileId: string }>());
export const DownloadMemoryFile = createAction('[MainState] DownloadMemoryFile', props<{ filename: string }>());
export const UploadFileFailed = createAction('[MainState] UploadFileFailed');
export const RemoveUploadedFiles = createAction('[MainState] RemoveUploadedFiles');
//#endregion

//#region Global
export const TestRequest = createAction(
	'[MainState] TestRequest',
	props<{
		link: string;
		method: 'get' | 'post';
		body?: any;
	}>()
);
export const AfterRequest = createAction('[MainState] AfterRequest');
export const RequestFailed = createAction('[MainState] RequestFailed');
export const RequestSuccess = createAction('[MainState] RequestSuccess');
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
		message: `Request Failed : (${error.status} ${error.statusText})` +
				`\nURL: ${error.url.replace(environment.apiUrl, '')}` +  
				`${!!error.error?.ExceptionType ? '\nException Type: ' + error.error?.ExceptionType : ''}` + 
				`${!!error.error?.Message ? '\n\"' + error.error?.Message + '\"' : ''}`,
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

export const FailMessage = (doingWhat: string, why?: string): Action =>
	ToastMessage({
		messageType: 'danger',
		message: 'Failed ' + doingWhat + (!!why ? ': \n' + why : ''),
	});

export const NotImplementedMessage = (doingWhat: string): Action =>
	ToastMessage({
		messageType: 'danger',
		message: 'Error in ' + doingWhat + ': Not implemented yet',
	});
//#endregion

export const DispatchIfEmpty = createAction(
	'[MainState] FetchIfEmpty',
	props<{
		action: Action;
		selectorToBeChecked?: MemoizedSelector<IAppState, any>;
		observableToBeChecked?: Observable<any>;
	}>()
);
