import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogBookPICData } from '../../models';
import { map as _map} from 'lodash';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService {
	private baseUrl = environment.apiUrl + 'Log.svc/';
	constructor(protected httpClient: HttpClient) {}

  public GetTraineeLogBookRecapBaseOnSubject(data: { trainee: string, subject: string }): Observable<LogBookPICData[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineeLogBookRecapBaseOnSubject', data)
			.pipe(map((res: any) => _map(res.d, LogBookPICData.fromJson)));
	}
  public DeleteLogBookRecap(data: { id: string; }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteLogBookRecap', data)
			.pipe(map((res: any) => res.d === true));
	}
  public GetLogBookRecap(): Observable<any> {
		return this.httpClient
			.post(this.baseUrl + 'GetLogBookRecap', {})
			.pipe(map((res: any) => res.d));
	}
}
