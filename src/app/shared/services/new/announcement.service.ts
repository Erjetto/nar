import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
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

	public SaveMessageWithFile(data: {
		note: string;
		title: string;
		fileId: string;
		memberType: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public SaveMessage(data: {
		note: string;
		title: string;
		memberType: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public UpdateMessage(data: {
		messageId: string;
		note: string;
		title: string;
		mType: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public DeleteMessage(data: { messageId: string }): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public UpdateMessageWithNoFile(data: {
		messageId: string;
		note: string;
		title: string;
		mType: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public UpdateMessageWithFile(data: {
		messageId: string;
		note: string;
		title: string;
		mType: string;
		fileId: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public GetMessage(): Observable<Message[]> {
		return of(MockData.GetMessage).pipe(
			delay(500),
			map((r) => r.map(Message.fromJson))
		);
	}
}
