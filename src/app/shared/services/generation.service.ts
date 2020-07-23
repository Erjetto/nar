import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClientGeneration } from '../models';

@Injectable({
	providedIn: 'root',
})
export class GenerationService {
  private baseUrl = environment.apiUrl + 'Leader.svc/';
  
  private mockData = [
    new ClientGeneration('asdf', '20-1', '2020', 2020),
    new ClientGeneration('asdf', '20-2', '2020', 2021),
    new ClientGeneration('asdf', '21-1', '2020', 2021),
    new ClientGeneration('asdf', '22-1', '2020', 2021),
  ]

	constructor(protected httpClient: HttpClient) {}
  
	public getCurrentGeneration(): Observable<any> {
    return of(new ClientGeneration('asdf', '22-1', '2020', 2021))
  }
	public getGenerations(): Observable<any> {
    // return this.httpClient.get(this.baseUrl + 'GetGenerations');
    return of(this.mockData)
  }
}
