import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as MainStateAction from './main.action';
import * as fromMainState from './main.reducer';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, mergeMap, pluck, catchError, share } from 'rxjs/operators';
import { OtherService } from '../../services/new/other.service';
import { AnnouncementService } from '../../services/new/announcement.service';
import { isArray, flatten } from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class MainStateEffects {
	constructor(
		private actions$: Actions,
		private announcementService: AnnouncementService,
		private otherService: OtherService
	) {}

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
