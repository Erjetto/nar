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
  ClientGeneration,
} from '../../models';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DateHelper } from '../../utilities/date-helper';
import { map as _map} from 'lodash';

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
		return this.httpClient
			.post(this.baseUrl + 'LogOn', data)
			.pipe(map((res: any) => User.fromJson(res.d)));
	}

	public LogOut(): Observable<boolean> {
		return this.httpClient.post(this.baseUrl + 'LogOut', {}).pipe(map((res: any) => res.d === true));
	}

	public GetCurrentUser(): Observable<User> {
		return this.httpClient
			.post(this.baseUrl + 'GetCurrentUser', {})
			.pipe(map((res: any) => User.fromJson(res.d)));
	}

	public GetCurrentTime(): Observable<Date> {
		return this.httpClient
			.post(this.baseUrl + 'GetCurrentTime', {})
			.pipe(map((res: string) => DateHelper.fromCSharpDate(res)));
	}

	public GetCurrentGeneration(): Observable<ClientGeneration> {
		return this.httpClient
			.post(this.baseUrl + 'GetCurrentGeneration', {})
			.pipe(map((res: any) => ClientGeneration.fromJson(res.d)));
	}

	public ChangeGeneration(data: { genId: string }): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'ChangeGeneration', data)
			.pipe(map((res: any) => res + ''));
	}

	public ChangeRole(data: { role: string }): Observable<boolean> {
		return this.httpClient.post(this.baseUrl + 'ChangeRole', data).pipe(map((res: any) => res === true));
	}

	public GetScoreBySubject(data: { subjectId: string }): Observable<ClientScoreTrainee[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetScoreBySubject', data)
			.pipe(map((res: any) => _map(res.d, ClientScoreTrainee.fromJson)));
	}

	public GetMaterial(data: { subjectId: string }): Observable<Material[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetMaterial', data)
			.pipe(map((res: any) => _map(res.d, Material.fromJson)));
	}

	public GetTraineesInLatestPhase(): Observable<ClientTraineeView[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineesInLatestPhase', {})
			.pipe(map((res: any) => _map(res.d, ClientTraineeView.fromJson)));
	}

	public GetTrainees(): Observable<ClientTrainee[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTrainees', {})
			.pipe(map((res: any) => _map(res.d, ClientTrainee.fromJson)));
	}

	public GetTraineeData(data: { traineeId: string }): Observable<ClientTraineeData> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeData', data)
			.pipe(map((res: any) => ClientTraineeData.fromJson(res.d)));
	}

	public GetCurrentSubject(data: { phaseId: string }): Observable<ClientSubject> {
		return this.httpClient
			.post(this.baseUrl + 'GetCurrentSubject', data)
			.pipe(map((res: any) => ClientSubject.fromJson(res.d)));
	}

	public GetSubjectsWithPresentation(data: { phaseId: string }): Observable<ClientSubject[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetSubjectsWithPresentation', data)
			.pipe(map((res: any) => _map(res.d, ClientSubject.fromJson)));
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
		return this.httpClient
			.post(this.baseUrl + 'GetPhasesCurrentGeneration', {})
			.pipe(map((res: any) => _map(res.d, ClientPhase.fromJson)));
	}

	public GetPhasesCurrentGenerationWithType(data: { type: string }): Observable<ClientPhase[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetPhasesCurrentGenerationWithType', data)
			.pipe(map((res: any) => _map(res.d, ClientPhase.fromJson)));
	}

	public GetMessageCurrentGeneration(): Observable<Message[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetMessageCurrentGeneration', {})
			.pipe(map((res: any) => _map(res.d, Message.fromJson)));
	}

	public GetStatisticTrainee(data: { phaseId: string }): Observable<ClientStatistic[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetStatisticTrainee', data)
			.pipe(map((res: any) => _map(res.d, ClientStatistic.fromJson)));
	}

	public GetSubjects(data: { phaseId: string }): Observable<ClientSubject[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetSubjects', data)
			.pipe(map((res: any) => _map(res.d, ClientSubject.fromJson)));
	}
}
