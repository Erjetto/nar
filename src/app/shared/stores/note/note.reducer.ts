import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import {
	TraineePresentation,
	ClientTraineeAttendanceReport,
	ClientEvaluation,
	ClientTraineeData,
	ClientTraineeReputation,
} from '../../models';
import { isEmpty as _isEmpty, sortBy as _sortBy } from 'lodash';
import {
	FetchEvaluation,
	FetchEvaluationSuccess,
	FetchTraineesReputation,
	FetchTraineesReputationSuccess,
	SetEvaluationNoteFilter,
} from './note.action';

export interface INoteState {
	evaluations: ClientEvaluation;

	evaluationNoteFilters: {
		evalType: string;
		search: string;
		sort: string;
		asc: string;
	};

	loadingEvaluations: boolean;

	//#region View Trainee
	traineesReputation: ClientTraineeReputation[];
	loadingViewTrainees: boolean;
	//#endregion
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

	//#region View Trainee
	traineesReputation: [],
	loadingViewTrainees: false,
	//#endregion
};

export const NOTESTATE_REDUCER_NAME = 'NoteState';

export const NoteStateReducer = createReducer(
	initialState,
	// Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, () => ({
		...initialState,
	})),

	on(FetchEvaluation, (state) => ({
		...state,
		loadingEvaluations: true,
	})),

	on(FetchEvaluationSuccess, (state, { payload }) => ({
		...state,
		evaluations: payload,
		loadingEvaluations: false,
	})),

	on(SetEvaluationNoteFilter, (state, data) => ({
		...state,
		evaluationNoteFilters: data,
	})),

	//#region View Trainee
	on(FetchTraineesReputation, (state) => ({
		...state,
		loadingViewTrainees: true,
	})),
	on(FetchTraineesReputationSuccess, (state, { payload }) => ({
		...state,
		traineesReputation: payload,
		loadingViewTrainees: false,
	}))

	//#endregion
);

export const getNoteState = createFeatureSelector<INoteState>(NOTESTATE_REDUCER_NAME);

export const getNoteStateBy = (fn: (_: INoteState) => any) => createSelector(getNoteState, fn);

export const getEvaluations = getNoteStateBy((s) => s.evaluations);
export const getEvaluationNoteFilters = getNoteStateBy((s) => s.evaluationNoteFilters);
export const isEvaluationsLoading = getNoteStateBy((s) => s.loadingEvaluations);
export const getTraineesReputation = getNoteStateBy((s) => s.traineesReputation);

export const getFilteredEvaluationNotes = createSelector(
	getEvaluations,
	getEvaluationNoteFilters,
	(evaluation: ClientEvaluation, filters: any) => {
		if (_isEmpty(evaluation?.EvaluationNote)) return [];
		let evals = [...evaluation.EvaluationNote];

		evals = evals.filter(
			(e) => e.evalNoteType.includes(filters.evalType || '') && e.Notes.includes(filters.search)
		);
		switch (filters.sort) {
			case 'Date':
				evals = _sortBy(evals, 'SavedAt');
				break;
			case 'Author':
				evals = _sortBy(evals, 'SavedBy');
				break;
			case 'Type':
				evals = _sortBy(evals, 'evalNoteType');
				break;
		}
		if (!filters.asc) evals = evals.reverse();
		return evals;
	}
);