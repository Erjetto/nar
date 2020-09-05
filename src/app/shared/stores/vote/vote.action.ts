import { createAction, props } from '@ngrx/store';
import {
	CoreTrainingPresentation,
	ClientVoteBestTrainer,
	TopBottomVoteSchedule,
	TopBottomVote,
	TrainerTopBottomVote,
} from '../../models';

export const FetchTopBottomVoteSchedules = createAction('[VoteState] FetchTopBottomVoteSchedules');

export const FetchTopBottomVotesForSchedule = createAction(
	'[VoteState] FetchTopBottomVotesForSchedule',
	props<{ scheduleId: string }>()
);

export const FetchTrainerTopBottomVotesForSchedule = createAction(
	'[VoteState] FetchTrainerTopBottomVotesForSchedule',
	props<{ scheduleId: string }>()
);

export const FetchTopBottomVoteSchedulesSuccess = createAction(
	'[VoteState] FetchTopBottomVoteSchedulesSuccess',
	props<{ payload: TopBottomVoteSchedule[] }>()
);

export const FetchTopBottomVotesForScheduleSuccess = createAction(
	'[VoteState] FetchTopBottomVotesForScheduleSuccess',
	props<{ payload: TopBottomVote[] }>()
);

export const FetchTrainerTopBottomVotesForScheduleSuccess = createAction(
	'[VoteState] FetchTrainerTopBottomVotesForScheduleSuccess',
	props<{ payload: TrainerTopBottomVote[] }>()
);

export const CreateTopBottomVoteSchedule = createAction(
	'[VoteState] CreateTopBottomVoteSchedule',
	props<{
		isForTrainer: boolean;
		scheduleName: string;
		voteCount: number;
		startDate: Date;
		endDate: Date;
	}>()
);

export const SaveTraineeTopBottomVote = createAction(
	'[VoteState] SaveTraineeTopBottomVote',
	props<{
		scheduleId: string;
		traineeId: string;
		topJson: string;
		bottomJson: string;
	}>()
);

export const SaveTrainerTopBottomVote = createAction(
	'[VoteState] SaveTraineeTopBottomVote',
	props<{
		scheduleId: string;
		trainerName: string;
		topJson: string;
		bottomJson: string;
	}>()
);

export const UpdateTopBottomVoteSchedule = createAction(
	'[VoteState] UpdateTopBottomVoteSchedule',
	props<{
		scheduleId: string;
		isForTrainer: boolean;
		scheduleName: string;
		voteCount: number;
		startDate: Date;
		endDate: Date;
	}>()
);

export const SaveVoteSuccess = createAction('[VoteState] SaveVoteSuccess');
export const SaveVoteScheduleSuccess = createAction('[VoteState] SaveVoteScheduleSuccess');

export const DeleteTopBottomVoteSchedule = createAction(
	'[VoteState] DeleteTopBottomVoteSchedule',
	props<{ scheduleId: string }>()
);

export const SetFilterText = createAction(
	'[VoteState] SetFilterText',
	props<{ filterText: string }>()
);
