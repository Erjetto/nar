import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { ClientCaseTrainer, ClientUploadAnswer } from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class TrainerService {
	private baseUrl = environment.apiUrl + 'Trainer.svc/';
	constructor(protected httpClient: HttpClient) {}

	public GetAllCases(data: {
		phaseId: string;
	}): Observable<ClientCaseTrainer[]> {
		return throwError('Not implemented yet');
	}

	public GetCaseBySubject(data: {
		subjectId: string;
	}): Observable<ClientCaseTrainer[]> {
		return throwError('Not implemented yet');
	}

	public GetTraineeAnswer(data: {
		caseId: string;
	}): Observable<ClientUploadAnswer[]> {
		return throwError('Not implemented yet');
	}

	public SaveScore(data: {
		phaseId: string;
		traineeId: string;
		caseId: string;
		score: number;
		zeroingReason: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public IsTrainer(): Observable<boolean> {
		return throwError('Not implemented yet');
	}
}
