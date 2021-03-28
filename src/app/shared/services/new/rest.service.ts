import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEmpty as _isEmpty, map as _map } from 'lodash';
import { environment } from 'src/environments/environment';
import { TraineePresentation, TraineeSchedule } from '../../models';
import { map } from 'rxjs/operators';
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

	//#region TraineeSchedule
	public FetchTraineeScheduleBy(
		generationId?: string,
		traineeId?: string,
		type?: string,
		date?: string,
		traineeScheduleId?: string
	): Observable<TraineeSchedule[]> {
		const params = this.joinLinkInOrder([generationId, traineeId, type, date, traineeScheduleId]);
		return this.httpClient
			.get(`${this.baseUrl}TraineeSchedule/${params}/`)
			.pipe(map((res: any) => _map(res, TraineeSchedule.fromJson)));
	}

	public CreateTraineeSchedule(data: TraineeSchedule): Observable<boolean> {
		return this.httpClient
			.post(`${this.baseUrl}TraineeSchedule/`, {
				data: {
					...data,
					AttendanceDate: DateHelper.toCSharpDate(data.AttendanceDate),
				},
			})
			.pipe(map((res: any) => res === true));
	}

	public DeleteTraineeSchedule(traineeScheduleId: string): Observable<boolean> {
		return this.httpClient
			.post(`${this.baseUrl}TraineeSchedule/Delete`, { traineeScheduleId })
			.pipe(map((res: any) => res === true));
	}

	public UpdateTraineeSchedule(data: TraineeSchedule): Observable<boolean> {
		return this.httpClient
			.post(`${this.baseUrl}TraineeSchedule/`, {
				data: {
					...data,
					AttendanceDate: DateHelper.toCSharpDate(data.AttendanceDate),
				},
			})
			.pipe(map((res: any) => res === true));
	}
	//#endregion

	//#region TraineePresentation
	public FetchTraineePresentationBy(
		generationId?: string,
		phaseId?: string,
		subjectId?: string,
		traineeId?: string,
		presentationNo?: number
	): Observable<TraineePresentation[]> {
		const params = this.joinLinkInOrder([
			generationId,
			phaseId,
			subjectId,
			traineeId,
			presentationNo+'',
		]);
		return this.httpClient
			.get(`${this.baseUrl}TraineePresentation/${params}/`)
			.pipe(map((res: any) => _map(res, TraineePresentation.fromJson)));
	}

	// public CreateTraineePresentation(data: TraineePresentation): Observable<boolean> {
	// 	return this.httpClient
	// 		.post(`${this.baseUrl}TraineePresentation/`, {
	// 			data: {
	// 				...data,
	// 				AttendanceDate: DateHelper.toCSharpDate(data.AttendanceDate),
	// 			},
	// 		})
	// 		.pipe(map((res: any) => res === true));
	// }

	public DeleteTraineePresentation(
		subjectId: string,
		traineeId: string,
		presentationNo: string
	): Observable<boolean> {
		return this.httpClient
			.post(`${this.baseUrl}TraineePresentation/Delete`, { subjectId, traineeId, presentationNo })
			.pipe(map((res: any) => res === true));
	}

	public UpdateTraineePresentation(data: TraineePresentation): Observable<boolean> {
		return this.httpClient
			.put(`${this.baseUrl}TraineePresentation/`, {
				data: {
					...data,
					savedAt: DateHelper.toCSharpDate(data.savedAt),
				},
			})
			.pipe(map((res: any) => res === true));
	}
	//#endregion
}
