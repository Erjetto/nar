import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClientGeneration, ClientStatistic } from '../models';

@Injectable({
	providedIn: 'root',
})
export class HomeService {
  private baseUrl = environment.apiUrl + 'Leader.svc/';
  
  private mockData = [
    new ClientStatistic('Gender', 10, [{Count:7, Description:'Male'}]),
    new ClientStatistic('Information Source', 10, [{Count:7, Description:'Male'}]),
    new ClientStatistic('Information Source', 10, [{Count:7, Description:'Male'}]),
    new ClientStatistic('Information Source', 10, [{Count:7, Description:'Male'}])
  ]

	constructor(protected httpClient: HttpClient) {}

	public getTraineeStatistics(phaseId: string): Observable<any> {
    return of(this.mockData)
		// return this.httpClient.get(this.baseUrl + 'GetStatisticTrainee');
	}
}
