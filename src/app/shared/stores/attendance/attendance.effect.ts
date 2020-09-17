import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as AttendanceStateAction from './attendance.action';
import * as fromAttendanceState from './attendance.reducer';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, pluck, tap, share } from 'rxjs/operators';
import { TraineeAttendanceService } from '../../services/new/trainee-attendance.service';
import * as _ from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class AttendanceStateEffects {
	constructor(private actions$: Actions, private attendanceService: TraineeAttendanceService) {}

	@Effect()
	getAttendances$: Observable<Action> = this.actions$.pipe(
		ofType(AttendanceStateAction.FetchAttendanceReport),
		switchMap((data) => this.attendanceService.GetTraineeAttendances(data)),
		mergeMap((res) => of(AttendanceStateAction.FetchAttendanceReportSuccess({ payload: res }))),
		share()
	);
}
