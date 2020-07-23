import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
	private baseUrl = environment.apiUrl + 'Leader.svc/';

  constructor(protected httpClient: HttpClient) {}

	public getSubjects(): Observable<any> {
		return this.httpClient.get(this.baseUrl + 'GetSchedules');
	}
}
