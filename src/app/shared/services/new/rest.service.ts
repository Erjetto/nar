import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEmpty as _isEmpty, map as _map } from 'lodash';
import { environment } from 'src/environments/environment';
import { TraineeSchedule } from '../../models';
import { delay, map } from 'rxjs/operators';
import { DateHelper } from '../../utilities/date-helper';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class RESTService {
	private baseUrl = environment.apiUrl + 'REST.svc/';
	constructor(protected httpClient: HttpClient) {}

	/**
	 * Join url segments in order, and cut it if null param is found, ex:
	 * - `[genId, traineeId, date, type]`
	 * - `date` is null
	 * - Result: `genId/traineeId`
	 * @param arr array of url segments
	 * @returns Joined parameter, ex: genId/traineeId/date/type
	 */
	private joinLinkInOrder(arr: string[]) {
		const cutIndex = arr.findIndex((s) => _isEmpty(s));
		if (cutIndex !== -1) arr = arr.splice(0, cutIndex);
		return arr.join('/');
	}

	public FetchTraineeScheduleBy(
		generationId: string = null,
		traineeId: string = null,
		type: string = null,
		date: string = null,
		traineeScheduleId: string = null
	) : Observable<TraineeSchedule[]> {
		const params = this.joinLinkInOrder([generationId, traineeId, type, date, traineeScheduleId]);
		return this.httpClient
			.get(`${this.baseUrl}TraineeSchedule/${params}/`)
			.pipe(map((res: any) => _map(res, TraineeSchedule.fromJson)));
	}

	public CreateTraineeSchedule(data: TraineeSchedule): Observable<boolean> {
		return this.httpClient
			.post(`${this.baseUrl}TraineeSchedule/`, {data:{
				...data,
				AttendanceDate: DateHelper.toCSharpDate(data.AttendanceDate)
			}})
			.pipe(map((res: any) => res === true));
	}

	public DeleteTraineeSchedule(traineeScheduleId: string) : Observable<boolean> {
		return this.httpClient
			.delete(`${this.baseUrl}TraineeSchedule/`)
			.pipe(map((res: any) => res === true));
	}
	
	public UpdateTraineeSchedule(data: TraineeSchedule): Observable<boolean> {
		return this.httpClient
			.put(`${this.baseUrl}TraineeSchedule/`, {data:{
				...data,
				AttendanceDate: DateHelper.toCSharpDate(data.AttendanceDate)
			}})
			.pipe(map((res: any) => res === true));
	}
}
