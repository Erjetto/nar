import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as NoteStateAction from './note.action';
import * as MainStateAction from '../main/main.action';
import {
	TraineePresentation,
	ClientTraineeAttendanceReport,
	ClientEvaluation,
	ClientTraineeData,
} from '../../models';
import * as _ from 'lodash';
import { filter } from 'lodash';

export interface INoteState {
	evaluations: ClientEvaluation;

	evaluationNoteFilters: {
		evalType: string;
		search: string;
		sort: string;
		asc: string;
	};

	loadingEvaluations: boolean;
}

export const initialState: INoteState = {
	evaluations: null,

	evaluationNoteFilters: {
		evalType: '',
		search: '',
		sort: '',
		asc: '',
	},

	loadingEvaluations: false,
};

export const NOTESTATE_REDUCER_NAME = 'NoteState';

export const NoteStateReducer = createReducer(
	initialState,
	// Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, () => ({
		...initialState,
	})),

	on(NoteStateAction.FetchEvaluation, (state) => ({
		...state,
		loadingEvaluations: true,
	})),

	on(NoteStateAction.FetchEvaluationSuccess, (state, { payload }) => ({
		...state,
		evaluations: payload,
		loadingEvaluations: false,
	})),

	on(NoteStateAction.SetEvaluationNoteFilter, (state, data) => ({
		...state,
		evaluationNoteFilters: data,
	}))
);

export const getNoteState = createFeatureSelector<INoteState>(NOTESTATE_REDUCER_NAME);

export const getNoteStateBy = (fn: (_: INoteState) => any) => createSelector(getNoteState, fn);

export const getEvaluations = getNoteStateBy((s) => s.evaluations);
export const getEvaluationNoteFilters = getNoteStateBy((s) => s.evaluationNoteFilters);
export const isEvaluationsLoading = getNoteStateBy((s) => s.loadingEvaluations);
// export const getAnnouncements = getNoteStateBy((s) => s.announcement);

// export const getCurrentGeneration = getNoteStateBy((s) => s.currentGeneration);
// export const getCurrentRole = getNoteStateBy((s) => s.currentRole);
export const getFilteredEvaluationNotes = createSelector(
	getEvaluations,
	getEvaluationNoteFilters,
	(evaluation: ClientEvaluation, filters : any) => {
    if(_.isEmpty(evaluation?.EvaluationNote)) return [];
		let evals = [...evaluation.EvaluationNote];

		evals = evals.filter(
			(e) => e.evalNoteType.includes(filters.evalType || '') && e.Notes.includes(filters.search)
		);
		switch (filters.sort) {
			case 'Date':
				evals = _.sortBy(evals, 'SavedAt');
				break;
			case 'Author':
				evals = _.sortBy(evals, 'SavedBy');
				break;
			case 'Type':
				evals = _.sortBy(evals, 'evalNoteType');
				break;
		}
		if (!filters.asc) evals = evals.reverse();
		return evals;
	}
);
