import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientCaseTrainer, ClientUploadAnswer } from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map as _map } from 'lodash';
@Injectable({
	providedIn: 'root',
})
export class TrainerService {
	private baseUrl = environment.apiUrl + 'Trainer.svc/';
	constructor(protected httpClient: HttpClient) {}

	public GetAllCases(data: { phaseId: string }): Observable<ClientCaseTrainer[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetAllCases', data)
			.pipe(map((res: any) => _map(res.d, ClientCaseTrainer.fromJson)));
	}

	public DownloadAllAnswers(data: { caseId: string }): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'DownloadAllAnswers', data)
			.pipe(map((res: any) => res.d));
	}

	public GetCaseBySubject(data: { subjectId: string }): Observable<ClientCaseTrainer[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetCaseBySubject', data)
			.pipe(map((res: any) => _map(res.d, ClientCaseTrainer.fromJson)));
	}

	public GetTraineeAnswer(data: { caseId: string }): Observable<ClientUploadAnswer[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeAnswer', data)
			.pipe(map((res: any) => _map(res.d, ClientUploadAnswer.fromJson)));
	}

	public SaveScore(data: {
		phaseId: string;
		traineeId: string;
		caseId: string;
		score: number;
		zeroingReason: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveScore', data)
			.pipe(map((res: any) => res.d === true));
	}
	
	public GenerateExcelTemplateForScoring(data: { caseId: string }): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'GenerateExcelTemplateForScoring', data)
			.pipe(map((res: any) => res.d + ''));
	}

	public ImportScoreFromExcel(data: {
		fileId: string;
		caseId: string;
	}): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'ImportScoreFromExcel', data)
			.pipe(map((res: any) => res.d as string[]));
	}

	public IsTrainer(): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'IsTrainer', {})
			.pipe(map((res: any) => res.d === true));
	}
}
