import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as fromMainState from '../main/main.reducer';
import * as VoteStateAction from './vote.action';
import * as fromVoteState from './vote.reducer';

import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, pluck, tap, share, withLatestFrom, map } from 'rxjs/operators';
import { VoteService } from '../../services/new/vote.service';
import { LeaderService } from '../../services/new/leader.service';
import { IAppState } from 'src/app/app.reducer';
import { Role, User } from '../../models';
import { RoleFlags } from '../../constants/role.constant';

@Injectable({
	providedIn: 'root',
})
export class VoteStateEffects {
	constructor(
		private actions$: Actions,
		private store: Store<IAppState>,
		private voteService: VoteService,
		private leaderService: LeaderService
	) {}

	@Effect()
	getTopBottomVoteSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(VoteStateAction.FetchTopBottomVoteSchedules),
		withLatestFrom(this.store.pipe(select(fromMainState.getCurrentRole))),
		switchMap(([act, role]: [Action, Role]) =>
			this.leaderService.GetTopBottomVoteSchedules({ isTrainer: role.is(RoleFlags.Trainer) })
		),
		mergeMap((res) => of(VoteStateAction.FetchTopBottomVoteSchedulesSuccess({ payload: res }))),
		share()
	);

	@Effect()
	getTopBottomVoteForSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(VoteStateAction.FetchTopBottomVotesForSchedule),
		switchMap((data) =>
			this.voteService
				.GetTopBottomVotesForSchedule(data)
				.pipe(map((res) => ({ scheduleId: data.scheduleId, res })))
		),
		mergeMap(({ scheduleId, res }) =>
			of(VoteStateAction.FetchTopBottomVotesForScheduleSuccess({ payload: res, scheduleId }))
		),
		share()
	);

	@Effect()
	getTrainerTopBottomVoteForSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(VoteStateAction.FetchTrainerTopBottomVotesForSchedule),
		switchMap((data) =>
			this.voteService
				.GetTrainerTopBottomVotesForSchedule(data)
				.pipe(map((res) => ({ scheduleId: data.scheduleId, res })))
		),
		mergeMap(({ scheduleId, res }) =>
			of(VoteStateAction.FetchTrainerTopBottomVotesForScheduleSuccess({ payload: res, scheduleId }))
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
			res === true
				? of(MainStateAction.SuccessfullyMessage('deleted vote schedule'))
				: of(MainStateAction.FailMessage('deleting vote schedule'))
		),
		share()
	);

	@Effect()
	trainerSubmitVote$: Observable<Action> = this.actions$.pipe(
		ofType(VoteStateAction.SubmitTopBottomVote),
		withLatestFrom(
			this.store.pipe(select(fromMainState.getCurrentRole)),
			this.store.pipe(select(fromMainState.getCurrentUser))
		),
		switchMap(([data, role, user]) =>
			role.is(RoleFlags.Trainer)
				? this.voteService.SaveTrainerTopBottomVote({ ...data, trainerName: user.UserName })
				: this.voteService.SaveTopBottomVote({ ...data, traineeId: user.TraineeId })
		),
		mergeMap((res) =>
			res != null
				? of(MainStateAction.SuccessfullyMessage('submitted vote'))
				: of(MainStateAction.FailMessage('submitting vote'))
		),
		share()
	);
}
