import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClientGeneration, Case, ClientCaseTrainer } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private baseUrl = environment.apiUrl + 'Leader.svc/';
  
  private mockCase = [
    new Case('1','JavaH1', ['RZ8-1'], '1', 'Soal.pdf', new Date(), 'asdf', new Date(), new Date()),
    new Case('2','JavaH2', ['RZ8-2'], '2', 'Soal.pdf', new Date(), 'asdf', new Date(), new Date()),
    new Case('3','JavaH3', ['RZ8-3'], '3', 'Soal.pdf', new Date(), 'asdf', new Date(), new Date()),
  ]
  private mockClientCaseTrainer = [
    new ClientCaseTrainer('3','Soal', ['RZ8-3'], '3', '3', new Date(), new Date(), 'JavaH3', true, 10, 5, new Date()),
    new ClientCaseTrainer('3','Soal', ['RZ8-3'], '3', '3', new Date(), new Date(), 'JavaH3', true, 10, 5, new Date()),
  ]

	constructor(protected httpClient: HttpClient) {}
  
	public getCases(scheduleId: string): Observable<any> {
    // return this.httpClient.get(this.baseUrl + 'GetGenerations');
    return of(this.mockCase)
  }
	public getClientCaseTrainers(): Observable<any> {
    // return this.httpClient.get(this.baseUrl + 'GetGenerations');
    return of(this.mockClientCaseTrainer)
  }
}
