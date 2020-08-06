import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { Message } from '../../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class AnnouncementService {
  private baseUrl = 'Announcement.svc/';
	constructor(protected httpClient: HttpClient) {}

	public GetMessage(): Observable<Message[]> {
		return of(MockData.GetMessage).pipe(
			delay(500),
			map((r) => r.map(Message.fromJson))
		);
	}
}
