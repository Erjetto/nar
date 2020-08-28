import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as MainStateAction from './main.action';
import * as fromMainState from './main.reducer';
import { Observable, of } from 'rxjs';
import {
	switchMap,
	mergeMap,
	pluck,
} from 'rxjs/operators';
import { OtherService } from '../../services/new/other.service';
import { AnnouncementService } from '../../services/new/announcement.service';

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
		mergeMap((announcements) =>
			of(MainStateAction.FetchAnnouncementsSuccess({ announcements }))
		)
  );

	@Effect()
	uploadFile$: Observable<Action> = this.actions$.pipe(
    ofType(MainStateAction.UploadFile),
    pluck('file'),
		switchMap((file) => this.otherService.UploadCase(file)),
		mergeMap((res) =>
      res.success
      ? of(MainStateAction.UploadFileSuccess(res))
      : of(MainStateAction.UploadFileFailed())
		)
  );
  
}
