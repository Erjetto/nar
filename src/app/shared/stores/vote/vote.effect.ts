import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as VoteStateAction from './vote.action';
import * as fromVoteState from './vote.reducer';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, pluck, tap, share } from 'rxjs/operators';
import { VoteService } from '../../services/new/vote.service';
import { LeaderService } from '../../services/new/leader.service';

@Injectable({
	providedIn: 'root',
})
export class VoteStateEffects {
	constructor(
		private actions$: Actions,
		private voteService: VoteService,
		private leaderService: LeaderService
	) {}

	@Effect()
	getTopBottomVoteSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(VoteStateAction.FetchTopBottomVoteSchedules),
		switchMap(() => this.leaderService.GetTopBottomVoteSchedules()),
		mergeMap((res) => of(VoteStateAction.FetchTopBottomVoteSchedulesSuccess({ payload: res }))),
		share()
	);

	@Effect()
	getTopBottomVoteForSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(VoteStateAction.FetchTopBottomVotesForSchedule),
		switchMap((data) => this.voteService.GetTopBottomVotesForSchedule(data)),
		mergeMap((res) => of(VoteStateAction.FetchTopBottomVotesForScheduleSuccess({ payload: res }))),
		share()
	);

	@Effect()
	getTrainerTopBottomVoteForSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(VoteStateAction.FetchTrainerTopBottomVotesForSchedule),
		switchMap((data) => this.voteService.GetTrainerTopBottomVotesForSchedule(data)),
		mergeMap((res) =>
			of(VoteStateAction.FetchTrainerTopBottomVotesForScheduleSuccess({ payload: res }))
		),
		share()
	);

	@Effect()
	createTopBottomVoteSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(VoteStateAction.CreateTopBottomVoteSchedule),
		switchMap((data) => this.leaderService.SaveTopBottomVoteSchedule(data)),
		mergeMap((res) =>
			res != null
				? of(MainStateAction.SuccessfullyMessage('created schedule'))
				: of(MainStateAction.FailMessage('creating schedule'))
		),
		share()
	);

	@Effect()
	updateTopBottomVoteSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(VoteStateAction.UpdateTopBottomVoteSchedule),
		switchMap((data) => this.leaderService.UpdateTopBottomVoteSchedule(data)),
		mergeMap((res) =>
			res != null
				? of(MainStateAction.SuccessfullyMessage('updated schedule'))
				: of(MainStateAction.FailMessage('updating schedule'))
		),
		share()
	);

	@Effect()
	deleteTopBottomVoteSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(VoteStateAction.DeleteTopBottomVoteSchedule),
		switchMap((data) => this.leaderService.DeleteTopBottomVoteSchedule(data)),
		mergeMap((res) =>
			res === false
				? of(MainStateAction.SuccessfullyMessage('deleted schedule'))
				: of(MainStateAction.FailMessage('deleting schedule'))
		),
		share()
	);
}
