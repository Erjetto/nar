import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClientGeneration } from '../models';

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
