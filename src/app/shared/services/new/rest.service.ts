import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEmpty as _isEmpty, map as _map } from 'lodash';
import { environment } from 'src/environments/environment';
import { TraineeSchedule } from '../../models';
import { delay, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class RESTService {
	private baseUrl = environment.apiUrl + 'REST.svc/';
	constructor(protected httpClient: HttpClient) {}

	/**
	 * Join url segments in order, while also cutting it if some param is null, ex:
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
	) {
		const params = this.joinLinkInOrder([generationId, traineeId, type, date, traineeScheduleId]);
		return this.httpClient
			.get(`${this.baseUrl}TraineeSchedule/${params}`)
			.pipe(map((res: any) => _map(res.d, TraineeSchedule.fromJson)));
	}
}
