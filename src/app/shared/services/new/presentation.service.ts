import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { HttpClient } from '@angular/common/http';
import { ClientInterviewReport, ClientPhase, ClientSubject, ClientTrainee, CoreTrainingPresentation, TraineePresentation } from '../../models';

@Injectable({
	providedIn: 'root',
})
export class PresentationService {
  private baseUrl = 'Presentation.svc/';
	constructor(protected httpClient: HttpClient) {}

	public GetCurrentPhaseWithPresentation(): Observable<ClientPhase> {
		return of(MockData.GetCurrentPhaseWithPresentation).pipe(
			delay(500),
			map((r) => ClientPhase.fromJson(r))
		);
	}

	public GetPresentationTrainee(): Observable<ClientTrainee[]> {
		return of(MockData.GetPresentationTrainee).pipe(
			delay(500),
			map((r) => r.map(ClientTrainee.fromJson))
		);
	}

	public GetTraineePresentationNo(): Observable<number> {
		return of(MockData.GetTraineePresentationNo).pipe(
			delay(500),
		);
	}

	public GetPhaseWithPresentation(): Observable<ClientPhase[]> {
		return of(MockData.GetPhaseWithPresentation).pipe(
			delay(500),
			map((r) => r.map(ClientPhase.fromJson))
		);
	}

	public GetPresentationStatus(filename): Observable<string> {
		return of(MockData.GetPresentationStatus).pipe(
			delay(500),
		);
	}

	public FindCoreTrainingPresentationByGeneration(generationId): Observable<CoreTrainingPresentation[]> {
		return of(MockData.FindCoreTrainingPresentationByGeneration).pipe(
			delay(500),
      map((r) => r.map(CoreTrainingPresentation.fromJson))
		);
	}

	public GetPresentationReportSummary(subjectId): Observable<TraineePresentation[]> {
		return of(MockData.GetPresentationReportSummary).pipe(
			delay(500),
      map((r) => r.map(TraineePresentation.fromJson))
		);
	}

	public GetPresentationReportDetail(subjectId): Observable<TraineePresentation[]> {
		return of(MockData.GetPresentationReportDetail).pipe(
			delay(500),
      map((r) => r.map(TraineePresentation.fromJson))
		);
	}
}
