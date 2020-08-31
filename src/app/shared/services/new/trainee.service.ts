import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import {
	ClientInterviewReport,
	ClientTraineeData,
	TraineeSchedule,
  AdditionalTraineeData,
  ClientPhaseSimple,
  ClientCaseTrainer,
  SchedulePerWeek,
  ClientSpecificSchedule,
} from '../../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class TraineeService {
	private baseUrl = 'Trainee.svc/';
	constructor(protected httpClient: HttpClient) {}

	public GetTraineeTrainingSchedule(data: {
		binusianNumber: string;
	}): Observable<TraineeSchedule[]> {
		return throwError('Not implemented yet');
	}

	public GetTraineeScheduleHeader(data: {
		binusianNumber: string;
		period: string;
	}): Observable<TraineeSchedule[]> {
		return throwError('Not implemented yet');
	}

	public GetTraineeBinusianData(data: {
		binusianNumber: string;
	}): Observable<TraineeSchedule[]> {
		return throwError('Not implemented yet');
	}

	public SaveAdditionalTraineData(data: {
		traineeData: AdditionalTraineeData;
	}): Observable<TraineeSchedule[]> {
		return throwError('Not implemented yet');
	}

	public GetCaseBySubject(data: {
		phaseId: string;
		subjectId: string;
	}): Observable<ClientCaseTrainer> {
		return throwError('Not implemented yet');
	}

	public GetCaseByPhase(data: {
		phaseId: string;
	}): Observable<TraineeSchedule[]> {
		return throwError('Not implemented yet');
	}

	public SaveAnswer(data: {
		phaseId: string;
		caseId: string;
		fileId: string;
	}): Observable<TraineeSchedule[]> {
		return throwError('Not implemented yet');
	}

	public GetSpecificTraineeSchedule(data: {
		phaseId: string;
		subjectId: string;
	}): Observable<SchedulePerWeek[]> {
		return throwError('Not implemented yet');
	}

	public GetCurrentUserSpecificSchedule(data: {
		phaseId: string;
	}): Observable<ClientSpecificSchedule[]> {
		return throwError('Not implemented yet');
	}

	public GetTraineeRole(): Observable<string> {
		return throwError('Not implemented yet');
	}

	public GetTraineeActivationStatus(): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public GetSpecificTraineeScheduleCount(): Observable<number> {
		return throwError('Not implemented yet');
	}

	public GetPhasesCurrentTrainee(): Observable<ClientPhaseSimple[]> {
		return throwError('Not implemented yet');
	}

	public GetTrainees(): Observable<ClientTraineeData[]> {
		return of(MockData.GetTrainees).pipe(
			delay(500),
			map((r) => r.map(ClientTraineeData.fromJson))
		);
	}

	public GetTraineeSchedule(data: {
		binusianNumber: string;
		period: string;
		startDate: string;
		endDate: string;
	}): Observable<any> {
		return of(MockData.GetTraineeSchedule).pipe(
			delay(500),
			map((r) => JSON.parse(r))
		);
	}

	public Delete(data: { binusianNumber: string }): Observable<any> {
		// return this.httpClient.post(this.baseUrl + 'Delete', data)
		return of(true).pipe(delay(500));
	}
}
