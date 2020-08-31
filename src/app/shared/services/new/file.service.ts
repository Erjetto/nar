import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class FileService {
	private baseUrl = 'File.svc/';
  constructor(protected httpClient: HttpClient) {}
  
}
