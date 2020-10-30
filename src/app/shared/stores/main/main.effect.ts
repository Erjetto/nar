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
	pluck,
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
import { CookieService } from 'ngx-cookie-service';
import { Cookies } from '../../constants/cookie.constants';
import { IAppState } from 'src/app/app.reducer';
import { ClientGeneration } from '../../models';

@Injectable({
	providedIn: 'root',
})
export class MainStateEffects {
	constructor(
		private actions$: Actions,
		private store: Store<IAppState>,
		private generalService: GeneralService,
		private announcementService: AnnouncementService,
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
			localStorage.setItem(Cookies.CURR_ROLE, act.role.roleName);
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

	@Effect({ dispatch: false })
	downloadFile$ = this.actions$.pipe(
		ofType(MainStateAction.DownloadFile),
		map((data) => this.otherService.DownloadFile(data.fileId)),
		share()
	);

	@Effect()
	uploadFile$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.UploadFile),
		pluck('files'),
		tap(() => this.store.dispatch(MainStateAction.InfoMessage('Uploading files...'))),
		switchMap((files) => this.otherService.UploadFiles(files)),
		mergeMap((res) => {
			if (res != null) {
				// If files is possibly string or string[], so make an array then flatten it to force string[]
				// If it's array, then 2D arr be flattened
				// If it's string, then it becomes arr
				const fileIdsArr: string[] = _flatten([res.fileid]);
				const fileNamesArr: string[] = _flatten([res.filename]);

				return of(
					MainStateAction.SuccessfullyMessage('uploaded file(s) : ' + fileNamesArr.join(', ')),
					MainStateAction.UploadFileSuccess({
						fileids: fileIdsArr,
						filenames: fileNamesArr,
					})
				);
			} else return of(MainStateAction.UploadFileFailed()); // not needed?
		}),
		share()
	);

	// Langsung subscribe ke effect buat dapatkan result
	@Effect({ dispatch: false })
	testRequest$: Observable<any> = this.actions$.pipe(
		ofType(MainStateAction.TestRequest),
		switchMap((data) => this.otherService.TestRequest(data)),
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
		filter(([action, data]) => _isEmpty(data)),
		map(([action, data]) => action.action),
		share()
	);
}
