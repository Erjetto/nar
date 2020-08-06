import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { HttpClient } from '@angular/common/http';
import { ClientInterviewReport, ClientTraineeAttendanceReport, ClientEvaluation, TraineePresentation } from '../../models';

@Injectable({
	providedIn: 'root',
})
export class TraineeAttendanceService {
  private baseUrl = 'TraineeAttendance.svc/';
	constructor(protected httpClient: HttpClient) {}
  // Date format: 'yyyy-MM-dd'


	public GetTraineeAttendances(date): Observable<ClientTraineeAttendanceReport> {
		return of(MockData.GetTraineeAttendances).pipe(
			delay(500),
			map((r) => ClientTraineeAttendanceReport.fromJson(r))
		);
	}

	public GetEvaluation(sdate): Observable<ClientEvaluation> {
		return of(MockData.GetEvaluation).pipe(
			delay(500),
			map((r) => ClientEvaluation.fromJson(r))
		);
	}

	public GetPresentationReportDetailByDate(time): Observable<TraineePresentation[]> {
		return of(MockData.GetPresentationReportDetailByDate).pipe(
			delay(500),
			map((r) => r.map(TraineePresentation.fromJson))
		);
	}

	public getIPWhiteList(time): Observable<string[]> {
		return of(MockData.getIPWhiteList).pipe(
			delay(500),
		);
	}
}
