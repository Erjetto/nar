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
import { environment } from 'src/environments/environment';
import { map as _map} from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class TraineeService {
	private baseUrl = environment.apiUrl + 'Trainee.svc/';
	constructor(protected httpClient: HttpClient) {}

	public GetTraineeTrainingSchedule(data: {
		binusianNumber: string;
	}): Observable<TraineeSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeTrainingSchedule', data)
			.pipe(map((res: any) => _map(res.d, TraineeSchedule.fromJson)));
	}

	public GetTraineeScheduleHeader(data: {
		binusianNumber: string;
		period: string;
	}): Observable<TraineeSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeScheduleHeader', data)
			.pipe(map((res: any) => _map(res.d, TraineeSchedule.fromJson)));
	}

	public GetTraineeBinusianData(data: { binusianNumber: string }): Observable<TraineeSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeBinusianData', data)
			.pipe(map((res: any) => _map(res.d, TraineeSchedule.fromJson)));
	}

	public SaveAdditionalTraineData(data: {
		traineeData: AdditionalTraineeData;
	}): Observable<TraineeSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveAdditionalTraineData', data)
			.pipe(map((res: any) => _map(res.d, TraineeSchedule.fromJson)));
	}

	public SaveScheduleRegister(data: {
		// userSchedule: RegisteredSchedule
	}): Observable<TraineeSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveScheduleRegister', data)
			.pipe(map((res: any) => _map(res.d, TraineeSchedule.fromJson)));
	}

	public GetCaseBySubject(data: {
		phaseId: string;
		subjectId: string;
	}): Observable<ClientCaseTrainer> {
		return this.httpClient
			.post(this.baseUrl + 'GetCaseBySubject', data)
			.pipe(map((res: any) => ClientCaseTrainer.fromJson(res.d)));
	}

	public GetCaseByPhase(data: { phaseId: string }): Observable<TraineeSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetCaseByPhase', data)
			.pipe(map((res: any) => _map(res.d, TraineeSchedule.fromJson)));
	}

	public SaveAnswer(data: {
		phaseId: string;
		caseId: string;
		fileId: string;
	}): Observable<TraineeSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveAnswer', data)
			.pipe(map((res: any) => _map(res.d, TraineeSchedule.fromJson)));
	}

	public GetSpecificTraineeSchedule(data: {
		phaseId: string;
		subjectId: string;
	}): Observable<SchedulePerWeek[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetSpecificTraineeSchedule', data)
			.pipe(map((res: any) => _map(res.d, SchedulePerWeek.fromJson)));
	}

	public GetCurrentUserSpecificSchedule(data: {
		phaseId: string;
	}): Observable<ClientSpecificSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetCurrentUserSpecificSchedule', data)
			.pipe(map((res: any) => _map(res.d, ClientSpecificSchedule.fromJson)));
	}

	public GetTraineeRole(): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeRole', {})
			.pipe(map((res: any) => res.d + ''));
	}

	public GetTraineeActivationStatus(): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeActivationStatus', {})
			.pipe(map((res: any) => res.d === true));
	}

	public GetSpecificTraineeScheduleCount(): Observable<number> {
		return this.httpClient
			.post(this.baseUrl + 'GetSpecificTraineeScheduleCount', {})
			.pipe(map((res: any) => res.d as number));
	}

	public GetPhasesCurrentTrainee(): Observable<ClientPhaseSimple[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetPhasesCurrentTrainee', {})
			.pipe(map((res: any) => _map(res.d, ClientPhaseSimple.fromJson)));
	}

	public GetTrainees(): Observable<ClientTraineeData[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTrainees', {})
			.pipe(map((res: any) => _map(res.d, ClientTraineeData.fromJson)));
	}

	public GetTrainee(data: { traineeId: string }): Observable<ClientTraineeData> {
		return this.httpClient
			.post(this.baseUrl + 'GetTrainee', data)
			.pipe(map((res: any) => ClientTraineeData.fromJson(res.d)));
	}

	public GetTraineeSchedule(data: {
		binusianNumber: string;
		period: string;
		startDate: string;
		endDate: string;
	}): Observable<any> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeSchedule', data)
			.pipe(map((res: any) => res.d));
	}

	public Delete(data: { binusianNumber: string }): Observable<boolean> {
		return this.httpClient.post(this.baseUrl + 'Delete', data).pipe(map((res: any) => res.d === true));
	}
}
