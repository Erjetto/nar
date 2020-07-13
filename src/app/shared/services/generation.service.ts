import { Injectable } from '@angular/core';
import { ClientGeneration } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class GenerationService {
	private baseUrl = environment.apiUrl + 'Leader.svc/';

	constructor(protected httpClient: HttpClient) {}

	public getGenerations(): Observable<any> {
		return this.httpClient.get(this.baseUrl + 'GetGenerations');
  }
}
