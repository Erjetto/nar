import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientSubject, ClientPhase } from '../models';
import { delay, mapTo } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class SubjectService {
  private baseUrl = environment.apiUrl + 'General.svc/';
  
  private mockData = [
    new ClientSubject(false, 'Java', null, 'asdf'),
    new ClientSubject(false, 'DB', null, 'fads'),
  ]

	constructor(protected httpClient: HttpClient) {}

	public getSubjects(phaseId: string): Observable<any> {
    return of(this.mockData);
		// return this.httpClient.get(this.baseUrl + 'GetSubjects');
	}
}
