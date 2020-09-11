import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import {
	ClientInterviewReport,
	ClientPhase,
	Message,
	ClientStatistic,
	ClientSubject,
	User,
	ClientScoreTrainee,
	Material,
	ClientTraineeView,
	ClientTraineeData,
	ClientTrainee,
} from '../../models';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DateHelper } from '../../utilities/date-helper';
import * as _ from 'lodash';

// const headers = {
// 	'Content-Type': 'application/json',
// 	'Access-Control-Allow-Origin': '*',
// 	'Access-Control-Allow-Methods': 'POST,',
// };

@Injectable({
	providedIn: 'root',
})
export class GeneralService {
	private baseUrl = environment.apiUrl + 'General.svc/';
	constructor(protected httpClient: HttpClient) {}

	public GetUserSalt(data: { userName: string }): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'GetUserSalt', data)
			.pipe(map((res: any) => res.d + ''));
	}

	public LogOn(data: {
		userName: string;
		password: string;
		isPersistent: boolean;
	}): Observable<User> {
		return this.httpClient.post(this.baseUrl + 'LogOn', data).pipe(
			map((res: any) => {
				return User.fromJson(res.d);
			})
		);
	}

	public LogOut(): Observable<boolean> {
		return this.httpClient.post(this.baseUrl + 'LogOut', {}).pipe(map((res: any) => !!res.d));
	}

	public GetCurrentUser(): Observable<User> {
		return this.httpClient
			.post(this.baseUrl + 'GetCurrentUser', {})
			.pipe(map((res: any) => User.fromJson(res.d)));
		// return of(new User('ASDF', 'RZ', 'Rheza', 'Assistant Supervisor', 't009'));
	}

	public GetCurrentTime(): Observable<Date> {
		return this.httpClient
			.post(this.baseUrl + 'GetCurrentTime', {})
			.pipe(map((res: string) => DateHelper.fromCSharpDate(res)));
	}

	public ChangeGeneration(data: { genId: string }): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'ChangeGeneration', data)
			.pipe(map((res) => res + ''));
	}

	public ChangeRole(data: { role: string }): Observable<boolean> {
		return this.httpClient.post(this.baseUrl + 'ChangeRole', data).pipe(map((res) => !!res));
	}

	public GetScoreBySubject(data: { subjectId: string }): Observable<ClientScoreTrainee[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetScoreBySubject', data)
			.pipe(map((res) => _.map(res, ClientScoreTrainee.fromJson)));
	}

	public GetMaterial(data: { subjectId: string }): Observable<Material[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetMaterial', data)
			.pipe(map((res) => _.map(res, Material.fromJson)));
	}

	public GetTraineesInLatestPhase(): Observable<ClientTraineeView[]> {
		return throwError('Not implemented yet');
	}

	public GetTrainees(): Observable<ClientTrainee[]> {
		return of(MockData.GetTrainees).pipe(
			delay(500),
			map((r) => r.map(ClientTrainee.fromJson))
		);
	}

	public GetTraineeData(data: { traineeId: string }): Observable<ClientTraineeData> {
		return throwError('Not implemented yet');
	}

	public GetCurrentSubject(data: { phaseId: string }): Observable<ClientSubject> {
		return throwError('Not implemented yet');
	}

	public GetSubjectsWithPresentation(data: { phaseId: string }): Observable<ClientSubject[]> {
		return throwError('Not implemented yet');
	}

	// Notification
	public GetNotifications(): Observable<any> {
		return throwError('Not implemented yet');
	}

	// Notification
	public MarkNotificationAsRead(data: { notificationId: string }): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	// Notification
	public MarkAllNotificationAsRead(): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	// Notification
	public RemoveAllNotification(): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public GetPhasesCurrentGeneration(): Observable<ClientPhase[]> {
		return of(MockData.GetPhasesCurrentGeneration).pipe(
			delay(500),
			map((r) => r.map(ClientPhase.fromJson))
		);
	}

	public GetPhasesCurrentGenerationWithType(data: { type: string }): Observable<ClientPhase[]> {
		return of(MockData.GetPhasesCurrentGenerationWithType).pipe(
			delay(500),
			map((r) => r.map(ClientPhase.fromJson))
		);
	}

	public GetMessageCurrentGeneration(): Observable<Message[]> {
		return of(MockData.GetMessageCurrentGeneration).pipe(
			delay(500),
			map((r) => r.map(Message.fromJson))
		);
	}

	public GetStatisticTrainee(data: { phaseId: string }): Observable<ClientStatistic[]> {
		return of(MockData.GetStatisticTrainee).pipe(
			delay(500),
			map((r) => r.map(ClientStatistic.fromJson))
		);
	}

	public GetSubjects(data: { phaseId: string }): Observable<ClientSubject[]> {
		return of(MockData.GetSubjects).pipe(
			delay(500),
			map((r) => r.map(ClientSubject.fromJson))
		);
	}
}
