import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { HttpClient } from '@angular/common/http';
import {
	ClientTrainee,
	ClientGeneration,
	TopBottomVoteSchedule,
	ClientSchedule,
	ClientSubject,
	ClientPhase,
	Role,
	ClientUserInRoles,
} from '../../models';

@Injectable({
	providedIn: 'root',
})
export class LeaderService {
	private baseUrl = 'Leader.svc/';
	constructor(protected httpClient: HttpClient) {}

	//#region Get Data
	public GetTraineesSimpleData(): Observable<ClientTrainee[]> {
		return of(MockData.GetTraineesByPhase).pipe(
			delay(500),
			map((r) => r.map(ClientTrainee.fromJson))
		);
	}
	public GetTraineesByPhase(phaseId): Observable<ClientTrainee[]> {
		return of(MockData.GetTraineesByPhase).pipe(
			delay(500),
			map((r) => r.map(ClientTrainee.fromJson))
		);
	}

	public GetTraineesBySchedule(scheduleId): Observable<ClientTrainee[]> {
		return of(MockData.GetTraineesBySchedule).pipe(
			delay(500),
			map((r) => r.map(ClientTrainee.fromJson))
		);
	}

	public GetGenerations(): Observable<ClientGeneration[]> {
		return of(MockData.GetGenerations).pipe(
			delay(500),
			map((r) => r.map(ClientGeneration.fromJson))
		);
	}

	public GetTopBottomVoteSchedules(): Observable<TopBottomVoteSchedule[]> {
		return of(MockData.GetTopBottomVoteSchedules).pipe(
			delay(500),
			map((r) => r.map(TopBottomVoteSchedule.fromJson))
		);
	}

	public GetSchedules(subjectId): Observable<ClientSchedule[]> {
		return of(MockData.GetSchedules).pipe(
			delay(500),
			map((r) => r.map(ClientSchedule.fromJson))
		);
	}

	public GetCurrentSubject(phaseId): Observable<ClientSubject> {
		return of(MockData.GetCurrentSubject).pipe(
			delay(500),
			map((r) => ClientSubject.fromJson(r))
		);
	}

	public GetCase(scheduleId): Observable<ClientPhase[]> {
		return of(MockData.GetCase).pipe(
			delay(500),
			map((r) => r.map(ClientPhase.fromJson))
		);
	}

	public GetRoles(): Observable<Role[]> {
		return of(MockData.GetRoles).pipe(
			delay(500),
			map((r) => r.map(Role.fromJson))
		);
	}

	public GetUserInRoles(): Observable<ClientUserInRoles[]> {
		return of(MockData.GetUserInRoles).pipe(
			delay(500),
			map((r) => r.map(ClientUserInRoles.fromJson))
		);
	}

	public GetMaximumFileSize(): Observable<number> {
		return of(MockData.GetMaximumFileSize).pipe(delay(500));
	}

	public GetGeneralAssistantRole(): Observable<boolean> {
		return of(MockData.GetGeneralAssistantRole).pipe(delay(500));
	}
	//#endregion

	//#region Save
	public SaveGeneration(data: {
		generationName: string;
		semester: string;
		year: string;
	}) {
		// return this.httpClient.post(this.baseUrl + 'SaveGeneration', data)
		return of(true).pipe(delay(500));
	}
  
  // datas: ['CompSci, Assistant, 3, 150025626,...', ...]
	public SaveTraineesInGeneration(data: { datas: string[] }) {
    // return this.httpClient.post(this.baseUrl + 'SaveTraineesInGeneration', data)
    return of(true).pipe(delay(500));
  }
  
  // datas: ['1503251513, ar, T001', ...]
	public SaveChangeMemberType(data: { datas: string[] }) {
    // return this.httpClient.post(this.baseUrl + 'SaveChangeMemberType', data)
    return of(true).pipe(delay(500));
  }

	public SavePhase(data: {
		name: string;
		beginDate: string;
		endDate: string;
		type: string;
	}) {
		// return this.httpClient.post(this.baseUrl + 'SavePhase', data)
		return of(true).pipe(delay(500));
	}

	public SaveTraineesToPhase(data: {
		binusianNumbers: string[];
		phaseId: string;
		isAddToSchedule: boolean;
	}) {
		// Possible result -> array of existing error
		// return this.httpClient.post(this.baseUrl + 'SaveTraineesToPhase', data)
		return of(true).pipe(delay(500));
  }
  
  public SaveSubject(data: {
    name: string;
    phaseId: string;
    value: boolean;
  }){
		// return this.httpClient.post(this.baseUrl + 'SaveSubject', data)
		return of(true).pipe(delay(500));
  }
  
  public SaveMaximumFileSize(data: {
    fileSize: string;
    subjectId: string
  }){
		// return this.httpClient.post(this.baseUrl + 'SaveMaximumFileSize', data)
		return of(true).pipe(delay(500));
  }
  
  public SaveSubjectDetail(data: {
    subjectId: string;
    value: boolean;
  }){
		// return this.httpClient.post(this.baseUrl + 'SaveSubjectDetail', data)
		return of(true).pipe(delay(500));
  }
  
  public SaveSpecificSchedule(data: {
		subjectId: string;
		scheduleType: string;
		scheduleCount: number;
    scheduleName: string;
    dataSchedule: any;
    start: string;
    end: string;
    excTrainee: string[];
  }){
		// return this.httpClient.post(this.baseUrl + 'SaveSpecificSchedule', data) // checked
		return of(true).pipe(delay(500));
  }
  
  public SaveTraineesToSchedule(data: {
    binusianNumbers: string[]; // yyyy-mm-dd
    phaseId: string;
    subjectId: string;
    scheduleId: string;
  }){
		// return this.httpClient.post(this.baseUrl + 'SaveTraineesToSchedule', data)
		return of(true).pipe(delay(500));
  }
  
  public SaveInterviewQuestions(data: {
    questionName: string;
    questions: string[];
  }){
		// return this.httpClient.post(this.baseUrl + 'SaveInterviewQuestions', data)
		return of(true).pipe(delay(500));
  }
  
  public SaveUserInRoles(data: {
    userRoleId: string;
    userRoles: string[];
  }){
		// return this.httpClient.post(this.baseUrl + 'SaveInterviewQuestions', data)
		return of(true).pipe(delay(500));
  }

	//#endregion

	//#region Update/Save Data

	public UpdateGeneration(data: {
		GenerationId: string;
		Description: string;
		Semester: string;
		Year: string;
	}): Observable<boolean> {
		// return this.httpClient.post(this.baseUrl + 'UpdateGeneration', data)
		return of(true).pipe(delay(500));
	}

	public UpdatePhase(data: {
		Description: string;
		EndDate: string;
		PhaseId: string;
		StartDate: string;
	}) {
		// return this.httpClient.post(this.baseUrl + 'UpdatePhase', data)
		return of(true).pipe(delay(500));
	}
	//#endregion

  //#region Delete

	public DeleteTraineeInPhase(data: { PhaseId: string; TraineeId: string }) {
		// return this.httpClient.post(this.baseUrl + 'DeleteTraineeInPhase', data)
		return of(true).pipe(delay(500));
  }

  public DeleteSubject(data: {subjectId: string}){
    // return this.httpClient.post(this.baseUrl + 'DeleteSubject', data)
    return of(true).pipe(delay(500));
  }
  
  public DeleteUserInRoles(data: {
    userInRoleId: string;
  }){
		// return this.httpClient.post(this.baseUrl + 'DeleteUserInRoles', data)
		return of(true).pipe(delay(500));
  }
	//#endregion
}
