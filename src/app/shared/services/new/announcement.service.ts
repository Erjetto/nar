import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map as _map} from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class AnnouncementService {
	private baseUrl = environment.apiUrl + 'Announcement.svc/';
	constructor(protected httpClient: HttpClient) {}

	public SaveMessageWithFile(data: {
		note: string;
		title: string;
		fileId: string;
		memberType: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveMessageWithFile', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SaveMessage(data: {
		note: string;
		title: string;
		memberType: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveMessage', data)
			.pipe(map((res: any) => res.d === true));
	}

	public UpdateMessage(data: {
		messageId: string;
		note: string;
		title: string;
		mType: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateMessage', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteMessage(data: { messageId: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteMessage', data)
			.pipe(map((res: any) => res.d === true));
	}

	public UpdateMessageWithNoFile(data: {
		messageId: string;
		note: string;
		title: string;
		mType: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateMessageWithNoFile', data)
			.pipe(map((res: any) => res.d === true));
	}

	public UpdateMessageWithFile(data: {
		messageId: string;
		note: string;
		title: string;
		mType: string;
		fileId: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateMessageWithFile', data)
			.pipe(map((res: any) => res.d === true));
	}

	public GetMessage(): Observable<Message[]> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateMessageWithFile', {})
			.pipe(map((res: any) => _map(res.d, Message.fromJson)));
	}
}
