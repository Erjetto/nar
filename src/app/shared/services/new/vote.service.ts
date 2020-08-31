import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import {
	ClientInterviewReport,
	TopBottomVote,
	TrainerTopBottomVote,
  ClientVoteBestTrainerSchedule,
  ClientVoteBestTrainer,
} from '../../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class VoteService {
	private baseUrl = 'Vote.svc/';
	constructor(protected httpClient: HttpClient) {}

	public SaveVoteBestTrainerSchedule(data: {
		voteName: string;
		start: string;
		end: string;
		candidates: string[];
		quota: number;
		description: string;
    voteType: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public GetVoteBestTrainerSchedule(): Observable<ClientVoteBestTrainerSchedule[]> {
		return throwError('Not implemented yet');
	}

	public GetVoteSchedule(): Observable<ClientVoteBestTrainer[]> {
		return throwError('Not implemented yet');
	}
  
	public GetVoteBestTrainer(data: {
		voteBestTrainerScheduleId: string;
	}): Observable<ClientVoteBestTrainer[]> {
		return throwError('Not implemented yet');
	}

	public UpdateVoteBestTrainerSchedule(data: {
		generationId: string;
		voteBestTrainerScheduleId: string;
		voteName: string;
		description: string;
		quota: number;
		voteType: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

  // ClientVoteBestTrainerSchedule[]
	public GetVoteBestTrainerScheduleForCurrentUser(data: {
		generationId: string;
		voteBestTrainerScheduleId: string;
		voteName: string;
		description: string;
		quota: number;
		voteType: string;
	}): Observable<ClientVoteBestTrainerSchedule[]> {
		return throwError('Not implemented yet');
	}

	public SaveVote(data: {
		voteBestTrainerScheduleId: string;
		binusians: string[];
	}): Observable<string> {
		return throwError('Not implemented yet');
	}

  // ClientGeneralVoteSchedule[]
	public GetGeneralVoteScheduleForCurrentUser(): Observable<any> {
		return throwError('Not implemented yet');
	}

  // ClientGeneralVoteSchedule
	public GetGeneralVoteScheduleForCurrentUserCount(): Observable<number> {
		return throwError('Not implemented yet');
	}

  // ClientVoteOption[]
	public GetGeneralVote(data: {
		generalVoteScheduleId: string;
	}): Observable<any> {
		return throwError('Not implemented yet');
	}

  // ClientGeneralVoteSchedule[]
	public GetGeneralVoteSchedule(): Observable<any> {
		return throwError('Not implemented yet');
	}

	public SaveGeneralVote(data: {
		generalVoteScheduleId: string;
		options: string[];
	}): Observable<string> {
		return throwError('Not implemented yet');
	}

	public SaveGeneralVoteSchedule(data: {
		voteName: string;
		start: string;
		end: string;
		options: string[];
		quota: number;
		description: string;
		participant: string;
		voteType: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public SaveTopBottomVote(data: {
		scheduleId: string;
		traineeId: string;
		topJson: string;
		bottomJson: string;
	}): Observable<TopBottomVote> {
		return throwError('Not implemented yet');
	}

	public SaveTrainerTopBottomVote(data: {
		scheduleId: string;
		trainerName: string;
		topJson: string;
		bottomJson: string;
	}): Observable<TrainerTopBottomVote> {
		return throwError('Not implemented yet');
	}

	public GetTopBottomVotesForSchedule(data: {
		scheduleId: string;
	}): Observable<TopBottomVote[]> {
		return of(MockData.GetTopBottomVotesForSchedule).pipe(
			delay(500),
			map((r) => r.map(TopBottomVote.fromJson))
		);
	}

	public GetTrainerTopBottomVotesForSchedule(data: {
		scheduleId: string;
	}): Observable<TrainerTopBottomVote[]> {
		return of(MockData.GetTrainerTopBottomVotesForSchedule).pipe(
			delay(500),
			map((r) => r.map(TrainerTopBottomVote.fromJson))
		);
	}
}
