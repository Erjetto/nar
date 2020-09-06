import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, from, of } from 'rxjs';
import {
	switchMap,
	withLatestFrom,
	mergeMap,
	share,
	tap,
	pluck,
	delay,
	map,
	switchMapTo,
} from 'rxjs/operators';

import * as InterviewStateAction from 'src/app/shared/stores/interview/interview.action';
import * as fromInterviewState from 'src/app/shared/stores/interview/interview.reducer';
import * as MainStateAction from 'src/app/shared/stores/main/main.action';
import * as fromMainState from 'src/app/shared/stores/main/main.reducer';
import * as BinusianStateAction from 'src/app/shared/stores/binusian/binusian.action';
import * as fromBinusianState from 'src/app/shared/stores/binusian/binusian.reducer';

import { GeneralService } from 'src/app/shared/services/new/general.service';
import { AnnouncementService } from 'src/app/shared/services/new/announcement.service';
import { InterviewService } from 'src/app/shared/services/new/interview.service';
import { LeaderService } from 'src/app/shared/services/new/leader.service';
import { NoteService } from 'src/app/shared/services/new/note.service';
import { PresentationService } from 'src/app/shared/services/new/presentation.service';
import { TraineeAttendanceService } from 'src/app/shared/services/new/trainee-attendance.service';
import { TraineeService } from 'src/app/shared/services/new/trainee.service';
import { VoteService } from 'src/app/shared/services/new/vote.service';
import { IAppState } from 'src/app/app.reducer';

import { ClientTrainee } from 'src/app/shared/models';

@Injectable({
	providedIn: 'root',
})
export class InterviewStateEffects {
	constructor(
		private actions$: Actions,
		private store: Store<IAppState>,
		private generalService: GeneralService,
		private announcementService: AnnouncementService,
		private interviewService: InterviewService,
		private leaderService: LeaderService,
		private noteService: NoteService,
		private presentationService: PresentationService,
		private traineeAttendanceService: TraineeAttendanceService,
		private traineeService: TraineeService,
		private voteService: VoteService
	) {}

	//#region get
	@Effect()
	getInterviewSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.FetchInterviewSchedules),
		switchMap(() => this.interviewService.GetInterviewSchedules()),
		mergeMap((res) => of(InterviewStateAction.FetchInterviewSchedulesSuccess({ payload: res })))
	);
	@Effect()
	getInterviewQuestions$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.FetchInterviewQuestions),
		switchMap(() => this.interviewService.GetInterviewQuestions()),
		mergeMap((res) => of(InterviewStateAction.FetchInterviewQuestionsSuccess({ payload: res })))
	);
	@Effect()
	getInterviewQuestionDetails$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.FetchInterviewQuestionDetails),
		switchMap((data) => this.interviewService.GetInterviewQuestionDetails(data)),
		mergeMap((res) =>
			of(InterviewStateAction.FetchInterviewQuestionDetailsSuccess({ payload: res }))
		)
	);

	@Effect()
	getInterviewMaterials$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.FetchInterviewMaterials),
    switchMap((data) => this.interviewService.GetInterviewMaterial(data)),
		mergeMap((res) => of(InterviewStateAction.FetchInterviewMaterialsSuccess({ payload: res })))
	);
	//#endregion

	//#region create
	@Effect()
	createInterviewQuestion$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.CreateInterviewQuestion),
		switchMap((data) => this.leaderService.SaveInterviewQuestions(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('created interview questions'))
				: of(MainStateAction.FailMessage('Saving interview questions'))
		)
	);
	@Effect()
	createInterviewQuestionDetail$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.CreateInterviewQuestionDetail),
		switchMap((data) =>
			of(MainStateAction.NotImplementedMessage('creating InterviewQuestionDetail'))
		)
	);
	@Effect()
	createInterviewSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.CreateInterviewSchedule),
		switchMap((data) => of(MainStateAction.NotImplementedMessage('creating InterviewSchedule')))
	);
	//#endregion

  //#region update
  
	//#endregion

	//#region delete

	//#endregion
}
