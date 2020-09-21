import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as PresentationStateAction from './presentation.action';
import * as MainStateAction from '../main/main.action';
import {
	CoreTrainingPresentation,
	ClientEvaluation,
	ClientTraineeAttendanceReport,
	TraineePresentation,
	CoreTrainingPresentationQuestion,
} from '../../models';
import { filter } from 'lodash';
import * as _ from 'lodash';

export interface IPresentationState {
	presentationsEntity: { [subjectId: string]: CoreTrainingPresentation[] };
	questionsBySubjectEntity: { [subjectId: string]: CoreTrainingPresentationQuestion[] };
	questionsByTraineeEntity: { [traineeId: string]: CoreTrainingPresentationQuestion[] };

	presentations: CoreTrainingPresentation[];
	presentationsByDate: TraineePresentation[];

	questionsFilter: any;

	presentationStatus: string;
	loadingPresentations: boolean;
}

export const initialState: IPresentationState = {
	presentationsEntity: {},
	questionsBySubjectEntity: {},
	questionsByTraineeEntity: {},

	presentations: [],
	presentationsByDate: [],

	questionsFilter: { search: '', status: '', subjectId: '' },

	presentationStatus: '',
	loadingPresentations: false,
};

export const PRESENTATIONSTATE_REDUCER_NAME = 'PresentationState';

export const PresentationStateReducer = createReducer(
	initialState,
	// Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, () => ({
		...initialState,
	})),

	on(PresentationStateAction.FetchPresentations, (state) => ({
		...state,
		loadingPresentations: true,
	})),

	on(PresentationStateAction.FetchPresentationsSuccess, (state, { payload }) => ({
		...state,
		loadingPresentations: false,
		presentations: payload,
		presentationsEntity: payload.reduce((acc, curr) => {
			if (!acc[curr.SubjectId]) acc[curr.SubjectId] = [];
			acc[curr.SubjectId] = [...acc[curr.SubjectId], curr];
			return acc;
		}, {...state.presentationsEntity}),
		questionsBySubjectEntity: payload.reduce((acc, curr) => {
			if (!acc[curr.SubjectId]) acc[curr.SubjectId] = [];
			acc[curr.SubjectId] = [...acc[curr.SubjectId], ...curr.Questions];
			return acc;
		}, {...state.questionsBySubjectEntity}),
		questionsByTraineeEntity: payload.reduce((acc, curr) => {
			if (!acc[curr.TraineeId]) acc[curr.TraineeId] = [];
			acc[curr.TraineeId] = [...acc[curr.TraineeId], ...curr.Questions];
			return acc;
		}, {...state.questionsByTraineeEntity}),
	})),

	on(PresentationStateAction.SetQuestionsFilter, (state, data) => ({
		...state,
		questionsFilter: data,
	})),

	on(PresentationStateAction.FetchPresentationStatus, (state) => ({
		...state,
		presentationStatus: 'Loading...',
	})),

	on(PresentationStateAction.FetchPresentationStatusSuccess, (state, { payload }) => ({
		...state,
		presentationStatus: payload,
	})),

	on(PresentationStateAction.FetchPresentationsByDate, (state) => ({
		...state,
		loadingPresentations: true,
	})),

	on(PresentationStateAction.FetchPresentationsByDateSuccess, (state, { payload }) => ({
		...state,
		presentationsByDate: payload,
		loadingPresentations: false,
	}))
);

export const getPresentationState = createFeatureSelector<IPresentationState>(
	PRESENTATIONSTATE_REDUCER_NAME
);

export const getPresentationStateBy = (fn: (_: IPresentationState) => any) =>
	createSelector(getPresentationState, fn);

export const getPresentations = getPresentationStateBy((s) => s.presentations);
export const getPresentationStatus = getPresentationStateBy((s) => s.presentationStatus);
export const getQuestionsBySubject = getPresentationStateBy((s) => s.questionsBySubjectEntity);
export const getQuestionsFilter = getPresentationStateBy((s) => s.questionsFilter);
export const isPresentationsLoading = getPresentationStateBy((s) => s.loadingPresentations);

export const getPresentationsByDate = getPresentationStateBy((s) => s.presentationsByDate);
// export const getCurrentGeneration = getPresentationStateBy((s) => s.currentGeneration);
// export const getCurrentRole = getPresentationStateBy((s) => s.currentRole);

export const getFilteredQuestions = createSelector(
	getQuestionsBySubject,
	getQuestionsFilter,
	(entity, filters) => {
		if (_.isEmpty(filters.subjectId)) return []; // Must have subjectId filter
		let arr: CoreTrainingPresentationQuestion[] = entity[filters.subjectId];
		if (_.isEmpty(arr)) return []; // If not exists yet the return []

		if (!_.isEmpty(filters.status)) arr = arr.filter((q) => q.Status === filters.status);

		if (!_.isEmpty(filters.search))
			arr = arr.filter((q) => q.Question.Text.includes(filters.search));

		return arr;
	}
);
