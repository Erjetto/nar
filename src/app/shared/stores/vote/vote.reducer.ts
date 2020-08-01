import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';

import {
	TopBottomVote,
	TopBottomVoteSchedule,
	VoteItem,
	ClientTrainee,
} from '../../models';
import { getBinusianState, getTrainees } from '../binusian/binusian.reducer';
import { cloneDeep } from 'lodash';

export interface IVoteState {
	voteSchedules: TopBottomVoteSchedule[];
	trainerVotes: TopBottomVote[];
	traineeVotes: TopBottomVote[];

	voteScheduleLoading: boolean;
	voteResultLoading: boolean;

	searchText: string;

	editForm: TopBottomVoteSchedule;
}

export const initialState: IVoteState = {
	voteSchedules: [],
	trainerVotes: [],
	traineeVotes: [],

	voteScheduleLoading: false,
	voteResultLoading: false,

	searchText: '',

	editForm: new TopBottomVoteSchedule(),
};

export const VOTESTATE_REDUCER_NAME = 'VoteState';

export const VoteStateReducer = createReducer(initialState);

export const getVoteState = createFeatureSelector<IVoteState>(
	VOTESTATE_REDUCER_NAME
);

export const getMainStateBy = (fn: (_: IVoteState) => any) =>
	createSelector(getVoteState, fn);

export const getTraineeVotes = getMainStateBy((s) => s.traineeVotes);
export const getSearchText = getMainStateBy((s) => s.traineeVotes);

export const getTraineeVotesFiltered = createSelector(
	getTraineeVotes,
	getSearchText,
	getTrainees,
	(votes: TopBottomVote[], search: string, trainees: ClientTrainee[]) => {
		let filteredVotes = cloneDeep(votes);
		if (search !== '') {
			filteredVotes = filteredVotes.filter((vote) => {
				if (
					trainees
						.find((t) => t.TraineeId === vote.TraineeId)
						.codeAndName.toLowerCase()
						.indexOf(search) !== -1
				)
					return true;

				vote.TopVotes = vote.TopVotes.filter(
					(voteItem) =>
						(voteItem.Reason + ' ' + voteItem.TraineeId)
							.toLowerCase()
							.indexOf(search) !== -1
				);

				vote.BottomVotes = vote.BottomVotes.filter(
					(voteItem) =>
						(voteItem.Reason + ' ' + voteItem.TraineeId)
							.toLowerCase()
							.indexOf(search) !== -1
				);
				return vote.TopVotes.length + vote.BottomVotes.length > 0;
			});
			return filteredVotes;
		}
	}
);
