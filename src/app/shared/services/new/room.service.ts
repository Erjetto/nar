import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LogBookPIC, LogRoomPIC } from '../../models';

@Injectable({
	providedIn: 'root',
})
export class RoomService {
	private baseUrl = environment.apiUrl + 'Room.svc/';
	constructor(protected httpClient: HttpClient) {}

  
  public UpdateBookLogDetail(data: { id: string; data: LogBookPIC }): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public GetBookLogDetail(data: { id: string }): Observable<LogBookPIC> {
		return throwError('Not implemented yet');
	}
  
  public GetBookLog(data: { start: Date; end: Date }): Observable<LogBookPIC[]> {
		return throwError('Not implemented yet');
	}
  
  public SaveBookLog(data: { data: LogBookPIC }): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public UpdateLogRoom(data: { data: LogRoomPIC; id: string; time: string }): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public GetLogRoom(data: { id: string; time: string }): Observable<LogRoomPIC> {
		return throwError('Not implemented yet');
	}
  
  public ExportRoomLog(data: { date: Date }): Observable<string> {
		return throwError('Not implemented yet');
	}
  
  public RemoveLogPICRoomNote(data: { id: string; date: Date }): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public GetLogPICRoomNote(data: { date: Date }): Observable<LogRoomPIC[]> {
		return throwError('Not implemented yet');
	}
  
  public SaveLogPICRoomNote(data: { data: LogRoomPIC }): Observable<string> {
		return throwError('Not implemented yet');
	}
  // ClientRoom[]
  public GetAllRooms(): Observable<any[]> {
		return throwError('Not implemented yet');
	}
  // ClientRoomTransaction
  public GetRoomsTransactionByDate(data: { date: string }): Observable<any> {
		return throwError('Not implemented yet');
	}
  
  public SaveRoomTransaction(data: {
		Date: string;
		PIC: string;
		RoomId: string;
		Shift: number;
		Type: string;
		Zoom: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public RemoveRoomTransaction(data: {
		transactionId: string;
		userId: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}
}
