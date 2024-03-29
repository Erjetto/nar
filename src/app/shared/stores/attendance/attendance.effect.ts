import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as AttendanceStateAction from './attendance.action';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, share } from 'rxjs/operators';
import { TraineeAttendanceService } from '../../services/new/trainee-attendance.service';

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
	getPeriodicAttendances$: Observable<Action> = this.actions$.pipe(
		ofType(AttendanceStateAction.FetchPeriodicAttendance),
		switchMap((data) => this.attendanceService.GetPeriodicTraineeAttendances(data)),
		mergeMap((res) => of(AttendanceStateAction.FetchPeriodicAttendanceSuccess({ payload: res }))),
		share()
	);

	@Effect()
	exportPeriodicAttendance$: Observable<Action> = this.actions$.pipe(
		ofType(AttendanceStateAction.ExportPeriodicTraineeAttendancesForSubject),
		switchMap((data) => this.attendanceService.ExportPeriodicTraineeAttendancesForSubject(data)),
		mergeMap((filename) => of(MainStateAction.DownloadMemoryFile({ filename }))),
		share()
	);

	@Effect()
	changeAttendanceStatus$: Observable<Action> = this.actions$.pipe(
		ofType(AttendanceStateAction.ChangeTraineeAttendanceStatus),
		switchMap((data) => this.attendanceService.ChangeTraineeAttendanceStatus({
			...data,
			type: data.attType
		})),
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
