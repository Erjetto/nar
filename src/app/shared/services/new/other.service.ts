import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { Message } from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GetDownloadLinkFromFileId } from '../../methods';

@Injectable({
	providedIn: 'root',
})
export class OtherService {
	public baseUrl = environment.apiUrl;
	// For links other than given service
	constructor(protected httpClient: HttpClient) {}

	public TestRequest(data: {
    link: string; 
    method: 'get' | 'post'; 
    body?: any
  }): Observable<any> {
    switch (data.method) {
      case 'get' : return this.httpClient.get(this.baseUrl + data.link);
      case 'post': return this.httpClient.post(this.baseUrl + data.link, data.body ?? {});
      default: return of(null);
    }    
	}

	public UploadFiles(files: FileList): Observable<any> {
		const formData = new FormData();
		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < files.length; i++) {
			formData.append('X-File-Name', files[i]);
		}

		return this.httpClient.post(this.baseUrl + 'Handler/UploadCase.ashx', formData);
	}

	public DownloadFile(fileId: string): void {
		window.open(GetDownloadLinkFromFileId(fileId));
	}
}
