import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { HttpClient } from '@angular/common/http';
import {
	ClientInterviewReport,
	ClientTraineeAttendanceReport,
	ClientEvaluation,
	TraineePresentation,
	ClientPeriodicTraineeAttendance,
  ClientTraineeDailyAttendance,
} from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class TraineeAttendanceService {
	private baseUrl = environment.apiUrl + 'TraineeAttendance.svc/';
	constructor(protected httpClient: HttpClient) {}
	// Date format: 'yyyy-MM-dd'

	public SaveRoomAttendance(data: { traineeCode: string }): Observable<string> {
		return throwError('Not implemented yet');
	}

	public SaveRestAttendance(data: { traineeCode: string }): Observable<string> {
		return throwError('Not implemented yet');
	}

	public SaveSecretariatAttendance(data: {
		traineeCode: string;
	}): Observable<string> {
		return throwError('Not implemented yet');
	}

	public SavePermissionAttendance(data: {
		traineeCode: string;
		reason: string;
	}): Observable<string> {
		return throwError('Not implemented yet');
	}

	public GetTraineeAttendanceForTrainee(): Observable<
		ClientTraineeDailyAttendance
	> {
		return throwError('Not implemented yet');
	}

	public GetTraineeAttendanceByGeneration(data: {
		generation: string;
	}): Observable<ClientPeriodicTraineeAttendance[]> {
		return throwError('Not implemented yet');
	}

	public GetPeriodicTraineeAttendances(data: {
		startDate: string;
		endDate: string;
		includeUnfinalized: string;
	}): Observable<ClientPeriodicTraineeAttendance[]> {
		return throwError('Not implemented yet');
	}

	public SaveTraineeSchedules(data: {
		schedules: string[];
	}): Observable<string[]> {
		return throwError('Not implemented yet');
	}

	public SaveTraineeLectureSchedules(data: {
		schedules: string[];
	}): Observable<string[]> {
		return throwError('Not implemented yet');
	}

	public ChangeTraineeAttendanceStatus(data: {
		attendanceId: string;
		status: string;
		note: string;
		traineeCode: string;
		type: string;
		attendanceDate: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public SaveTraineeAttendances(data: {
		phase: string;
		date: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public SaveAttendances(data: { attendances: string[] }): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public SaveTraineePermission(data: {
		traineecode: string;
		date: string;
		reason: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public saveIPWhiteList(data: { ipList: string[] }): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public SaveTraineeAttendancesWithPhase(data: {
		date: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public DeleteTraineePermission(data: {
		traineecode: string;
		date: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public GetTraineeAttendancesWithPhase(data: {
		phase: string;
		date: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public GetTraineeAttendances(data: {
		date: string;
	}): Observable<ClientTraineeAttendanceReport> {
		return of(MockData.GetTraineeAttendances).pipe(
			delay(500),
			map((r) => ClientTraineeAttendanceReport.fromJson(r))
		);
	}

	public GetEvaluation(data: { sdate: string }): Observable<ClientEvaluation> {
		return of(MockData.GetEvaluation).pipe(
			delay(500),
			map((r) => ClientEvaluation.fromJson(r))
		);
	}

	public GetPresentationReportDetailByDate(data: {
		time: string;
	}): Observable<TraineePresentation[]> {
		return of(MockData.GetPresentationReportDetailByDate).pipe(
			delay(500),
			map((r) => r.map(TraineePresentation.fromJson))
		);
	}

	public getIPWhiteList(data: { time: string }): Observable<string[]> {
		return of(MockData.getIPWhiteList).pipe(delay(500));
	}
}
