import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map as _map } from 'lodash';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ClientRoom, LogBookPIC, LogRoomPIC } from '../../models';
import { DateHelper } from '../../utilities/date-helper';

@Injectable({
	providedIn: 'root',
})
export class RoomService {
	private baseUrl = environment.apiUrl + 'Room.svc/';
	constructor(protected httpClient: HttpClient) {}

	public UpdateBookLogDetail(data: { id: string; data: LogBookPIC }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateBookLogDetail', {
				id: data.id,
				data: data.data.toJson(),
			})
			.pipe(map((res: any) => res.d === true));
	}

	public GetBookLogDetail(data: { id: string }): Observable<LogBookPIC> {
		return this.httpClient
			.post(this.baseUrl + 'GetBookLogDetail', data)
			.pipe(map((res: any) => LogBookPIC.fromJson(res.d)));
	}

	public GetBookLog(data: { start: Date; end: Date }): Observable<LogBookPIC[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetBookLog', {
				start: DateHelper.toCSharpDate(data.start),
				end: DateHelper.toCSharpDate(data.end),
			})
			.pipe(map((res: any) => _map(res.d, LogBookPIC.fromJson)));
	}

	public SaveBookLog(data: { data: LogBookPIC }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveBookLog', { data: data.data.toJson() })
			.pipe(map((res: any) => res.d === true));
	}

	public UpdateLogRoom(data: {
		data: { ComputerSeat; Log; Presentation; Room; UserId };
		id: string;
		time: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateLogRoom', data)
			.pipe(map((res: any) => res.d === true));
	}

	public GetLogRoom(data: { id: string; time: string }): Observable<LogRoomPIC> {
		return this.httpClient
			.post(this.baseUrl + 'GetLogRoom', data)
			.pipe(map((res: any) => LogRoomPIC.fromJson(res.d)));
	}

	public ExportRoomLog(data: { date: Date }): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'ExportRoomLog', {
				date: DateHelper.toCSharpDate(data.date),
			})
			.pipe(map((res: any) => res.d + ''));
	}

	public RemoveLogPICRoomNote(data: { id: string; date: Date }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'RemoveLogPICRoomNote', {
				date: DateHelper.toCSharpDate(data.date),
			})
			.pipe(map((res: any) => res.d === true));
	}

	public GetLogPICRoomNote(data: { date: Date }): Observable<LogRoomPIC[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetLogPICRoomNote', {
				date: DateHelper.toCSharpDate(data.date),
			})
			.pipe(map((res: any) => _map(res.d, LogRoomPIC.fromJson)));
	}

	public SaveLogPICRoomNote(data: {
		data: { ComputerSeat; Log; Presentation; Room; UserId };
	}): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'SaveLogPICRoomNote', data)
			.pipe(map((res: any) => res.d + ''));
	}
	// ClientRoom[]
	public GetAllRooms(): Observable<ClientRoom[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetAllRooms', {})
			.pipe(map((res: any) => _map(res.d, ClientRoom.fromJson)));
	}
	// ClientRoomTransaction
	public GetRoomsTransactionByDate(data: { date: string }): Observable<any> {
		return this.httpClient
			.post(this.baseUrl + 'GetRoomsTransactionByDate', data)
			.pipe(map((res: any) => res.d));
	}

	public SaveRoomTransaction(data: {
		Date: string;
		PIC: string;
		RoomId: string;
		Shift: number;
		Type: string;
		Zoom: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveRoomTransaction', data)
			.pipe(map((res: any) => res.d === true));
	}

	public RemoveRoomTransaction(data: {
		transactionId: string;
		userId: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'RemoveRoomTransaction', data)
			.pipe(map((res: any) => res.d === true));
	}
}
