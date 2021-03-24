import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
	TopBottomVote,
	TrainerTopBottomVote,
	ClientVoteBestTrainerSchedule,
	ClientVoteBestTrainer,
} from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map as _map} from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class VoteService {
	private baseUrl = environment.apiUrl + 'Vote.svc/';
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
		return this.httpClient
			.post(this.baseUrl + 'SaveVoteBestTrainerSchedule', data)
			.pipe(map((res: any) => res.d === true));
	}

	public GetVoteBestTrainerSchedule(): Observable<ClientVoteBestTrainerSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetVoteBestTrainerSchedule', {})
			.pipe(map((res: any) => _map(res.d, ClientVoteBestTrainerSchedule.fromJson)));
	}

	public GetVoteSchedule(): Observable<ClientVoteBestTrainer[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetVoteSchedule', {})
			.pipe(map((res: any) => _map(res.d, ClientVoteBestTrainer.fromJson)));
	}

	public GetVoteBestTrainer(data: {
		voteBestTrainerScheduleId: string;
	}): Observable<ClientVoteBestTrainer[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetVoteBestTrainer', data)
			.pipe(map((res: any) => _map(res.d, ClientVoteBestTrainer.fromJson)));
	}

	public UpdateVoteBestTrainerSchedule(data: {
		generationId: string;
		voteBestTrainerScheduleId: string;
		voteName: string;
		description: string;
		quota: number;
		voteType: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateVoteBestTrainerSchedule', data)
			.pipe(map((res: any) => res.d === true));
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
		return this.httpClient
			.post(this.baseUrl + 'GetVoteBestTrainerScheduleForCurrentUser', data)
			.pipe(map((res: any) => _map(res.d, ClientVoteBestTrainerSchedule.fromJson)));
	}

	public SaveVote(data: {
		voteBestTrainerScheduleId: string;
		binusians: string[];
	}): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'SaveVote', data)
			.pipe(map((res: any) => res.d + ''));
	}

	// ClientGeneralVoteSchedule[]
	public GetGeneralVoteScheduleForCurrentUser(): Observable<any> {
		return this.httpClient
			.post(this.baseUrl + 'GetGeneralVoteScheduleForCurrentUser', {})
			.pipe(map((res: any) => res.d));
	}

	// ClientGeneralVoteSchedule
	public GetGeneralVoteScheduleForCurrentUserCount(): Observable<number> {
		return this.httpClient
			.post(this.baseUrl + 'GetGeneralVoteScheduleForCurrentUserCount', {})
			.pipe(map((res: any) => res.d));
	}

	// ClientVoteOption[]
	public GetGeneralVote(): Observable<any> {
		return this.httpClient
			.post(this.baseUrl + 'GetGeneralVote', {})
			.pipe(map((res: any) => res.d));
	}

	// ClientGeneralVoteSchedule[]
	public GetGeneralVoteSchedule(): Observable<any> {
		return this.httpClient
			.post(this.baseUrl + 'GetGeneralVoteSchedule', {})
			.pipe(map((res: any) => res.d));
	}

	public SaveGeneralVote(data: {
		generalVoteScheduleId: string;
		options: string[];
	}): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'SaveGeneralVote', data)
			.pipe(map((res: any) => res.d + ''));
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
		return this.httpClient
			.post(this.baseUrl + 'SaveGeneralVoteSchedule', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SaveTopBottomVote(data: {
		scheduleId: string;
		traineeId: string;
		topJson: string;
		bottomJson: string;
	}): Observable<TopBottomVote> {
		return this.httpClient
			.post(this.baseUrl + 'SaveTopBottomVote', data)
			.pipe(map((res: any) => TopBottomVote.fromJson(res.d)));
	}

	public SaveTrainerTopBottomVote(data: {
		scheduleId: string;
		trainerName: string;
		topJson: string;
		bottomJson: string;
	}): Observable<TrainerTopBottomVote> {
		return this.httpClient
			.post(this.baseUrl + 'SaveTrainerTopBottomVote', data)
			.pipe(map((res: any) => TrainerTopBottomVote.fromJson(res.d)));
	}

	public GetTopBottomVotesForSchedule(data: { scheduleId: string }): Observable<TopBottomVote[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTopBottomVotesForSchedule', data)
			.pipe(map((res: any) => _map(res.d, TopBottomVote.fromJson)));
	}

	public GetTrainerTopBottomVotesForSchedule(data: {
		scheduleId: string;
	}): Observable<TrainerTopBottomVote[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTrainerTopBottomVotesForSchedule', data)
			.pipe(map((res: any) => _map(res.d, TrainerTopBottomVote.fromJson)));
	}
}
