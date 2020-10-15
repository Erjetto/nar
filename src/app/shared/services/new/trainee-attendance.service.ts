import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
	ClientTraineeAttendanceReport,
	TraineePresentation,
	ClientPeriodicTraineeAttendance,
	ClientTraineeDailyAttendance,
} from '../../models';
import { environment } from 'src/environments/environment';
import { map as _map} from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class TraineeAttendanceService {
	private baseUrl = environment.apiUrl + 'TraineeAttendance.svc/';
	constructor(protected httpClient: HttpClient) {}
	// Date format: 'yyyy-MM-dd'

	public SaveRoomAttendance(data: { traineeCode: string }): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'SaveRoomAttendance', data)
			.pipe(map((res: any) => res.d + ''));
	}

	public SaveRestAttendance(data: { traineeCode: string }): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'SaveRestAttendance', data)
			.pipe(map((res: any) => res.d + ''));
	}

	public SaveSecretariatAttendance(data: { traineeCode: string }): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'SaveSecretariatAttendance', data)
			.pipe(map((res: any) => res.d + ''));
	}

	public SavePermissionAttendance(data: {
		traineeCode: string;
		reason: string;
	}): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'SavePermissionAttendance', data)
			.pipe(map((res: any) => res.d + ''));
	}

	public GetTraineeAttendanceForTrainee(): Observable<ClientTraineeDailyAttendance> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeAttendanceForTrainee', {})
			.pipe(map((res: any) => ClientTraineeDailyAttendance.fromJson(res.d)));
	}

	public GetTraineeAttendanceByGeneration(data: {
		generation: string;
	}): Observable<ClientPeriodicTraineeAttendance[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeAttendanceByGeneration', data)
			.pipe(map((res: any) => _map(res.d, ClientPeriodicTraineeAttendance.fromJson)));
	}

	public GetPeriodicTraineeAttendances(data: {
		startDate: string;
		endDate: string;
		includeUnfinalized: string;
	}): Observable<ClientPeriodicTraineeAttendance[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetPeriodicTraineeAttendances', data)
			.pipe(map((res: any) => _map(res.d, ClientPeriodicTraineeAttendance.fromJson)));
	}

	public SaveTraineeSchedules(data: { schedules: string[] }): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveTraineeSchedules', data)
			.pipe(map((res: any) => res.d as string[]));
	}

	public SaveTraineeLectureSchedules(data: { schedules: string[] }): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveTraineeLectureSchedules', data)
			.pipe(map((res: any) => res.d as string[]));
	}

	public ChangeTraineeAttendanceStatus(data: {
		attendanceId: string;
		status: string;
		note: string;
		traineeCode: string;
		type: string;
		attendanceDate: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'ChangeTraineeAttendanceStatus', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SaveTraineeAttendances(data: { date: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveTraineeAttendances', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SaveAttendances(data: { attendances: string[] }): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveAttendances', data)
			.pipe(map((res: any) => res.d as string[]));
	}

	public SaveTraineePermission(data: {
		traineecode: string;
		date: string;
		reason: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveTraineePermission', data)
			.pipe(map((res: any) => res.d === true));
	}

	public saveIPWhiteList(data: { ipList: string[] }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'saveIPWhiteList', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SaveTraineeAttendancesWithPhase(data: { date: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveTraineeAttendancesWithPhase', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteTraineePermission(data: { traineecode: string; date: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteTraineePermission', data)
			.pipe(map((res: any) => res.d === true));
	}

	public GetTraineeAttendancesWithPhase(data: {
		phase: string;
		date: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeAttendancesWithPhase', data)
			.pipe(map((res: any) => res.d === true));
	}

	public GetTraineeAttendances(data: { date: string }): Observable<ClientTraineeAttendanceReport> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeAttendances', data)
			.pipe(map((res: any) => ClientTraineeAttendanceReport.fromJson(res.d)));
	}

	public GetPresentationReportDetailByDate(data: {
		time: string;
	}): Observable<TraineePresentation[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetPresentationReportDetailByDate', data)
			.pipe(map((res: any) => _map(res.d, TraineePresentation.fromJson)));
	}

	public getIPWhiteList(): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'getIPWhiteList', {})
			.pipe(map((res: any) => res.d as string[]));
	}
}
