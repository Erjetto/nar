import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import { Case, ClientCaseTrainee, ClientCaseTrainer, ClientUploadAnswer } from '../../models';
import {
	FetchCases,
	FetchCasesSuccess,
	FetchCorrectionListBy,
	FetchCorrectionListSuccess,
  FetchCorrectionScoring,
  FetchCorrectionScoringSuccess,
	FetchTraineeCasesBy,
	FetchTraineeCasesSuccess,
} from './case.action';

export interface ICaseState {
	cases: Case[];
	clientCaseTrainers: ClientCaseTrainer[];
	clientCaseTrainees: ClientCaseTrainee;
	answers: ClientUploadAnswer[];

	loadingCases: boolean;
	loadingAnswers: boolean;
}

export const initialState: ICaseState = {
	cases: [],
	clientCaseTrainers: [],
	clientCaseTrainees: null,
	answers: [],

	loadingCases: false,
	loadingAnswers: false,
};

export const CASESTATE_REDUCER_NAME = 'CaseState';

export const CaseStateReducer = createReducer(
	initialState,
	// Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, (state) => ({
		...initialState,
	})),
	on(FetchCases, FetchTraineeCasesBy, FetchCorrectionListBy, (state) => ({
		...state,
		loadingCases: true,
	})),

	on(FetchCasesSuccess, (state, { payload }) => ({
		...state,
		cases: payload,
		loadingCases: false,
	})),

	// on(FetchTraineeCasesBy, (state) => ({ ...state, loadingCases: true })),

	on(FetchTraineeCasesSuccess, (state, { payload }) => ({
		...state,
		clientCaseTrainees: payload,
		loadingCases: false,
	})),

	on(FetchCorrectionListSuccess, (state, { payload }) => ({
		...state,
		clientCaseTrainers: payload,
		loadingCases: false,
  })),
  
	on(FetchCorrectionScoring, (state) => ({
		...state,
		loadingAnswers: true,
	})),
  
	on(FetchCorrectionScoringSuccess, (state, { payload }) => ({
		...state,
    loadingAnswers: false,
    answers: payload
	})),

);

export const getCaseState = createFeatureSelector<ICaseState>(CASESTATE_REDUCER_NAME);

export const getCaseStateBy = (fn: (_: ICaseState) => any) => createSelector(getCaseState, fn);

export const getCases = getCaseStateBy((s) => s.cases);
export const isCasesLoading = getCaseStateBy((s) => s.loadingCases);
export const getClientCaseTrainers = getCaseStateBy((s) => s.clientCaseTrainers);
export const getClientCaseTrainees = getCaseStateBy((s) => s.clientCaseTrainees);

export const getTraineeAnswers = getCaseStateBy((s) => s.answers);
export const isAnswersLoading = getCaseStateBy((s) => s.loadingAnswers);