import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import {
	ClientInterviewQuestion,
	InterviewQuestionDetail,
	InterviewMaterial,
	ClientInterviewSchedule,
	ClientInterviewReport,
	ClientInterviewResult,
} from '../../models';
import { FetchInterviewQuestions, FetchInterviewQuestionDetails, FetchInterviewSchedules, FetchInterviewSchedulesReport, FetchInterviewMaterials, FetchInterviewQuestionsSuccess, FetchInterviewQuestionDetailsSuccess, FetchInterviewSchedulesSuccess, FetchInterviewSchedulesReportSuccess, FetchInterviewMaterialsSuccess } from './interview.action';

export interface IInterviewState {
	interviewQuestions: ClientInterviewQuestion[];
	interviewQuestionDetails: InterviewQuestionDetail[];
	loadingInterviewQuestions: boolean;
	loadingInterviewQuestionDetails: boolean;

	//#region From modify tab?
	interviewMaterials: InterviewMaterial[];
	interviewSchedules: ClientInterviewSchedule[];
	interviewSchedulesReport: ClientInterviewReport;
	interviewResult: ClientInterviewResult;

	loadingInterviewMaterials: boolean;
	loadingInterviewSchedules: boolean;
  loadingInterviewSchedulesReport: boolean;
	//#endregion
}

export const initialState: IInterviewState = {
	interviewQuestions: [],
	interviewQuestionDetails: [],
	loadingInterviewQuestions: false,
	loadingInterviewQuestionDetails: false,

	interviewMaterials: [],
	interviewSchedules: [],
	interviewSchedulesReport: null,
	interviewResult: null,

	loadingInterviewMaterials: false,
	loadingInterviewSchedules: false,
	loadingInterviewSchedulesReport: false,
};

export const INTERVIEWSTATE_REDUCER_NAME = 'InterviewState';

export const InterviewStateReducer = createReducer(
	initialState,
  // Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, (state) => ({
		...initialState,
	})),

	on(FetchInterviewQuestions, (state) => ({
		...state,
		loadingInterviewQuestions: true,
	})),

	on(FetchInterviewQuestionDetails, (state) => ({
		...state,
		loadingInterviewQuestionDetails: true,
	})),

	on(FetchInterviewSchedules, (state) => ({
		...state,
		loadingInterviewSchedules: true,
	})),

	on(FetchInterviewSchedulesReport, (state) => ({
		...state,
		loadingInterviewSchedulesReport: true,
	})),

	on(FetchInterviewMaterials, (state) => ({
		...state,
		loadingInterviewMaterials: true,
	})),

	on(FetchInterviewQuestionsSuccess, (state, { payload }) => ({
		...state,
		interviewQuestions: payload,
		loadingInterviewQuestions: false,
	})),

	on(FetchInterviewQuestionDetailsSuccess, (state, { payload }) => ({
		...state,
		interviewQuestionDetails: payload,
		loadingInterviewQuestionDetails: false,
	})),

	on(FetchInterviewSchedulesSuccess, (state, { payload }) => ({
		...state,
		interviewSchedules: payload,
		loadingInterviewSchedules: false,
	})),

	on(FetchInterviewSchedulesReportSuccess, (state, { payload }) => ({
		...state,
		interviewSchedulesReport: payload,
		loadingInterviewSchedulesReport: false,
	})),

	on(FetchInterviewMaterialsSuccess, (state, { payload }) => ({
		...state,
		interviewMaterials: payload,
		loadingInterviewMaterials: false,
	}))
);

export const getInterviewState = createFeatureSelector<IInterviewState>(
	INTERVIEWSTATE_REDUCER_NAME
);

export const getInterviewStateBy = (fn: (_: IInterviewState) => any) =>
	createSelector(getInterviewState, fn);

//#region Interview tab
export const getInterviewQuestions = getInterviewStateBy((s) => s.interviewQuestions);
export const getInterviewQuestionDetails = getInterviewStateBy((s) => s.interviewQuestionDetails);
export const isInterviewQuestionsLoading = getInterviewStateBy((s) => s.loadingInterviewQuestions);
export const isInterviewQuestionDetailsLoading = getInterviewStateBy(
	(s) => s.loadingInterviewQuestionDetails
);
//#endregion

//#region Modify tab
export const getInterviewMaterials = getInterviewStateBy((s) => s.interviewMaterials);
export const getInterviewSchedules = getInterviewStateBy((s) => s.interviewSchedules);
export const getInterviewSchedulesReport = getInterviewStateBy((s) => s.interviewSchedulesReport);

export const isInterviewMaterialsLoading = getInterviewStateBy((s) => s.loadingInterviewMaterials);
export const isInterviewSchedulesLoading = getInterviewStateBy((s) => s.loadingInterviewSchedules);
export const isInterviewSchedulesReportLoading = getInterviewStateBy((s) => s.loadingInterviewSchedulesReport);

//#endregion

// export const getSubjectFromEntity = (
// 	subjectsEntity: Observable<{ [phaseId: string]: ClientSubject[] }>,
//   phaseObservable: Observable<ClientPhase>,
//   callbackIfEmpty: () => void
// ) =>
// 	combineLatest([subjectsEntity, phaseObservable]).pipe(
// 		map(([entity, currPhase]) => {
// 			if (!currPhase) return [];
// 			if (!!entity[currPhase.PhaseId]) return entity[currPhase.PhaseId];
// 			else {
//         callbackIfEmpty();
// 				this.store.dispatch(FetchSubjects({ phaseId: currPhase.PhaseId }));
// 				return [];
// 			}
// 		})
// 	);

// export const getScheduleFromEntity = (phaseObservable: Observable<ClientPhase>) =>
// 	combineLatest([this.subjectEntity$, phaseObservable]).pipe(
// 		map(([entity, currPhase]) => {
// 			if (!currPhase) return [];
// 			if (!!entity[currPhase.PhaseId]) return entity[currPhase.PhaseId];
// 			else {
// 				this.store.dispatch(FetchSubjects({ phaseId: currPhase.PhaseId }));
// 				return [];
// 			}
// 		})
// 	);
