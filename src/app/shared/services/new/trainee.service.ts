import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { ClientInterviewReport, ClientTraineeData } from '../../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class TraineeService {
  private baseUrl = 'Trainee.svc/';
	constructor(protected httpClient: HttpClient) {}

	public GetTrainees(): Observable<ClientTraineeData[]> {
		return of(MockData.GetTrainees).pipe(
			delay(500),
			map((r) => r.map(ClientTraineeData.fromJson))
		);
	}

	public GetTraineeSchedule(binusianNumber): Observable<any> {
		return of(MockData.GetTraineeSchedule).pipe(
			delay(500),
			map((r) => JSON.parse(r))
		);
	}
}
