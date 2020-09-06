import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { HttpClient } from '@angular/common/http';
import {
	ClientInterviewReport,
	ClientPhase,
	ClientSubject,
	ClientTrainee,
	CoreTrainingPresentation,
	TraineePresentation,
	CoreTrainingPresentationItem,
	CoreTrainingPresentationQuestionSummary,
} from '../../models';
import { Dictionary } from 'lodash';
import { environment } from 'src/environments/environment';

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
		return throwError('Not implemented yet');
	}

	public GetCoreTrainingPresentationQuestionSummary(data: {
		generationId: string;
	}): Observable<CoreTrainingPresentationQuestionSummary> {
		return throwError('Not implemented yet');
	}

	public GetSubjectListByPhase(data: {
		phaseId: string;
	}): Observable<ClientSubject[]> {
		return throwError('Not implemented yet');
	}

	public GetSubjectListByCurrentPhase(data: {
		phaseId: string;
	}): Observable<ClientSubject[]> {
		return throwError('Not implemented yet');
	}

	public SaveTraineePresentation(data: {
		data: TraineePresentation;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public DeleteTraineePresentation(data: {
		generationId: string;
		phaseId: string;
		subjectId: string;
		traineeId: string;
		presentationNo: number;
		reason: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

  // Dictionary<int, List<TraineePresentation>>
	public GetPresentationReportDetailByShift(): Observable<any> {
		return throwError('Not implemented yet');
  }

	public GetPresentationReportSummaryWithPhase(data: {
		phaseId: string;
		subjectId: string;
	}): Observable<TraineePresentation[]> {
		return throwError('Not implemented yet');
  }

  // Dictionary<string, int> 
	public GetTotalCorrectedAnswerByTrainer(data: {
		generationId: string;
	}): Observable<any> {
		return throwError('Not implemented yet');
  }

	public FindCoreTrainingPresentationByTrainee(data: {
		generationId: string;
		traineeId: string;
	}): Observable<CoreTrainingPresentation[]> {
		return throwError('Not implemented yet');
  }

	public SaveCoreTrainingPresentation(data: {
		presentation: CoreTrainingPresentation;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public AddCoreTrainingPresentationQuestion(data: {
		filename: string;
		question: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public UpdateCoreTrainingPresentationItem(data: {
		filename: string;
		itemId: string;
		text: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public UpdateCoreTrainingPresentationItemStatus(data: {
		filename: string;
		itemId: string;
		status: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public DeleteCoreTrainingPresentationItem(data: {
		filename: string;
		itemId: string;
		note: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public AddCoreTrainingPresentationComment(data: {
		filename: string;
		itemId: string;
		text: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public UpdateCoreTrainingPresentationComment(data: {
		filename: string;
		itemId: string;
		commentId: string;
		comment: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public DeleteCoreTrainingPresentationComment(data: {
		filename: string;
		itemId: string;
		commentId: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public AddCoreTrainingPresentationAnswer(data: {
		filename: string;
		questionId: string;
		text: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public UpdateStatusQuestion(data: {
		filename: string;
		questionId: string;
		status: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public AcceptAnswerCTQuestion(data: {
		filename: string;
		questionId: string;
		answerId: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public UpdatePresentationComment(data: {
		filename: string;
		newCommentStr: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public GetPresentationReportDetailByDate(data: {
		time: string;
	}): Observable<TraineePresentation[]> {
		return throwError('Not implemented yet');
  }

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
		return of(MockData.GetTraineePresentationNo).pipe(delay(500));
	}

	public GetPhaseWithPresentation(): Observable<ClientPhase[]> {
		return of(MockData.GetPhaseWithPresentation).pipe(
			delay(500),
			map((r) => r.map(ClientPhase.fromJson))
		);
	}

	public GetPresentationStatus(data: { filename: string }): Observable<string> {
		return of(MockData.GetPresentationStatus).pipe(delay(500));
	}

	public FindCoreTrainingPresentationByGeneration(data: {
		generationId: string;
	}): Observable<CoreTrainingPresentation[]> {
		return of(MockData.FindCoreTrainingPresentationByGeneration).pipe(
			delay(500),
			map((r) => r.map(CoreTrainingPresentation.fromJson))
		);
	}

	public FindCoreTrainingPresentationBySubject(data: {
		generationId: string;
		subjectId: string;
	}): Observable<CoreTrainingPresentation[]> {
		return of(MockData.FindCoreTrainingPresentationByGeneration).pipe(
			delay(500),
			map((r) => r.map(CoreTrainingPresentation.fromJson))
		);
	}

	public GetPresentationReportSummary(data: {
		subjectId: string;
	}): Observable<TraineePresentation[]> {
		return of(MockData.GetPresentationReportSummary).pipe(
			delay(500),
			map((r) => r.map(TraineePresentation.fromJson))
		);
	}

	public GetPresentationReportDetail(data: {
		subjectId: string;
	}): Observable<TraineePresentation[]> {
		return of(MockData.GetPresentationReportDetail).pipe(
			delay(500),
			map((r) => r.map(TraineePresentation.fromJson))
		);
	}
}
