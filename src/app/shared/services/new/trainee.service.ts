import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
	ClientTraineeData,
	TraineeSchedule,
	AdditionalTraineeData,
	ClientPhaseSimple,
	SchedulePerWeek,
	ClientSpecificSchedule,
	ClientCaseTrainee,
	FLKQueue,
	FLKNote,
} from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map as _map } from 'lodash';

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
	}): Observable<ClientCaseTrainee> {
		return this.httpClient
			.post(this.baseUrl + 'GetCaseBySubject', data)
			.pipe(map((res: any) => ClientCaseTrainee.fromJson(res.d)));
	}

	public GetCaseByPhase(data: { phaseId: string }): Observable<ClientCaseTrainee> {
		return this.httpClient
			.post(this.baseUrl + 'GetCaseByPhase', data)
			.pipe(map((res: any) => ClientCaseTrainee.fromJson(res.d)));
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
		return this.httpClient.post(this.baseUrl + 'GetTraineeRole', {}).pipe(map((res: any) => res.d));
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

	public ExportTraineesData(): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'ExportTraineesData', {})
			.pipe(map((res: any) => res.d));
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
	}): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeSchedule', data)
			.pipe(map((res: any) => res.d));
	}

	public GetTraineeScheduleHeader(data: {
		binusianNumber: string;
		period: string;
	}): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeScheduleHeader', data)
			.pipe(map((res: any) => res.d));
	}

	public ExportTraineesSchedule(data: {
		binusianNumber: string;
		period: string;
		startDate: string;
		endDate: string;
	}): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'ExportTraineesSchedule', data)
			.pipe(map((res: any) => res.d));
	}

	public Delete(data: { binusianNumber: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'Delete', data)
			.pipe(map((res: any) => res.d === true));
	}

	//#region FLK

	public SubmitFLK(data: { fileId: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SubmitFLK', data)
			.pipe(map((res: any) => res.d === true));
	}

	public GetMyFLKSubmissionHistory(): Observable<FLKQueue[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetMyFLKSubmissionHistory', {})
			.pipe(map((res: any) => _map(res.d, FLKQueue.fromJson)));
	}

	public GetMyFLKNote(): Observable<FLKNote> {
		return this.httpClient
			.post(this.baseUrl + 'GetMyFLKNote', {})
			.pipe(map((res: any) => FLKNote.fromJson(res.d)));
	}

	public UpdateFLKNote(data: { note: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateFLKNote', data)
			.pipe(map((res: any) => res.d === true));
	}

	//#endregion
}
