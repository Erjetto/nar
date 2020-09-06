import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import {
	ClientInterviewReport,
	ClientInterviewQuestion,
	InterviewQuestionDetail,
  InterviewMaterial,
  ClientInterviewSchedule,
} from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class InterviewService {
  private baseUrl = environment.apiUrl + 'Interview.svc/';
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
  
	public GetInterviewQuestionDetails(data: {
		interviewQuestionId: string
  }): Observable<InterviewQuestionDetail[]> {
		return of(MockData.GetInterviewQuestionDetails).pipe(
			delay(500),
			map((r) => r.map(InterviewQuestionDetail.fromJson))
		);
	}
  
	public GetInterviewMaterial(data: {
		phaseId: string
  }): Observable<InterviewMaterial[]> {
		return of(MockData.GetInterviewMaterial).pipe(
			delay(500),
			map((r) => r.map(InterviewMaterial.fromJson))
		);
	}
  
	public SaveInterviewSchedule(data: {
    interviewQuestionId: string;
    schedules: string[]
  }): Observable<string[]> {
    return throwError('Not implemented yet')
		// return of(['']).pipe(
		// 	delay(500),
		// 	map((r) => r.map(InterviewMaterial.fromJson))
		// );
	}
  
	public SaveInterviewQuestions(data: {
    questionName: string;
    questions: string[]
  }): Observable<string[]> {
    return throwError('Not implemented yet')
	}
  
	public GetInterviewSchedulesForCurrentUser(): Observable<ClientInterviewSchedule[]> {
    return throwError('Not implemented yet')
	}
  
	public GetInterviewSchedulesForTrainee(): Observable<ClientInterviewSchedule[]> {
    return throwError('Not implemented yet')
  }
  
	public GetInterviewResult(data: {
    interviewScheduleId: string
  }): Observable<ClientinterviewResult> {
    return throwError('Not implemented yet')
  }
  
  

}
