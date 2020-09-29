import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as BinusianStateAction from './binusian.action';
import * as MainStateAction from '../main/main.action';

import * as fromMainState from '../main/main.reducer';

import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, share, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { LeaderService } from '../../services/new/leader.service';
import { TraineeService } from '../../services/new/trainee.service';
import { GeneralService } from '../../services/new/general.service';
import { TraineeAttendanceService } from '../../services/new/trainee-attendance.service';

@Injectable({
	providedIn: 'root',
})
export class BinusianStateEffects {
	constructor(
		private actions$: Actions,
		private leaderService: LeaderService,
		private generalService: GeneralService,
		private traineeService: TraineeService,
		private traineeAttendanceService: TraineeAttendanceService
	) {}

	@Effect()
	getTrainees$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.FetchTrainees),
		switchMap(() => this.generalService.GetTrainees()),
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
	createTrainingSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.CreateTrainingSchedules),
		switchMap((data) => this.traineeAttendanceService.SaveTraineeSchedules(data)),
		mergeMap((res) =>
			_.isEmpty(res)
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
    _.isEmpty(res)
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
			_.isEmpty(res)
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
			_.isEmpty(res)
				? of(MainStateAction.SuccessfullyMessage('created trainee'))
				: of(MainStateAction.FailMessage('creating trainee', res.join('\n')))
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
