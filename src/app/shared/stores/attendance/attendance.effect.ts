import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as AttendanceStateAction from './attendance.action';
import * as fromAttendanceState from './attendance.reducer';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, pluck, tap, share, map } from 'rxjs/operators';
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

	@Effect()
	changeAttendanceStatus$: Observable<Action> = this.actions$.pipe(
		ofType(AttendanceStateAction.ChangeTraineeAttendanceStatus),
		switchMap((data) => this.attendanceService.ChangeTraineeAttendanceStatus(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('change attendance status'))
				: of(MainStateAction.FailMessage('changing attendance status'))
		),
		share()
	);

	@Effect()
	setAttendancePermission$: Observable<Action> = this.actions$.pipe(
    ofType(AttendanceStateAction.SetAttendancePermission),
		switchMap((data) =>
			data.to === true
				? this.attendanceService.SaveTraineePermission(data)
				: this.attendanceService.DeleteTraineePermission(data)
		),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('change fullday permission'))
				: of(MainStateAction.FailMessage('changing fullday permission'))
		),
		share()
	);

	// Possibly not needed because attendance is on .aspx page.
	@Effect()
	saveAttendance$: Observable<Action> = this.actions$.pipe(
		ofType(AttendanceStateAction.SaveTraineeAttendance),
		switchMap((data) =>
			data.attType === 'Rest'
				? this.attendanceService.SaveRestAttendance(data)
				: data.attType === 'Room'
				? this.attendanceService.SaveRoomAttendance(data)
				: data.attType === 'Secretariat'
				? this.attendanceService.SaveSecretariatAttendance(data)
				: of('')
		),
		mergeMap((res) =>
			res !== ''
				? of(MainStateAction.SuccessfullyMessage('saved attendance'))
				: of(MainStateAction.FailMessage('saving attendance'))
		),
		share()
	);
}
