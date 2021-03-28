import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import { SubcoCandidateAnswerModel, SubcoCandidateQuestionModel } from '../../models';
import {
	FetchQuestionsForCurrentGen,
	FetchAnswers,
	FetchAnswersSuccess,
	FetchQuestionsSuccess,
	ViewSchedule,
	FetchCurrentUserAnswer,
	FetchTrainerAnswerSuccess,
} from './candidate.action';

export interface ICandidateState {
	questionModel: SubcoCandidateQuestionModel;
	answerModels: SubcoCandidateAnswerModel[];
	selectedAnswer: SubcoCandidateAnswerModel;
	currentUserAnswers: SubcoCandidateAnswerModel[];

	loadingQuestionsModel: boolean;
	loadingAnswersModel: boolean;
}

export const initialState: ICandidateState = {
	questionModel: null,
	answerModels: [],
	selectedAnswer: null,
	currentUserAnswers: null,

	loadingQuestionsModel: false,
	loadingAnswersModel: false,
};

export const CANDIDATE_REDUCER_NAME = 'CandidateState';

export const CandidateStateReducer = createReducer(
	initialState,
	// Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, (state) => ({
		...initialState,
	})),

	on(FetchQuestionsForCurrentGen, (state) => ({ ...state, loadingQuestionsModel: true })),
	on(FetchAnswers, FetchCurrentUserAnswer, (state) => ({ ...state, loadingAnswersModel: true })),

	on(FetchAnswersSuccess, (state, { payload }) => ({
		...state,
		answerModels: payload,
		loadingAnswersModel: false,
	})),

	on(FetchTrainerAnswerSuccess, (state, { payload }) => ({
		...state,
		currentUserAnswers: payload,
		loadingAnswersModel: false,
	})),

	on(FetchQuestionsSuccess, (state, { payload }) => ({
		...state,
		questionModel: payload,
		loadingQuestionsModel: false,
	})),

	on(ViewSchedule, (state, { payload }) => ({
		...state,
		selectedAnswer: payload,
	}))
);

export const getCandidateState = createFeatureSelector<ICandidateState>(CANDIDATE_REDUCER_NAME);

export const getCandidateStateBy = (fn: (_: ICandidateState) => any) =>
	createSelector(getCandidateState, fn);

export const getQuestionModel = getCandidateStateBy((s) => s.questionModel);
export const getAnswerModels = getCandidateStateBy((s) => s.answerModels);
export const getCurrentUserAnswer = getCandidateStateBy((s) => s.currentUserAnswers);
export const getSelectedAnswer = getCandidateStateBy((s) => s.selectedAnswer);
export const isLoadingQuestionsModel = getCandidateStateBy((s) => s.loadingQuestionsModel);
export const isLoadingAnswersModel = getCandidateStateBy((s) => s.loadingAnswersModel);
