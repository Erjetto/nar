import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {
	ClientTrainerTeachingSchedule,
	ClientTrainerTeachingScheduleUpdateResult,
	TrainerTeachingSchedule,
} from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map as _map } from 'lodash';
import { DateHelper } from '../../utilities/date-helper';

@Injectable({
	providedIn: 'root',
})
export class TrainerAttendanceService {
	private baseUrl = environment.apiUrl + 'Trainee.svc/';
	constructor(protected httpClient: HttpClient) {}

	public GetCurrentUserTeachingSchedule(): Observable<ClientTrainerTeachingSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetCurrentUserTeachingSchedule', {})
			.pipe(map((res: any) => _map(res.d, ClientTrainerTeachingSchedule.fromJson)));
	}

	public SaveTrainerTeachingAttendances(data: { date: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveTrainerTeachingAttendances', data)
			.pipe(map((res: any) => res.d === true));
	}

	public ChangeLecturerAttendanceStatus(data: {
		trainerTeachingScheduleId: string;
		note: string;
		status: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'ChangeLecturerAttendanceStatus', data)
			.pipe(map((res: any) => res.d === true));
	}

	public ChangeSubstituteLecturersAttendanceStatus(data: {
		trainerTeachingScheduleId: string;
		note: string;
		status: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'ChangeSubstituteLecturersAttendanceStatus', data)
			.pipe(map((res: any) => res.d === true));
	}

	public ChangeLecturerAttendanceStatusWithSubstitution(data: {
		trainerTeachingScheduleId: string;
		note: string;
		username: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'ChangeLecturerAttendanceStatusWithSubstitution', data)
			.pipe(map((res: any) => res.d === true));
	}

	public GetTrainerTeachingSchedules(data: {
    startDate: string;
    endDate: string;
	}): Observable<TrainerTeachingSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTrainerTeachingSchedules', data)
			.pipe(map((res: any) => _map(res.d, TrainerTeachingSchedule.fromJson)));
	}

	public GetTrainerTeachingDates(): Observable<Date[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTrainerTeachingDates', {})
			.pipe(map((res: any) => res.d.map((date) => DateHelper.fromCSharpDate(date))));
	}

	public SaveLecturerTeachingSchedules(data: { schedules: string[] }): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveLecturerTeachingSchedules', data)
			.pipe(map((res: any) => res.d as string[]));
	}

	public UpdateLecturerTeachingSchedule(data: {
		schedule: string;
	}): Observable<ClientTrainerTeachingScheduleUpdateResult> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateLecturerTeachingSchedule', data)
			.pipe(map((res: any) => ClientTrainerTeachingScheduleUpdateResult.fromJson(res.d)));
	}

	public DeleteLecturerTeachingSchedule(data: {
		trainerTeachingScheduleId: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteLecturerTeachingSchedule', data)
			.pipe(map((res: any) => res.d === true));
	}

	// public GetTrainerTeachingAttendances(data: {
	// 	date: string;
	// }): Observable<ClientTrainerTeachingAttendance> {
	// 	return this.httpClient
	// 		.post(this.baseUrl + 'GetTrainerTeachingAttendances', data)
	// 		.pipe(map((res: any) => ClientTrainerTeachingAttendance.fromJson(res.d)));
	// }
}
