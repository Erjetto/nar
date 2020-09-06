import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LogBookPICData } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class LogService {
	private baseUrl = environment.apiUrl + 'Log.svc/';
	constructor(protected httpClient: HttpClient) {}

  public GetTraineeLogBookRecapBaseOnSubject(data: { trainee: string, subject: string }): Observable<LogBookPICData[]> {
		return throwError('Not implemented yet');
	}
  public DeleteLogBookRecap(data: { id: string; }): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  public GetLogBookRecap(): Observable<any> {
		return throwError('Not implemented yet');
	}
}
