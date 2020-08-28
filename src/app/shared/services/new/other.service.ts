import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { Message } from '../../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class OtherService {
  
  // For links other than given service
	constructor(protected httpClient: HttpClient) {}

  // TODO: How does upload work?
  public UploadCase(file: File) : Observable<any>{
    return this.httpClient.post('http://nar.binus/Handler/UploadCase.ashx', {})
  }
}
