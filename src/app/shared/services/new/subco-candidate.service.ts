import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { SubcoCandidateQuestionModel, SubcoCandidateAnswerModel } from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MockData } from '../../mock-data';
import * as _ from 'lodash';
import { DateHelper } from '../../utilities/date-helper';

@Injectable({
	providedIn: 'root',
})
export class SubcoCandidateService {
	private baseUrl = environment.apiUrl + 'SubcoCandidate.svc/';
	constructor(protected httpClient: HttpClient) {}

	// Offset -2 generation
	public GetQuestionsForTrainerGeneration(): Observable<SubcoCandidateQuestionModel> {
		return this.httpClient
			.post(this.baseUrl + 'GetQuestionsForTrainerGeneration', {})
			.pipe(map((res: any) => SubcoCandidateQuestionModel.fromJson(res.d)));
	}

	public GetQuestionsById(data: { questionId: string }): Observable<SubcoCandidateQuestionModel> {
		return this.httpClient
			.post(this.baseUrl + 'GetQuestionsById', data)
			.pipe(map((res: any) => SubcoCandidateQuestionModel.fromJson(res.d)));
	}

	public SaveQuestionsForTrainer(data: { questions: string[] }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveQuestionsForTrainer', data)
			.pipe(map((res: any) => res.d === true));
	}

	public GetAnswersFromTrainerGeneration(): Observable<SubcoCandidateAnswerModel[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetAnswersFromTrainerGeneration', {})
			.pipe(map((res: any) => _.map(res.d, SubcoCandidateAnswerModel.fromJson)));
	}

	public GetAnswersFromTrainer(): Observable<SubcoCandidateAnswerModel> {
		return this.httpClient
			.post(this.baseUrl + 'GetAnswersFromTrainer', {})
			.pipe(map((res: any) => SubcoCandidateAnswerModel.fromJson(res.d)));
	}

	public SaveAnswers(data: { answerId: string; answers: string[] }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveAnswers', data)
			.pipe(map((res: any) => res.d === true));
	}

	public CreateSchedules(data: { schedules: SubcoCandidateAnswerModel[] }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'CreateSchedules', {
				schedules: _.map(
					data.schedules,
					// Reformat date to old Microsoft format because this backend is oooold
					// TODO: Move this to new interceptor (HandleDateInterceptor)
					({ Id, SubcoCandidateQuestionId, TrainerName, Answers, StartDate, EndDate }) => ({
						Id,
						SubcoCandidateQuestionId,
						TrainerName,
						Answers,
						StartDate: DateHelper.toCSharpDate(StartDate),
						EndDate: DateHelper.toCSharpDate(EndDate),
					})
				),
			})
			.pipe(map((res: any) => res.d === true));
	}

	public UpdateSchedule(data: {
		answerId: string;
		startDate: Date;
		endDate: Date;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateSchedule', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteSchedule(data: { answerId: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteSchedule', data)
			.pipe(map((res: any) => res.d === true));
	}

	public ExportCurrentGenAnswersToExcel(): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'ExportCurrentGenAnswersToExcel', {})
			.pipe(map((res: any) => res.d + ''));
	}
}
