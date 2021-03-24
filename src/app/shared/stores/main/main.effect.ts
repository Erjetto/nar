import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { EncryptToBase64 } from 'src/app/shared/utilities/aes';

import * as MainStateAction from './main.action';
import * as fromMasterState from '../master/master.reducer';
import { Observable, of } from 'rxjs';
import {
	switchMap,
	mergeMap,
	share,
	map,
	tap,
	withLatestFrom,
	exhaustMap,
	concatMap,
	filter,
} from 'rxjs/operators';
import { OtherService } from '../../services/new/other.service';
import { AnnouncementService } from '../../services/new/announcement.service';
import { flatten as _flatten, isEmpty as _isEmpty } from 'lodash';
import { GeneralService } from '../../services/new/general.service';
import { IAppState } from 'src/app/app.reducer';
import { ClientGeneration } from '../../models';
import { TrainerAttendanceService } from '../../services/new/trainer-attendance.service';

@Injectable({
	providedIn: 'root',
})
export class MainStateEffects {
	constructor(
		private actions$: Actions,
		private store: Store<IAppState>,
		private generalService: GeneralService,
		private announcementService: AnnouncementService,
		private trainerAttendanceService: TrainerAttendanceService,
		private otherService: OtherService
	) {}

	@Effect()
	login$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.Login),
		exhaustMap((data) =>
			this.generalService.GetUserSalt({ userName: data.userName }).pipe(
				map((salt) => {
					const pass = EncryptToBase64(salt + data.userName, data.password);
					return { ...data, password: pass };
					// { Expected result
					//   "d": {
					//     "__type": "User:#BPlusTraining.Logic",
					//     "ActiveRole": null,
					//     "Name": "NATASIA",
					//     "Role": "AssistantSupervisor",
					//     "TraineeId": "00000000-0000-0000-0000-000000000000",
					//     "UserId": "00000000-0000-0000-0000-000000000000",
					//     "UserName": "NS17-1"
					//   }
					// }
				})
			)
		),
		exhaustMap((data) => this.generalService.LogOn(data)),
		mergeMap((res) =>
			!!res
				? of(MainStateAction.LoginSuccess({ user: res }))
				: of(MainStateAction.FailMessage('to login', 'Invalid username or password'))
		),
		share()
	);

	@Effect()
	changeRole$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.ChangeRole),
		switchMap((act) =>
			this.generalService.ChangeRole({ role: act.role.roleName }).pipe(map((res) => ({ act, res })))
		),
		mergeMap(({ act }) => {
			// localStorage.setItem(Cookies.CURR_ROLE, act.role.roleName);
			return of(MainStateAction.ChangeRoleSuccess({ role: act.role }));
		}),
		share()
	);

	@Effect()
	changeGen$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.ChangeGeneration),
		switchMap((act) =>
			this.generalService.ChangeGeneration({ genId: act.genId }).pipe(map((res) => ({ act, res })))
		),
		withLatestFrom(this.store.pipe(select(fromMasterState.getGenerations))),
		// localStorage.setItem(Cookies.CURR_GEN_ID, act.genId); // gen is saved in server side
		mergeMap(([{ act }, gens]) =>
			of(
				MainStateAction.ChangeGenerationSuccess({
					gen: gens.find((g: ClientGeneration) => g.GenerationId === act.genId),
				})
			)
		),
		share()
	);

	@Effect()
	getCurrentGen$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.FetchCurrentGeneration),
		switchMap(() => this.generalService.GetCurrentGeneration()),
		mergeMap((res) => of(MainStateAction.SetGeneration({ gen: res }))),
		share()
	);

	@Effect()
	logout$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.Logout),
		tap(() => this.store.dispatch(MainStateAction.InfoMessage('Logging out...'))),
		switchMap(() => this.generalService.LogOut()),
		mergeMap(() => of(MainStateAction.LogoutSuccess())),
		share()
	);

	@Effect()
	getAnnouncements$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.FetchAnnouncements),
		switchMap(() => this.generalService.GetMessageCurrentGeneration()),
		mergeMap((announcements) => of(MainStateAction.FetchAnnouncementsSuccess({ announcements }))),
		share()
	);

	@Effect()
	createAnnouncement$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.CreateAnnouncement),
		switchMap((data) => {
			if (data.fileId) return this.announcementService.SaveMessageWithFile(data);
			else return this.announcementService.SaveMessage(data);
		}),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('created announcement'))
				: of(MainStateAction.FailMessage('creating announcement'))
		),
		share()
	);

	@Effect()
	updateAnnouncement$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.UpdateAnnouncement),
		switchMap((data) => {
			if (data.fileId) return this.announcementService.UpdateMessageWithFile(data);
			else return this.announcementService.UpdateMessageWithNoFile(data);
		}),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('updated announcement'))
				: of(MainStateAction.FailMessage('updating announcement'))
		),
		share()
	);

	@Effect()
	deleteAnnouncement$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.DeleteAnnouncement),
		switchMap((data) => this.announcementService.DeleteMessage(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('deleted announcement'))
				: of(MainStateAction.FailMessage('deleting announcement'))
		),
		share()
	);

	@Effect()
	getNotifications$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.FetchNotifications),
		switchMap(() => this.generalService.GetNotifications()),
		mergeMap((res) => of(MainStateAction.FetchNotificationsSuccess({ payload: res }))),
		share()
	);

	@Effect()
	markNotificationRead$: Observable<any> = this.actions$.pipe(
		ofType(MainStateAction.MarkNotificationRead),
		switchMap((data) =>
			this.generalService.MarkNotificationAsRead(data).pipe(map((res) => ({ res, data })))
		),
		mergeMap(({ res, data }) =>
			res === true
				? of(MainStateAction.MarkNotificationReadSuccess({ notificationId: data.notificationId }))
				: of()
		),
		share()
	);

	@Effect()
	markAllNotificationsRead$: Observable<any> = this.actions$.pipe(
		ofType(MainStateAction.MarkAllNotificationsRead),
		switchMap(() => this.generalService.MarkAllNotificationAsRead()),
		mergeMap((res) => (res === true ? of(MainStateAction.MarkNotificationReadSuccess({})) : of())),
		share()
	);

	@Effect()
	deleteAllNotifications$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.DeleteAllNotifications),
		switchMap(() => this.generalService.RemoveAllNotification()),
		mergeMap(() => of(MainStateAction.FetchNotifications())),
		share()
	);
	
	@Effect()
	getUserTeachingSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.FetchUserTeachingSchedules),
		switchMap(() => this.trainerAttendanceService.GetCurrentUserTeachingSchedule()),
		mergeMap((res) => of(MainStateAction.FetchUserTeachingSchedulesSuccess({ payload: res }))),
		share()
	);

	@Effect({ dispatch: false })
	downloadFile$ = this.actions$.pipe(
		ofType(MainStateAction.DownloadFile),
		map((data) => this.otherService.DownloadFile(data.fileId)),
		share()
	);

	// Langsung subscribe ke effect buat dapatkan result
	@Effect({ dispatch: false })
	testRequest$: Observable<any> = this.actions$.pipe(
		ofType(MainStateAction.TestRequest),
		switchMap((data) => this.otherService.TestRequest(data)),
		mergeMap((res) => of(res)),
		share()
	);
	@Effect({ dispatch: false })
	afterRequest$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.AfterRequest),
		share()
	);
	@Effect({ dispatch: false })
	requestFailed$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.RequestFailed),
		share()
	);
	@Effect({ dispatch: false })
	requestSuccess$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.RequestSuccess),
		share()
	);

	// IMPORTANT -- Checks if the selector returns null or empty, if so then fetch
	@Effect()
	dispatchIfEmpty$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.DispatchIfEmpty),
		concatMap((action) =>
			of(action).pipe(withLatestFrom(this.store.pipe(select(action.selectorToBeChecked))))
		),
		filter(([, data]) => _isEmpty(data)),
		map(([action]) => action.action),
		share()
	);
}
