import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ClientPhase } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {
  private baseUrl = environment.apiUrl + 'Phase.svc/';
  
  private mockData = [
    new ClientPhase(new Date(), new Date(), 'Desc', 'Id', 'Type'),
    new ClientPhase(new Date(), new Date(), 'Desc1', 'Id2', 'Type2'),
  ]

	constructor(protected httpClient: HttpClient) {}

	public getPhases(): Observable<any> {
		// return this.httpClient.get(this.baseUrl + 'GetStatisticTrainee');
    return of(this.mockData)
	}
}
