import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { ClientInterviewReport, TopBottomVote, TrainerTopBottomVote } from '../../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class VoteService {
  private baseUrl = 'Vote.svc/';
	constructor(protected httpClient: HttpClient) {}

	public GetTopBottomVotesForSchedule(scheduleId): Observable<TopBottomVote[]> {
		return of(MockData.GetTopBottomVotesForSchedule).pipe(
			delay(500),
			map((r) => r.map(TopBottomVote.fromJson))
		);
	}

	public GetTrainerTopBottomVotesForSchedule(scheduleId): Observable<TrainerTopBottomVote[]> {
		return of(MockData.GetTrainerTopBottomVotesForSchedule).pipe(
			delay(500),
			map((r) => r.map(TrainerTopBottomVote.fromJson))
		);
	}
}
