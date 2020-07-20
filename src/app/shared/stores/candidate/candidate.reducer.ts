import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';

import * as CandidateStateAction from './candidate.action';
import {
	SubcoCandidateAnswerModel,
	SubcoCandidateQuestionModel,
} from '../../models';

export interface ICandidateState {
	questionModel: SubcoCandidateQuestionModel;
	answerModels: SubcoCandidateAnswerModel[];
  loading: boolean;
  selectedAnswer: SubcoCandidateAnswerModel;
}

export const initialState: ICandidateState = {
  questionModel: null,
  selectedAnswer: null,
	answerModels: [],
	loading: false,
};

export const CANDIDATE_REDUCER_NAME = 'CandidateState';

export const CandidateStateReducer = createReducer(
	initialState,
	on(
		CandidateStateAction.FetchAnswers,
		CandidateStateAction.FetchQuestions,
    state => ({...state, loading: true})),
    
  on(CandidateStateAction.FetchAnswersSuccess,
    (state, {payload}) => ({...state, answerModels: payload})),
  
  on(CandidateStateAction.FetchQuestionsSuccess,
    (state, {payload}) => ({...state, questionModel: payload})),

  on(CandidateStateAction.ViewSchedule,
    (state, {payload}) => ({...state, selectedAnswer: payload}))
);

export const getCandidateState = createFeatureSelector<ICandidateState>(
	CANDIDATE_REDUCER_NAME
);

export const getCandidateStateBy = (fn: (_: ICandidateState) => any) =>
	createSelector(getCandidateState, fn);

// export const getCurrentGeneration = getCandidateStateBy(s => s.currentGeneration);
// export const getCurrentRole = getCandidateStateBy(s => s.currentRole);
// export const getGenerations = getCandidateStateBy(s => s.generations);
// export const getRoles = getCandidateStateBy(s => s.roles);

export const getQuestionModel = getCandidateStateBy(s => s.questionModel);
export const getAnswerModels = getCandidateStateBy(s => s.answerModels);
export const getSelectedAnswer = getCandidateStateBy(s => s.selectedAnswer);
export const getLoading = getCandidateStateBy(s => s.loading);