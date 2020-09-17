import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as NoteStateAction from './note.action';
import * as MainStateAction from '../main/main.action';
import {
	TraineePresentation,
	ClientTraineeAttendanceReport,
	ClientEvaluation,
	ClientTraineeData,
} from '../../models';

export interface INoteState {
	evaluations: ClientEvaluation;

	loadingEvaluations: boolean;
}

export const initialState: INoteState = {
	evaluations: null,

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
	}))
);

export const getNoteState = createFeatureSelector<INoteState>(NOTESTATE_REDUCER_NAME);

export const getNoteStateBy = (fn: (_: INoteState) => any) => createSelector(getNoteState, fn);

export const getEvaluations = getNoteStateBy((s) => s.evaluations);
// export const getNoteStatus = getNoteStateBy((s) => s.noteStatus);
// export const isNotesLoading = getNoteStateBy((s) => s.loadingNotes);
// export const getAnnouncements = getNoteStateBy((s) => s.announcement);

// export const getCurrentGeneration = getNoteStateBy((s) => s.currentGeneration);
// export const getCurrentRole = getNoteStateBy((s) => s.currentRole);
