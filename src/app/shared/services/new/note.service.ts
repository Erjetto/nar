import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
	ClientTraineeData,
	EvaluationNote,
	ClientEvaluation,
	ClientTraineeReputation,
  TraineeCommentHistory,
} from '../../models';
import { environment } from 'src/environments/environment';
import { map as _map } from 'lodash';
import { DateHelper } from '../../utilities/date-helper';

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
		return this.httpClient
			.post(this.baseUrl + 'SaveNote', data)
			.pipe(map((res: any) => res.d === true));
	}

  // NOTE: ClientTraineeReputationPaging tak digunakan, ambil semua aja langsung
	public GetTraineesReputationByPhase(data: {
		phaseId: string;
	}): Observable<ClientTraineeReputation[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineesReputationByPhase', {
				phaseId: data.phaseId,
				index: 1,
				search: '',
			})
			.pipe(map((res: any) => _map(res.d.TraineeReputation, ClientTraineeReputation.fromJson)));
	}

	public GetTraineeDataForTrainer(data: { traineeId: string }): Observable<ClientTraineeData> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeDataForTrainer', data)
			.pipe(map((res: any) => ClientTraineeData.fromJson(res.d)));
	}

	public GetEvaluationNotesContain(data: { str: string }): Observable<EvaluationNote[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetEvaluationNotesContain', data)
			.pipe(map((res: any) => _map(res.d, EvaluationNote.fromJson)));
	}

	public DeleteReputationNote(data: { traineeId: string; noteId: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteReputationNote', data)
			.pipe(map((res: any) => res.d === true));
	}

	public GetEvaluation(data: { sdate: string }): Observable<ClientEvaluation> {
		return this.httpClient
			.post(this.baseUrl + 'GetEvaluation', data)
			.pipe(map((res: any) => ClientEvaluation.fromJson(res.d)));
	}

	public SaveEvaluationNote(data: { notes: string; sdate: Date }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveEvaluationNote', {
				...data,
				sdate: DateHelper.toCSharpDate(data.sdate),
			})
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteEvaluationNote(data: { noteId: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteEvaluationNote', {
				...data,
				sdate: DateHelper.toCSharpDate(new Date()), // Tidak dipake tapi tetep diminta
			})
			.pipe(map((res: any) => res.d === true));
	}

	public GetTraineeCommentHistory(): Observable<TraineeCommentHistory[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeCommentHistory', {})
			.pipe(map((res: any) => _map(res.d, TraineeCommentHistory.fromJson)));
	}

	public DeleteTraineeCommentHistory(data: {
		traineeId: string;
		noteId: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteTraineeCommentHistory', data)
			.pipe(map((res: any) => res.d === true));
	}

	// public GetTraineesWithPagingReputationByPhase(data: {
	// 	phaseId: string;
	// 	index: Date;
	// 	search: Date;
	// 	type: Date;
	// }): Observable<ClientTraineeBeeReputation> {
	// 	return throwError('Not implemented yet');
	// }

	// public GetTraineeBeeCount(data: {
	// 	phaseId: string;
	// }): Observable<number> {
	// 	return throwError('Not implemented yet');
	// }
}
