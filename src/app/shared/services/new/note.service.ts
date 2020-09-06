import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { HttpClient } from '@angular/common/http';
import { TopBottomVote, TrainerTopBottomVote, ClientTraineeReputationPaging, ClientTraineeData, EvaluationNote } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class NoteService {
  private baseUrl = environment.apiUrl + 'Note.svc/';
	constructor(protected httpClient: HttpClient) {}

	public SaveNote(data: {
		traineeId: string;
		note: string;
		reputation: number;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public GetTraineesReputationByPhase(data: {
		phaseId: string;
		index: number;
		search: string;
	}): Observable<ClientTraineeReputationPaging> {
		return throwError('Not implemented yet');
	}

	public GetTraineeDataForTrainer(data: {
		traineeId: string;
	}): Observable<ClientTraineeData> {
		return throwError('Not implemented yet');
	}

	public GetEvaluationNotesContain(data: {
		str: string;
	}): Observable<EvaluationNote[]> {
		return throwError('Not implemented yet');
	}
}
