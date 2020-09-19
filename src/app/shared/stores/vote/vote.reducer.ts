import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import {
	TopBottomVote,
	TopBottomVoteSchedule,
	VoteItem,
	ClientTrainee,
	TrainerTopBottomVote,
} from '../../models';
import { getBinusianState, getTrainees, getTraineesEntity } from '../binusian/binusian.reducer';
import * as _ from 'lodash';
import * as VoteStateAction from './vote.action';
import * as MainStateAction from '../main/main.action';

export interface IVoteState {
	voteSchedules: TopBottomVoteSchedule[];
	trainerVotes: TrainerTopBottomVote[];
	traineeVotes: TopBottomVote[];

	voteScheduleLoading: boolean;
	voteResultLoading: boolean;

	filterText: string;

	editForm: TopBottomVoteSchedule;
}

export const initialState: IVoteState = {
	voteSchedules: [],
	trainerVotes: [],
	traineeVotes: [],

	voteScheduleLoading: false,
	voteResultLoading: false,

	filterText: '',

	editForm: new TopBottomVoteSchedule(),
};

export const VOTESTATE_REDUCER_NAME = 'VoteState';

export const VoteStateReducer = createReducer(
	initialState,
  // Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, (state) => ({
		...initialState,
	})),

	on(VoteStateAction.FetchTopBottomVoteSchedules, (state) => ({
		...state,
		voteScheduleLoading: true,
	})),

	on(
		VoteStateAction.FetchTopBottomVotesForSchedule,
		VoteStateAction.FetchTrainerTopBottomVotesForSchedule,
		(state) => ({
			...state,
			voteResultLoading: true,
		})
	),

	on(VoteStateAction.FetchTopBottomVoteSchedulesSuccess, (state, { payload }) => ({
		...state,
		voteSchedules: payload,
		voteScheduleLoading: false,
	})),

	on(VoteStateAction.FetchTopBottomVotesForScheduleSuccess, (state, { payload }) => ({
		...state,
		traineeVotes: payload,
		voteResultLoading: false,
	})),

	on(VoteStateAction.FetchTrainerTopBottomVotesForScheduleSuccess, (state, { payload }) => ({
		...state,
		trainerVotes: payload,
		voteResultLoading: false,
	})),

	on(VoteStateAction.SetFilterText, (state, { filterText }) => ({
		...state,
		filterText,
	}))
);

export const getVoteState = createFeatureSelector<IVoteState>(VOTESTATE_REDUCER_NAME);

export const getVoteStateBy = (fn: (_: IVoteState) => any) => createSelector(getVoteState, fn);

export const getVoteSchedules = getVoteStateBy((s) => s.voteSchedules);
export const getTraineeVotes = getVoteStateBy((s) => s.traineeVotes);
export const getTrainerVotes = getVoteStateBy((s) => s.trainerVotes);
export const getFilterText = getVoteStateBy((s) => s.filterText);

export const isVoteResultLoading = getVoteStateBy((s) => s.voteResultLoading);
export const isVoteScheduleLoading = getVoteStateBy((s) => s.voteScheduleLoading);

export const getTrainerVotesFiltered = createSelector(
	getTrainerVotes,
	getFilterText,
	getTraineesEntity,
	(votes: TrainerTopBottomVote[], search: string, trainees: { [id: string]: ClientTrainee }) => {
		search = search.toLowerCase();
		let filteredVotes = _.cloneDeep(votes);

		if (search !== '') {
			filteredVotes = filteredVotes.filter((vote) => {
				if (vote.TrainerName.toLowerCase().indexOf(search) !== -1) return true;

				vote.TopVotes = vote.TopVotes.filter(
					(voteItem) =>
						(voteItem.Reason + ' ' + trainees[voteItem.TraineeId]?.codeAndName)
							.toLowerCase()
							.indexOf(search) !== -1
				);

				vote.BottomVotes = vote.BottomVotes.filter(
					(voteItem) =>
						(voteItem.Reason + ' ' + trainees[voteItem.TraineeId]?.codeAndName)
							.toLowerCase()
							.indexOf(search) !== -1
				);
				return vote.TopVotes.length + vote.BottomVotes.length > 0;
			});
		}
		return filteredVotes;
	}
);

export const getTraineeVotesFiltered = createSelector(
	getTraineeVotes,
	getFilterText,
	getTraineesEntity,
	(votes: TopBottomVote[], search: string, trainees: { [id: string]: ClientTrainee }) => {
		search = search.toLowerCase();
		let filteredVotes = _.cloneDeep(votes);
		if (search !== '') {
			filteredVotes = filteredVotes.filter((vote) => {
				if (trainees[vote.TraineeId]?.codeAndName.toLowerCase().indexOf(search) !== -1) return true;

				vote.TopVotes = vote.TopVotes.filter(
					(voteItem) =>
						(voteItem.Reason + ' ' + trainees[voteItem.TraineeId]?.codeAndName)
							.toLowerCase()
							.indexOf(search) !== -1
				);

				vote.BottomVotes = vote.BottomVotes.filter(
					(voteItem) =>
						(voteItem.Reason + ' ' + trainees[voteItem.TraineeId]?.codeAndName)
							.toLowerCase()
							.indexOf(search) !== -1
				);
				return vote.TopVotes.length + vote.BottomVotes.length > 0;
			});
		}
		return filteredVotes;
	}
);
