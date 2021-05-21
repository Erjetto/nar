import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import * as BinusianStateAction from './binusian.action';
import * as MainStateAction from '../main/main.action';

import * as fromMainState from '../main/main.reducer';

import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, share, tap, withLatestFrom } from 'rxjs/operators';
import { isEmpty as _isEmpty } from 'lodash';
import { LeaderService } from '../../services/new/leader.service';
import { TraineeService } from '../../services/new/trainee.service';
import { GeneralService } from '../../services/new/general.service';
import { TraineeAttendanceService } from '../../services/new/trainee-attendance.service';
import { ClientTrainee, User } from '../../models';
import { IAppState } from 'src/app/app.reducer';
import { InterviewService } from '../../services/new/interview.service';
import { OtherService } from '../../services/new/other.service';

@Injectable({
	providedIn: 'root',
})
export class BinusianStateEffects {
	constructor(
		private actions$: Actions,
		private store: Store<IAppState>,
		private leaderService: LeaderService,
		private generalService: GeneralService,
		private traineeService: TraineeService,
		private interviewService: InterviewService,
		private traineeAttendanceService: TraineeAttendanceService,
		private otherService: OtherService
	) {}

	@Effect()
	getMyDailyAttendance$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchDailyAttendance),
		switchMap(() => this.traineeAttendanceService.GetTraineeAttendanceForTrainee()),
		mergeMap((results) =>
			of(BinusianStateAction.FetchDailyAttendanceSuccess({ payload: results }))
		),
		share()
	);

	@Effect()
	getMyInterviewSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchMyInterviewSchedule),
		switchMap(() => this.interviewService.GetInterviewSchedulesForTrainee()),
		mergeMap((results) =>
			of(BinusianStateAction.FetchMyInterviewScheduleSuccess({ payload: results }))
		),
		share()
	);

	@Effect()
	getTraineesInCurrentGen$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchAllTraineesInCurrentGen),
		switchMap(() => this.generalService.GetTrainees()),
		mergeMap((results) => of(BinusianStateAction.FetchAllTraineesSuccess({ payload: results }))),
		share()
	);

	@Effect()
	getTraineesInLatestPhase$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchAllTraineesInLatestPhase),
		switchMap(() => this.generalService.GetTraineesInLatestPhase()),
		mergeMap((results) =>
			of(
				BinusianStateAction.FetchTraineesSuccess({
					payload: results.map((v) => ClientTrainee.fromJson(v)),
				})
			)
		),
		share()
	);

	@Effect()
	getTraineesBy$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchTraineesBy),
		switchMap((data) =>
			data.phaseId
				? this.leaderService.GetTraineesByPhase({ phaseId: data.phaseId })
				: data.scheduleId
				? this.leaderService.GetTraineesBySchedule({ scheduleId: data.scheduleId })
				: this.generalService.GetTrainees()
		),
		mergeMap((results) => of(BinusianStateAction.FetchTraineesSuccess({ payload: results }))),
		share()
	);

	@Effect()
	getTraineesData$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchTraineesData),
		switchMap(() => this.traineeService.GetTrainees()),
		mergeMap((results) => of(BinusianStateAction.FetchTraineesDataSuccess({ payload: results }))),
		share()
	);

	@Effect()
	exportTraineesData$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.ExportTraineesData),
		switchMap(() => this.traineeService.ExportTraineesData()),
		mergeMap((filename) => of(MainStateAction.DownloadMemoryFile({ filename }))),
		share()
	);

	@Effect()
	exportTraineesSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.ExportTraineesSchedule),
		switchMap((data) => this.traineeService.ExportTraineesSchedule(data)),
		mergeMap((filename) => of(MainStateAction.DownloadMemoryFile({ filename }))),
		share()
	);

	@Effect()
	getTraineesSimpleData$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchTraineesSimpleData),
		switchMap(() => this.leaderService.GetTraineesSimpleData()),
		mergeMap((results) =>
			of(BinusianStateAction.FetchTraineesSimpleDataSuccess({ payload: results }))
		),
		share()
	);

	@Effect()
	getMyData$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchMyData),
		withLatestFrom(this.store.pipe(select(fromMainState.getCurrentUser))),
		switchMap(([act, user]: [Action, User]) =>
			this.traineeService.GetTrainee({ traineeId: user.TraineeId })
		),
		mergeMap((result) => of(BinusianStateAction.FetchMyDataSuccess({ payload: result }))),
		share()
	);

	@Effect()
	getMySchedules$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchMySchedules),
		switchMap((data) => this.traineeService.GetTraineeTrainingSchedule(data)),
		mergeMap((result) => of(BinusianStateAction.FetchMySchedulesSuccess({ payload: result }))),
		share()
	);

	@Effect()
	createTrainee$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.CreateTrainees),
		switchMap((data) => this.leaderService.SaveTraineesInGeneration(data)),
		mergeMap((res) =>
			_isEmpty(res)
				? of(MainStateAction.SuccessfullyMessage('created trainee'))
				: of(MainStateAction.FailMessage('creating trainee', res.join('\n')))
		),
		share()
	);

	@Effect()
	updateMyData$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.UpdateMyData),
		switchMap((data) => this.traineeService.SaveAdditionalTraineData(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('updated your data'))
				: of(MainStateAction.FailMessage('updating your data'))
		),
		share()
	);

	@Effect()
	updateTraineeActive$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.UpdateTraineeActive),
		switchMap((data) => this.leaderService.UpdateTraineeActive(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('updated trainee status'))
				: of(MainStateAction.FailMessage('updating trainee status'))
		),
		share()
	);

	@Effect()
	deleteTrainee$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.DeleteTrainee),
		switchMap((data) => this.traineeService.Delete(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('deleted trainee'))
				: of(MainStateAction.FailMessage('deleting trainee'))
		),
		share()
	);

	//#region FLK
	@Effect()
	fetchMyFLKQueues$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchMyFLKQueues),
		switchMap((data) => this.traineeService.GetMyFLKSubmissionHistory()),
		mergeMap((payload) => of(BinusianStateAction.FetchMyFLKQueuesSuccess({ payload }))),
		share()
	);
	@Effect()
	fetchMyFLKNote$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchMyFLKNote),
		switchMap((data) => this.traineeService.GetMyFLKNote()),
		mergeMap((payload) => of(BinusianStateAction.FetchMyFLKNoteSuccess({ payload }))),
		share()
	);
	@Effect()
	createFLKQueue$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.CreateFLKQueue),
		switchMap((data) => this.traineeService.SubmitFLK(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('uploaded FLK'))
				: of(MainStateAction.FailMessage('uploading FLK'))
		),
		share()
	);
	@Effect()
	updateFLKNote$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.UpdateFLKNote),
		switchMap((data) => this.traineeService.UpdateFLKNote(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('updated FLK Note'))
				: of(MainStateAction.FailMessage('updating FLK Note'))
		),
		share()
	);
	//#endregion
}
