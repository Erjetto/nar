import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { ClientInterviewReport, ClientPhase, Message, ClientStatistic, ClientSubject } from '../../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class GeneralService {
  private baseUrl = 'General.svc/';
	constructor(protected httpClient: HttpClient) {}

  public GetPhasesCurrentGeneration(): Observable<ClientPhase[]> {
		return of(MockData.GetPhasesCurrentGeneration).pipe(
			delay(500),
			map((r) => r.map(ClientPhase.fromJson))
		);
	}

  public GetPhasesCurrentGenerationWithType(type: string): Observable<ClientPhase[]> {
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

  public GetStatisticTrainee(phaseId: string): Observable<ClientStatistic[]> {
		return of(MockData.GetStatisticTrainee).pipe(
			delay(500),
			map((r) => r.map(ClientStatistic.fromJson))
		);
	}

  public GetSubjects(phaseId: string): Observable<ClientSubject[]> {
		return of(MockData.GetSubjects).pipe(
			delay(500),
			map((r) => r.map(ClientSubject.fromJson))
		);
	}
}
