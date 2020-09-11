import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EncryptToBase64 } from 'src/app/shared/utilities/aes';

import * as MainStateAction from './main.action';
import * as fromMainState from './main.reducer';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, mergeMap, pluck, catchError, share, map, tap } from 'rxjs/operators';
import { OtherService } from '../../services/new/other.service';
import { AnnouncementService } from '../../services/new/announcement.service';
import { isArray, flatten } from 'lodash';
import { GeneralService } from '../../services/new/general.service';

@Injectable({
	providedIn: 'root',
})
export class MainStateEffects {
	constructor(
		private actions$: Actions,
		private generalService: GeneralService,
		private announcementService: AnnouncementService,
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
				? of(MainStateAction.LoginSuccess({ user: { ...res, ActiveRole: res.Role.roleName } }))
				: of(MainStateAction.FailMessage('to login'))
		),
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
		switchMap(() => this.announcementService.GetMessage()),
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
