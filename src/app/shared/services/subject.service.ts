import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class SubjectService {
	private baseUrl = environment.apiUrl + 'Leader.svc/';

	constructor(protected httpClient: HttpClient) {}

	public getGenerations(): Observable<any> {
		return this.httpClient.get(this.baseUrl + 'GetGenerations');
	}
}
