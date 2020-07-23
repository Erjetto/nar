import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';

import * as CaseStateAction from './case.action';
import { Case, ClientCaseTrainer } from '../../models';

export interface ICaseState {
	cases: Case[];
	clientCaseTrainers: ClientCaseTrainer[];
	// answers: ClientSchedule[];

	loadingCases: boolean;
}

export const initialState: ICaseState = {
	cases: [],
	clientCaseTrainers: [],
	// answers: [],

	loadingCases: false,
};

export const CASESTATE_REDUCER_NAME = 'CaseState';

export const CaseStateReducer = createReducer(
	initialState,
	on(CaseStateAction.FetchCases, (state) => ({ ...state, loadingCases: true })),

	on(CaseStateAction.FetchCasesSuccess, (state, { payload }) => ({
		...state,
		cases: payload,
		loadingCases: false,
	}))
);

export const getCaseState = createFeatureSelector<ICaseState>(
	CASESTATE_REDUCER_NAME
);

export const getCaseStateBy = (fn: (_: ICaseState) => any) =>
	createSelector(getCaseState, fn);

export const getCases = getCaseStateBy((s) => s.cases);
export const getClientCaseTrainers = getCaseStateBy(
	(s) => s.clientCaseTrainers
);
