import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { Message } from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class OtherService {
  public baseUrl = environment.apiUrl;
  // For links other than given service
	constructor(protected httpClient: HttpClient) {}

  // TODO: How does upload work?
  public UploadCase(files: FileList) : Observable<any>{
    // return of(true);
    const formData = new FormData();
    
    return this.httpClient.post(this.baseUrl + 'Handler/UploadCase.ashx', {})
  }
}
