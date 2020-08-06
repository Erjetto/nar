import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import {
	ClientInterviewReport,
	ClientInterviewQuestion,
	InterviewQuestionDetail,
} from '../../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class InterviewService {
  private baseUrl = 'Interview.svc/';
	constructor(protected httpClient: HttpClient) {}

	public GetInterviewSchedules(): Observable<ClientInterviewReport> {
		return of(MockData.GetInterviewSchedules).pipe(
			delay(500),
			map((r) => ClientInterviewReport.fromJson(r))
		);
	}
	public GetInterviewQuestions(): Observable<ClientInterviewQuestion[]> {
		return of(MockData.GetInterviewQuestions).pipe(
			delay(500),
			map((r) => r.map(ClientInterviewQuestion.fromJson))
		);
	}
	public GetInterviewQuestionDetails(
		interviewQuestionId: string
	): Observable<InterviewQuestionDetail[]> {
		return of(MockData.GetInterviewQuestionDetails).pipe(
			delay(500),
			map((r) => r.map(InterviewQuestionDetail.fromJson))
		);
	}
}
