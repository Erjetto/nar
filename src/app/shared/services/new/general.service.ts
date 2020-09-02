import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
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
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class GeneralService {
	private baseUrl = 'General.svc/';
	constructor(protected httpClient: HttpClient) {}

	public ChangeGeneration(data: { genId: string }): Observable<string> {
		return throwError('Not implemented yet');
	}

	public ChangeRole(data: { role: string }): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public LogOut(): Observable<never> {
		return throwError('Not implemented yet');
	}

	public LogOn(data: {
		userName: string;
		password: string;
		isPersistent: boolean;
	}): Observable<User> {
		return throwError('Not implemented yet');
	}

	public GetScoreByPhase(data: {
		phaseId: string;
	}): Observable<ClientScoreTrainee[]> {
		return throwError('Not implemented yet');
	}

	public GetScoreBySubject(data: {
		subjectId: string;
	}): Observable<ClientScoreTrainee[]> {
		return throwError('Not implemented yet');
	}

	public GetMaterial(data: { subjectId: string }): Observable<Material[]> {
		return throwError('Not implemented yet');
	}

	public GetTraineesInLatestPhase(): Observable<ClientTraineeView[]> {
		return throwError('Not implemented yet');
	}

	public GetTrainees(): Observable<ClientTrainee[]> {
		return throwError('Not implemented yet');
	}

	public GetTraineeData(data: {
		traineeId: string;
	}): Observable<ClientTraineeData> {
		return throwError('Not implemented yet');
	}

	public GetCurrentSubject(data: {
		phaseId: string;
	}): Observable<ClientSubject> {
		return throwError('Not implemented yet');
	}

	public GetSubjectsWithPresentation(data: {
		phaseId: string;
	}): Observable<ClientSubject[]> {
		return throwError('Not implemented yet');
	}

	// Notification
	public GetNotifications(): Observable<any> {
		return throwError('Not implemented yet');
	}

	// Notification
	public MarkNotificationAsRead(data: {
		notificationId: string;
	}): Observable<boolean> {
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

	public GetPhasesCurrentGenerationWithType(data: {
		type: string;
	}): Observable<ClientPhase[]> {
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

	public GetStatisticTrainee(data: {
		phaseId: string;
	}): Observable<ClientStatistic[]> {
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
