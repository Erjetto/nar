import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as BinusianStateAction from './binusian.action';
import * as MainStateAction from '../main/main.action';

import * as fromMainState from '../main/main.reducer';

import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, share } from 'rxjs/operators';
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

	createTrainingSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.CreateTrainingSchedules),
		switchMap((data) => this.traineeAttendanceService.SaveTraineeSchedules(data)),
		mergeMap((res) =>
			!_.isEmpty(res)
				? of(MainStateAction.SuccessfullyMessage('inserted training schedules'))
				: of(MainStateAction.FailMessage('inserting training schedules'))
		),
		share()
	);
	createTraineeAttendances$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.CreateTraineeAttendances),
		switchMap((data) => this.traineeAttendanceService.SaveAttendances(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('inserted attendances'))
				: of(MainStateAction.FailMessage('inserting attendances'))
		),
		share()
	);
	createLectureSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(BinusianStateAction.CreateLectureSchedules),
		switchMap((data) => this.traineeAttendanceService.SaveTraineeLectureSchedules(data)),
		mergeMap((res) =>
			!_.isEmpty(res)
				? of(MainStateAction.SuccessfullyMessage('inserted lecture schedules'))
				: of(MainStateAction.FailMessage('inserting lecture schedules'))
		),
		share()
	);

	// @Effect()
	// getSubjects$: Observable<Action> = this.actions$.pipe(
	// 	ofType(CaseStateAction.FetchSubjects),
	// 	switchMap(() => {
	// 		return this.subjectService.getSubjects().pipe(
	// 			mergeMap((results: any) => {
	// 				const res = map(results, ClientSubject.fromJson);
	// 				return of(CaseStateAction.FetchSubjectsSuccess({ payload: res }));
	// 			})
	// 		);
	// 	})
	// );
}
