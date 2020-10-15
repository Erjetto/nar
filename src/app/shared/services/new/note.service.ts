import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { HttpClient } from '@angular/common/http';
import {
	TopBottomVote,
	TrainerTopBottomVote,
	ClientTraineeReputationPaging,
	ClientTraineeData,
	EvaluationNote,
	ClientEvaluation,
	TraineeComment,
} from '../../models';
import { environment } from 'src/environments/environment';
import { map as _map} from 'lodash';
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

	public GetTraineesReputationByPhase(data: {
		phaseId: string;
		index: number;
		search: string;
	}): Observable<ClientTraineeReputationPaging> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineesReputationByPhase', data)
			.pipe(map((res: any) => ClientTraineeReputationPaging.fromJson(res.d)));
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
				sdate: '', // Tidak dipake tapi tetep diminta
			})
			.pipe(map((res: any) => res.d === true));
	}

	public GetTraineeCommentHistory(): Observable<TraineeComment> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeCommentHistory', {})
			.pipe(map((res: any) => TraineeComment.fromJson(res.d)));
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
