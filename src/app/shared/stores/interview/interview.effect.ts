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
import { isEmpty as _isEmpty} from 'lodash';

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
		switchMap(() => this.interviewService.GetInterviewSchedulesForTrainee()),
		mergeMap((res) => of(InterviewStateAction.FetchInterviewSchedulesSuccess({ payload: res }))),
		share()
	);
	@Effect()
	getInterviewSchedulesReport$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.FetchInterviewSchedulesReport),
		switchMap(() => this.interviewService.GetInterviewSchedules()),
		mergeMap((res) =>
			of(InterviewStateAction.FetchInterviewSchedulesReportSuccess({ payload: res }))
		),
		share()
	);
	@Effect()
	getInterviewQuestions$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.FetchInterviewQuestions),
		switchMap(() => this.interviewService.GetInterviewQuestions()),
		mergeMap((res) => of(InterviewStateAction.FetchInterviewQuestionsSuccess({ payload: res }))),
		share()
	);
	@Effect()
	getInterviewQuestionDetails$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.FetchInterviewQuestionDetails),
		switchMap((data) => this.interviewService.GetInterviewQuestionDetails(data)),
		mergeMap((res) =>
			of(InterviewStateAction.FetchInterviewQuestionDetailsSuccess({ payload: res }))
		),
		share()
	);

	@Effect()
	getInterviewMaterials$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.FetchInterviewMaterials),
		switchMap((data) => this.interviewService.GetInterviewMaterial(data)),
		mergeMap((res) => of(InterviewStateAction.FetchInterviewMaterialsSuccess({ payload: res }))),
		share()
	);

	@Effect()
	getInterviewResults$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.FetchInterviewResult),
		switchMap((data) => this.interviewService.GetInterviewResult(data)),
		mergeMap((res) => of(InterviewStateAction.FetchInterviewResultSuccess({ payload: res }))),
		share()
	);
	//#endregion

	//#region create
	@Effect()
	createInterviewQuestion$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.CreateInterviewQuestion),
		switchMap((data) => this.interviewService.SaveInterviewQuestions(data)),
		mergeMap((res) =>
			res.length === 0
				? of(MainStateAction.SuccessfullyMessage('created interview questions'))
				: of(MainStateAction.FailMessage('saving interview questions'))
		),
		share()
	);

	// @Effect()
	// createInterviewQuestionDetail$: Observable<Action> = this.actions$.pipe(
	// 	ofType(InterviewStateAction.CreateInterviewQuestionDetail),
	// 	switchMap((data) =>
	// 		of(MainStateAction.NotImplementedMessage('creating InterviewQuestionDetail'))
	// 	),
	// 	share()
	// );

	@Effect()
	createInterviewSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.CreateInterviewSchedule),
		switchMap((data) => this.interviewService.SaveInterviewSchedule(data)),
		mergeMap((res) =>
			_isEmpty(res)
				? of(MainStateAction.SuccessfullyMessage('created interview schedules'))
				: of(MainStateAction.FailMessage('creating interview schedules', res.join('\n')))
		),
		share()
	);

	@Effect()
	createInterviewMaterials$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.CreateInterviewMaterial),
		switchMap((data) => this.interviewService.SaveInterviewMaterial(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('created interview material'))
				: of(MainStateAction.FailMessage('creating interview material'))
		),
		share()
	);

	@Effect()
	massCreateInterviewMaterials$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.MassCreateInterviewMaterial),
		switchMap((data) => this.interviewService.MassSaveInterviewMaterial(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('created interview materials'))
				: of(MainStateAction.FailMessage('creating interview materials'))
		),
		share()
	);
	//#endregion

	//#region update
	@Effect()
	updateInterviewResult$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.UpdateInterviewResult),
		switchMap((data) => this.interviewService.SaveInterviewResult(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('updated interview result'))
				: of(MainStateAction.FailMessage('updating interview result'))
		),
		share()
	);


	//#endregion

	//#region delete

	@Effect()
	deleteInterviewSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.DeleteInterviewSchedule),
		switchMap((data) => this.interviewService.DeleteInterviewSchedule(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('deleted interview schedule'))
				: of(MainStateAction.FailMessage('deleting interview schedule'))
		),
		share()
	);

	@Effect()
	deleteInterviewMaterial$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.DeleteInterviewMaterial),
		switchMap((data) => this.interviewService.DeleteInterviewMaterial(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('deleted interview material'))
				: of(MainStateAction.FailMessage('deleting interview material'))
		),
		share()
	);

	@Effect()
	deleteInterviewQuestion$: Observable<Action> = this.actions$.pipe(
		ofType(InterviewStateAction.DeleteInterviewQuestion),
		switchMap((data) => this.interviewService.DeleteInterviewQuestion(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('deleted interview question'))
				: of(MainStateAction.FailMessage('deleting interview question'))
		),
		share()
	);
	//#endregion
}
