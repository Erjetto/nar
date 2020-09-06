import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class FileService {
	private baseUrl = environment.apiUrl + 'File.svc/';
  constructor(protected httpClient: HttpClient) {}
  
}
