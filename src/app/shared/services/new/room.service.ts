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
  
  public GetBookLogDetail(data: { id: string }): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public GetBookLog(data: { start: Date; end: Date }): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public SaveBookLog(data: { data: LogBookPIC }): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public UpdateLogRoom(data: { data: LogRoomPIC; id: string; time: string }): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public GetLogRoom(data: { id: string; time: string }): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public ExportRoomLog(data: { date: Date }): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public RemoveLogPICRoomNote(data: { id: string; date: Date }): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public GetLogPICRoomNote(data: { date: Date }): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public SaveLogPICRoomNote(data: { data: LogRoomPIC }): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public GetAllRooms(): Observable<boolean> {
		return throwError('Not implemented yet');
	}
  
  public GetRoomsTransactionByDate(data: { date: string }): Observable<boolean> {
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
