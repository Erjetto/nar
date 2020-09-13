import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { EncryptToBase64 } from 'src/app/shared/utilities/aes';

import * as MainStateAction from './main.action';
import * as fromMainState from './main.reducer';
import * as fromMasterState from '../master/master.reducer';
import { Observable, of, throwError } from 'rxjs';
import {
	switchMap,
	mergeMap,
	pluck,
	catchError,
	share,
	map,
	tap,
	mapTo,
	withLatestFrom,
} from 'rxjs/operators';
import { OtherService } from '../../services/new/other.service';
import { AnnouncementService } from '../../services/new/announcement.service';
import { isArray, flatten } from 'lodash';
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
		private cookieService: CookieService,
		private otherService: OtherService
	) {}

	@Effect()
	login$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.Login),
		switchMap((data) =>
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
		switchMap((data) => this.generalService.LogOn(data)),
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
		mergeMap(({ act, res }) => {
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
    tap(console.log),
		mergeMap(([{ act, res }, gens]) => {
			// localStorage.setItem(Cookies.CURR_GEN_ID, act.genId);

			return of(
				MainStateAction.ChangeGenerationSuccess({
					gen: gens.find((g: ClientGeneration) => g.GenerationId === act.genId),
				})
			);
		}),
		tap(() => console.log('Changed generation')),
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
		switchMap((act) => this.generalService.LogOut()),
		mergeMap((res) => of(MainStateAction.LogoutSuccess())),
		share()
	);

	@Effect()
	getAnnouncement$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.FetchAnnouncements),
		switchMap(() => this.generalService.GetMessageCurrentGeneration()),
		mergeMap((announcements) => of(MainStateAction.FetchAnnouncementsSuccess({ announcements }))),
		share()
	);

	@Effect()
	uploadFile$: Observable<Action> = this.actions$.pipe(
		ofType(MainStateAction.UploadFile),
		pluck('files'),
		switchMap((files) => {
			// return throwError('Upload file not implemented yet');
			return this.otherService.UploadCase(files).pipe(catchError((error) => throwError(error)));
		}),
		mergeMap((res) => {
			if (res != null) {
				const fileIdsArr: string | string[] = JSON.parse(res.fileid);
				const fileNamesArr: string | string[] = JSON.parse(res.filename);

				return of(
					MainStateAction.UploadFileSuccess({
						fileids: flatten([fileIdsArr]),
						filenames: flatten([fileNamesArr]),
					})
				);
			} else return of(MainStateAction.UploadFileFailed());
		}),
		catchError((error: Error) => {
			console.log(error);
			return of(MainStateAction.FailMessage(error.message));
		}),
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

	// // Kalau {dispatch: true}, action akan infinite-loop dispatch
	// @Effect({ dispatch: false })
	// crudSuccess$: Observable<Action> = this.actions$.pipe(
	// 	ofType(
	// 		MainStateAction.CreateSuccess,
	// 		MainStateAction.UpdateSuccess,
	// 		MainStateAction.DeleteSuccess
	// 	)
	// );

	// @Effect({ dispatch: false })
	// createSuccess$: Observable<Action> = this.actions$.pipe(ofType(MainStateAction.CreateSuccess));

	// @Effect({ dispatch: false })
	// updateSuccess$: Observable<Action> = this.actions$.pipe(ofType(MainStateAction.UpdateSuccess));

	// @Effect({ dispatch: false })
	// deleteSuccess$: Observable<Action> = this.actions$.pipe(ofType(MainStateAction.DeleteSuccess));
}
