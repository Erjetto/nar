import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import { SubcoCandidateAnswerModel, SubcoCandidateQuestionModel } from '../../models';
import { FetchQuestions, FetchAnswers, FetchAnswersSuccess, FetchQuestionsSuccess, ViewSchedule } from './candidate.action';

export interface ICandidateState {
	questionModel: SubcoCandidateQuestionModel;
	answerModels: SubcoCandidateAnswerModel[];
	selectedAnswer: SubcoCandidateAnswerModel;

	loadingQuestionsModel: boolean;
	loadingAnswersModel: boolean;
}

export const initialState: ICandidateState = {
	questionModel: null,
	selectedAnswer: null,
	answerModels: [],

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
  
	on(FetchQuestions, (state) => ({ ...state, loadingQuestionsModel: true })),
	on(FetchAnswers, (state) => ({ ...state, loadingAnswersModel: true })),

	on(FetchAnswersSuccess, (state, { payload }) => ({
		...state,
    answerModels: payload,
    loadingAnswersModel: false
	})),

	on(FetchQuestionsSuccess, (state, { payload }) => ({
		...state,
    questionModel: payload,
    loadingQuestionsModel: false
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
export const getSelectedAnswer = getCandidateStateBy((s) => s.selectedAnswer);
export const isLoadingQuestionsModel = getCandidateStateBy((s) => s.loadingQuestionsModel);
export const isLoadingAnswersModel = getCandidateStateBy((s) => s.loadingAnswersModel);
