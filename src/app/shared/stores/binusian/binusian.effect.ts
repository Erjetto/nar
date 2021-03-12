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
import { fromBinusianState, fromMasterState } from '../../store-modules';

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
		private traineeAttendanceService: TraineeAttendanceService
	) {}

	@Effect()
	getDailyAttendance$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchDailyAttendance),
		switchMap(() => this.traineeAttendanceService.GetTraineeAttendanceForTrainee()),
		mergeMap((results) => of(BinusianStateAction.FetchDailyAttendanceSuccess({payload: results}))),
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
	createTrainingSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.CreateTraineeSchedules),
		switchMap((data) => this.traineeAttendanceService.SaveTraineeSchedules(data)),
		mergeMap((res) =>
			_isEmpty(res)
				? of(MainStateAction.SuccessfullyMessage('inserted training schedules'))
				: of(MainStateAction.FailMessage('inserting training schedules', res.join('\n')))
		),
		share()
	);

	@Effect()
	createTraineeAttendances$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.CreateTraineeAttendances),
		switchMap((data) => this.traineeAttendanceService.SaveAttendances(data)),
		mergeMap((res) =>
			_isEmpty(res)
				? of(MainStateAction.SuccessfullyMessage('inserted attendances'))
				: of(MainStateAction.FailMessage('inserting attendances', res.join('\n')))
		),
		share()
	);

	@Effect()
	createLectureSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.CreateLectureSchedules),
		switchMap((data) => this.traineeAttendanceService.SaveTraineeLectureSchedules(data)),
		mergeMap((res) =>
			_isEmpty(res)
				? of(MainStateAction.SuccessfullyMessage('inserted lecture schedules'))
				: of(MainStateAction.FailMessage('inserting lecture schedules', res.join('\n')))
		),
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
}
