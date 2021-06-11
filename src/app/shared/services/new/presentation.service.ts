import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
	ClientPhase,
	ClientSubject,
	ClientTrainee,
	CoreTrainingPresentation,
	TraineePresentation,
	CoreTrainingPresentationQuestionSummary,
} from '../../models';
import { environment } from 'src/environments/environment';
import { map as _map } from 'lodash';
import { DateHelper } from '../../utilities/date-helper';

@Injectable({
	providedIn: 'root',
})
export class PresentationService {
	private baseUrl = environment.apiUrl + 'Presentation.svc/';
	constructor(protected httpClient: HttpClient) {}

	public GetCoreTrainingPresentationNo(data: {
		subjectId: string;
		traineeId: string;
	}): Observable<CoreTrainingPresentationQuestionSummary> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateTraineeActive', data)
			.pipe(map((res: any) => CoreTrainingPresentationQuestionSummary.fromJson(res.d)));
	}

	public GetCoreTrainingPresentationQuestionSummary(data: {
		generationId: string;
	}): Observable<CoreTrainingPresentationQuestionSummary> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateTraineeActive', data)
			.pipe(map((res: any) => CoreTrainingPresentationQuestionSummary.fromJson(res.d)));
	}

	public GetSubjectListByPhase(data: { phaseId: string }): Observable<ClientSubject[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetAllCaseBySubject', data)
			.pipe(map((res: any) => _map(res.d, ClientSubject.fromJson)));
	}

	public GetSubjectListByCurrentPhase(data: { phaseId: string }): Observable<ClientSubject[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetAllCaseBySubject', data)
			.pipe(map((res: any) => _map(res.d, ClientSubject.fromJson)));
	}

	public SaveTraineePresentation(data: { data: TraineePresentation }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveTraineePresentation', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteTraineePresentation(data: {
		generationId: string;
		phaseId: string;
		subjectId: string;
		traineeId: string;
		presentationNo: number;
		reason: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteTraineePresentation', data)
			.pipe(map((res: any) => res.d === true));
	}

	// Dictionary<int, List<TraineePresentation>>
	public GetPresentationReportDetailByShift(): Observable<any> {
		return this.httpClient
			.post(this.baseUrl + 'GetPresentationReportDetailByShift', {})
			.pipe(map((res: any) => res.d));
	}

	public GetPresentationReportSummaryWithPhase(data: {
		phaseId: string;
		subjectId: string;
	}): Observable<TraineePresentation[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetPresentationReportSummaryWithPhase', data)
			.pipe(map((res: any) => _map(res.d, TraineePresentation.fromJson)));
	}

	public ExportPresentationReportSummaryForPresentationPhase(): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'ExportPresentationReportSummaryForPresentationPhase', {})
			.pipe(map((res: any) => res.d));
	}

	// Dictionary<string, int>
	public GetTotalCorrectedAnswerByTrainer(data: { generationId: string }): Observable<any> {
		return this.httpClient.post(this.baseUrl + 'GetTotalCorrectedAnswerByTrainer', data);
	}

	public FindCoreTrainingPresentationByGeneration(data: {
		generationId: string;
	}): Observable<CoreTrainingPresentation[]> {
		return this.httpClient
			.post(this.baseUrl + 'FindCoreTrainingPresentationByGeneration', data)
			.pipe(map((res: any) => _map(res.d, CoreTrainingPresentation.fromJson)));
	}

	public FindCoreTrainingPresentationBySubject(data: {
		generationId: string;
		subjectId: string;
	}): Observable<CoreTrainingPresentation[]> {
		return this.httpClient
			.post(this.baseUrl + 'FindCoreTrainingPresentationBySubject', data)
			.pipe(map((res: any) => _map(res.d, CoreTrainingPresentation.fromJson)));
	}

	public FindCoreTrainingPresentationByTrainee(data: {
		generationId: string;
		traineeId: string;
	}): Observable<CoreTrainingPresentation[]> {
		return this.httpClient
			.post(this.baseUrl + 'FindCoreTrainingPresentationByTrainee', data)
			.pipe(map((res: any) => _map(res.d, CoreTrainingPresentation.fromJson)));
	}

	public SaveCoreTrainingPresentation(data: {
		presentation: CoreTrainingPresentation;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveCoreTrainingPresentation', {
				presentation: {
					...data.presentation,
					PresentationDate: DateHelper.toCSharpDate(data.presentation.PresentationDate),
				},
			})
			.pipe(map((res: any) => res.d === true));
	}

	public AddCoreTrainingPresentationQuestion(data: {
		filename: string;
		question: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'AddCoreTrainingPresentationQuestion', data)
			.pipe(map((res: any) => res.d === true));
	}

	public UpdateCoreTrainingPresentationItem(data: {
		filename: string;
		itemId: string;
		text: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateCoreTrainingPresentationItem', data)
			.pipe(map((res: any) => res.d === true));
	}

	public UpdateCoreTrainingPresentationItemStatus(data: {
		filename: string;
		itemId: string;
		status: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateCoreTrainingPresentationItemStatus', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteCoreTrainingPresentationItem(data: {
		filename: string;
		itemId: string;
		note: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteCoreTrainingPresentationItem', data)
			.pipe(map((res: any) => res.d === true));
	}

	public AddCoreTrainingPresentationComment(data: {
		filename: string;
		itemId: string;
		text: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'AddCoreTrainingPresentationComment', data)
			.pipe(map((res: any) => res.d === true));
	}

	public UpdateCoreTrainingPresentationComment(data: {
		filename: string;
		itemId: string;
		commentId: string;
		comment: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateCoreTrainingPresentationComment', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteCoreTrainingPresentationComment(data: {
		filename: string;
		itemId: string;
		commentId: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteCoreTrainingPresentationComment', data)
			.pipe(map((res: any) => res.d === true));
	}

	public AddCoreTrainingPresentationAnswer(data: {
		filename: string;
		questionId: string;
		text: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'AddCoreTrainingPresentationAnswer', data)
			.pipe(map((res: any) => res.d === true));
	}

	public UpdateStatusQuestion(data: {
		filename: string;
		questionId: string;
		status: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateStatusQuestion', data)
			.pipe(map((res: any) => res.d === true));
	}

	public AcceptAnswerCTQuestion(data: {
		filename: string;
		questionId: string;
		answerId: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'AcceptAnswerCTQuestion', data)
			.pipe(map((res: any) => res.d === true));
	}

	public UpdatePresentationComment(data: {
		filename: string;
		newCommentStr: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdatePresentationComment', data)
			.pipe(map((res: any) => res.d === true));
	}

	public GetPresentationReportDetailByDate(data: {
		time: string;
	}): Observable<TraineePresentation[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetPresentationReportDetailByDate', data)
			.pipe(map((res: any) => _map(res.d, TraineePresentation.fromJson)));
	}

	public GetCurrentPhaseWithPresentation(): Observable<ClientPhase> {
		return this.httpClient
			.post(this.baseUrl + 'GetCurrentPhaseWithPresentation', {})
			.pipe(map((res: any) => ClientPhase.fromJson(res.d)));
	}

	public GetPresentationTrainee(): Observable<ClientTrainee[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetPresentationTrainee', {})
			.pipe(map((res: any) => _map(res.d, ClientTrainee.fromJson)));
	}

	public GetTraineePresentationNo(): Observable<number> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineePresentationNo', {})
			.pipe(map((res: any) => Number(res.d)));
	}

	public GetPhaseWithPresentation(): Observable<ClientPhase[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetPhaseWithPresentation', {})
			.pipe(map((res: any) => _map(res.d, ClientPhase.fromJson)));
	}

	public GetPresentationStatus(data: { filename: string }): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'GetPresentationStatus', data)
			.pipe(map((res: any) => res.d + ''));
	}

	public GetPresentationReportSummary(data: {
		subjectId: string;
	}): Observable<TraineePresentation[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetPresentationReportSummary', data)
			.pipe(map((res: any) => _map(res.d, TraineePresentation.fromJson)));
	}

	public GetPresentationReportDetail(data: {
		subjectId: string;
	}): Observable<TraineePresentation[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetPresentationReportDetail', data)
			.pipe(map((res: any) => _map(res.d, TraineePresentation.fromJson)));
	}
}
