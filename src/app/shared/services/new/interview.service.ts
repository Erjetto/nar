import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
	ClientInterviewReport,
	ClientInterviewQuestion,
	InterviewQuestionDetail,
	InterviewMaterial,
	ClientInterviewSchedule,
	ClientInterviewResult,
	InterviewResultDetail,
	InterviewTraineeDetail,
} from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map as _map} from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class InterviewService {
	private baseUrl = environment.apiUrl + 'Interview.svc/';
	constructor(protected httpClient: HttpClient) {}

	public GetInterviewSchedules(): Observable<ClientInterviewReport> {
		return this.httpClient
			.post(this.baseUrl + 'GetInterviewSchedules', {})
			.pipe(map((res: any) => ClientInterviewReport.fromJson(res.d)));
	}

	public GetInterviewQuestions(): Observable<ClientInterviewQuestion[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetInterviewQuestions', {})
			.pipe(map((res: any) => _map(res.d, ClientInterviewQuestion.fromJson)));
	}

	public GetInterviewQuestionDetails(data: {
		interviewQuestionId: string;
	}): Observable<InterviewQuestionDetail[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetInterviewQuestionDetails', data)
			.pipe(map((res: any) => _map(res.d, InterviewQuestionDetail.fromJson)));
	}

	public GetInterviewMaterial(data: { phaseId: string }): Observable<InterviewMaterial[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetInterviewMaterial', data)
			.pipe(map((res: any) => _map(res.d, InterviewMaterial.fromJson)));
	}

	public SaveInterviewSchedule(data: {
		interviewQuestionId: string;
		schedules: string[];
	}): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveInterviewSchedule', data)
			.pipe(map((res: any) => _map(res.d, (v) => v + '')));
	}

	public SaveInterviewQuestions(data: {
		questionName: string;
		questions: string[];
	}): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveInterviewQuestions', data)
			.pipe(map((res: any) => _map(res.d, (v) => v + '')));
	}

	public DeleteInterviewQuestion(data: {
		interviewQuestionId: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteInterviewQuestion', data)
			.pipe(map((res: any) => res.d === true));
	}

	public GetInterviewSchedulesForCurrentUser(): Observable<ClientInterviewSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetInterviewSchedulesForCurrentUser', {})
			.pipe(map((res: any) => _map(res.d, ClientInterviewSchedule.fromJson)));
	}

	public GetInterviewSchedulesForTrainee(): Observable<ClientInterviewSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetInterviewSchedulesForTrainee', {})
			.pipe(map((res: any) => _map(res.d, ClientInterviewSchedule.fromJson)));
	}

	public GetInterviewResult(data: {
		interviewScheduleId: string;
	}): Observable<ClientInterviewResult> {
		return this.httpClient
			.post(this.baseUrl + 'GetInterviewResult', data)
			.pipe(map((res: any) => ClientInterviewResult.fromJson(res.d)));
	}

	public SaveInterviewResult(data: {
		interviewScheduleId: string;
		details: InterviewResultDetail[];
		note: string;
		decision: string;
		attnote: string;
		devnote: string;
		summary: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveInterviewResult', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SaveInterviewResultDecision(data: {
		interviewScheduleId: string;
		note: string;
		decision: string;
		attnote: string;
		devnote: string;
		summary: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveInterviewResultDecision', data)
			.pipe(map((res: any) => res.d === true));
	}

	public GetInterviewTraineeDetail(data: {
		traineeId: string;
	}): Observable<InterviewTraineeDetail> {
		return this.httpClient
			.post(this.baseUrl + 'GetInterviewTraineeDetail', data)
			.pipe(map((res: any) => InterviewTraineeDetail.fromJson(res.d)));
	}

	public SaveInterviewMaterial(data: {
		fileId: string;
		materialName: string;
		trainee_Id: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveInterviewMaterial', data)
			.pipe(map((res: any) => res.d === true));
	}

	public MassSaveInterviewMaterial(data: {
		fileIds: string[];
		fileNames: string[];
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'MassSaveInterviewMaterial', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteInterviewMaterial(data: {
		fileid: string;
		materialId: string;
		traineeid: string;
		reason: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteInterviewMaterial', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteInterviewSchedule(data: {
		interviewScheduleId: string;
		note: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteInterviewSchedule', data)
			.pipe(map((res: any) => res.d === true));
	}
}
