import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {
	SubcoCandidateQuestionModel,
	SubcoCandidateAnswerModel,
} from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class SubcoCandidateService {
	private baseUrl = environment.apiUrl + 'SubcoCandidate.svc/';
	constructor(protected httpClient: HttpClient) {}

	// Offset -2 generation
	public GetQuestionsForTrainerGeneration(): Observable<
		SubcoCandidateQuestionModel
	> {
		return throwError('Not implemented yet');
	}

	public GetQuestionsById(data: {
		questionId: string;
	}): Observable<SubcoCandidateQuestionModel> {
		return throwError('Not implemented yet');
	}

	public SaveQuestionsForTrainer(data: {
		questions: string[];
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public GetAnswersFromTrainerGeneration(): Observable<
		SubcoCandidateAnswerModel
	> {
		return throwError('Not implemented yet');
	}

	public GetAnswersFromTrainer(): Observable<SubcoCandidateAnswerModel> {
		return throwError('Not implemented yet');
	}

	public SaveAnswers(data: {
		answerId: string;
		answers: string[];
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public CreateSchedules(data: {
		schedules: SubcoCandidateAnswerModel[];
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public UpdateSchedule(data: {
		answerId: string;
		startDate: Date;
		endDate: Date;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public DeleteSchedule(data: { answerId: string }): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public ExportCurrentGenAnswersToExcel(): Observable<string> {
		return throwError('Not implemented yet');
	}
}
