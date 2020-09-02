import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as VoteStateAction from './vote.action';
import * as fromVoteState from './vote.reducer';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, pluck, tap } from 'rxjs/operators';
import { isEmpty } from 'lodash';
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
		mergeMap((res) =>
			!isEmpty(res)
				? of(VoteStateAction.FetchTopBottomVoteSchedulesSuccess({ payload: res }))
				: of(MainStateAction.ErrorGetMessage('Top bottom votes schedule'))
		)
  );
  
	@Effect()
	getTopBottomVoteForSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(VoteStateAction.FetchTopBottomVotesForSchedule),
		switchMap((data) => this.voteService.GetTopBottomVotesForSchedule(data)),
		mergeMap((res) =>
			!isEmpty(res)
				? of(VoteStateAction.FetchTopBottomVotesForScheduleSuccess({ payload: res }))
				: of(MainStateAction.ErrorGetMessage('Trainee Top bottom votes'))
		)
	);
  
	@Effect()
	getTrainerTopBottomVoteForSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(VoteStateAction.FetchTrainerTopBottomVotesForSchedule),
		switchMap((data) => this.voteService.GetTrainerTopBottomVotesForSchedule(data)),
		mergeMap((res) =>
			!isEmpty(res)
				? of(VoteStateAction.FetchTrainerTopBottomVotesForScheduleSuccess({ payload: res }))
				: of(MainStateAction.ErrorGetMessage('Trainer Top bottom votes'))
		)
  );

	// @Effect()
	// getPresentationStatus$: Observable<Action> = this.actions$.pipe(
	// 	ofType(PresentationStateAction.FetchPresentationStatus),
	//   switchMap((data) => this.presentationService.GetPresentationStatus(data)),
	// 	mergeMap((res) =>
	// 		!isEmpty(res)
	// 			? of(PresentationStateAction.FetchPresentationStatusSuccess({ payload: res }))
	// 			: of(
	// 					MainStateAction.ToastMessage({
	// 						messageType: 'danger',
	// 						message: 'Failed to get presentations',
	// 					})
	// 			  )
	// 	)
	// );
}
