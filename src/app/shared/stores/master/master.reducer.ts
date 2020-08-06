import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';

import * as MasterStateAction from './master.action';
import {
	Role,
	ClientGeneration,
	ClientPhase,
	ClientSubject,
	ClientSchedule,
	ClientInterviewQuestion,
	InterviewQuestionDetail,
	ClientUserInRoles,
	ClientTrainee,
} from '../../models';

export interface IMasterState {
	roles: Role[];
  userInRoles: ClientUserInRoles[];
  
	generations: ClientGeneration[];
  subjects: ClientSubject[];
  
	phases: ClientPhase[];
  traineeInPhase: ClientTrainee[];
  
  schedules: ClientSchedule[];
  traineeInSchedule: ClientTrainee[];
  
	interviewQuestion: ClientInterviewQuestion[];
	interviewQuestionDetails: InterviewQuestionDetail[];

	ipList: string[];

	loadingRoles: boolean;
	loadingUserInRoles: boolean;
	loadingGenerations: boolean;
	loadingSubjects: boolean;
	loadingPhases: boolean;
	loadingTraineeInPhase: boolean;
	loadingSchedules: boolean;
	loadingTraineeInSchedule: boolean;
	loadingInterviewQuestion: boolean;
	loadingInterviewQuestionDetails: boolean;
}

export const initialState: IMasterState = {
	roles: [],
	userInRoles: [],

	generations: [],
	subjects: [],

	phases: [],
	traineeInPhase: [],

	schedules: [],
	traineeInSchedule: [],

	interviewQuestion: [],
	interviewQuestionDetails: [],

	ipList: [],

	loadingRoles: false,
	loadingUserInRoles: false,
	loadingGenerations: false,
	loadingSubjects: false,
	loadingPhases: false,
	loadingTraineeInPhase: false,
	loadingSchedules: false,
	loadingTraineeInSchedule: false,
	loadingInterviewQuestion: false,
	loadingInterviewQuestionDetails: false,
};

export const MASTERSTATE_REDUCER_NAME = 'MasterState';

export const MasterStateReducer = createReducer(
	initialState,

	on(MasterStateAction.FetchRoles, (state) => ({
		...state,
		loadingRoles: true,
	})),

	on(MasterStateAction.FetchUserInRoles, (state) => ({
		...state,
		loadingUserInRoles: true,
	})),

	on(MasterStateAction.FetchGenerations, (state) => ({
		...state,
		loadingGenerations: true,
	})),

	on(MasterStateAction.FetchPhases, (state) => ({
		...state,
		loadingPhases: true,
	})),

	on(MasterStateAction.FetchTraineeInPhase, (state) => ({
		...state,
		loadingTraineeInFetchTraineeInPhase: true,
	})),

	on(MasterStateAction.FetchSubjects, (state) => ({
		...state,
		loadingSubjects: true,
	})),

	on(MasterStateAction.FetchSchedules, (state) => ({
		...state,
		loadingSchedules: true,
	})),

	on(MasterStateAction.FetchTraineeInSchedule, (state) => ({
		...state,
		loadingTraineeInSchedule: true,
	})),

	on(MasterStateAction.FetchInterviewQuestions, (state) => ({
		...state,
		loadingInterviewQuestions: true,
	})),

	on(MasterStateAction.FetchInterviewQuestionDetails, (state) => ({
		...state,
		loadingInterviewQuestionDetails: true,
	})),

	on(MasterStateAction.FetchInterviewSchedules, (state) => ({
		...state,
		loadingInterviewSchedules: true,
	})),

	on(MasterStateAction.FetchRolesSuccess, (state, { payload }) => ({
		...state,
		roles: payload,
	})),

	on(MasterStateAction.FetchUserInRolesSuccess, (state, { payload }) => ({
		...state,
		userInRoles: payload,
	})),

	on(MasterStateAction.FetchGenerationsSuccess, (state, { payload }) => ({
		...state,
		generations: payload,
	})),

	on(MasterStateAction.FetchPhasesSuccess, (state, { payload }) => ({
		...state,
		phases: payload,
		loadingPhases: false,
	})),

	on(MasterStateAction.FetchTraineeInPhaseSuccess, (state, { payload }) => ({
		...state,
		traineeInPhases: payload,
		loadingTraineeInPhases: false,
	})),

	on(MasterStateAction.FetchSubjectsSuccess, (state, { payload }) => ({
		...state,
		subjects: payload,
		loadingSubjects: false,
	})),

	on(MasterStateAction.FetchSchedulesSuccess, (state, { payload }) => ({
		...state,
		schedules: payload,
		loadingSchedules: false,
	})),

	on(MasterStateAction.FetchTraineeInScheduleSuccess, (state, { payload }) => ({
		...state,
		traineeInSchedule: payload,
		loadingTraineeInSchedule: false,
	})),

	on(MasterStateAction.FetchInterviewQuestionsSuccess, (state, { payload }) => ({
		...state,
		interviewQuestions: payload,
		loadingInterviewQuestion: false,
	})),

	on(MasterStateAction.FetchInterviewQuestionDetailsSuccess, (state, { payload }) => ({
		...state,
		interviewQuestionDetails: payload,
		loadingInterviewQuestionDetails: false,
	})),

	on(MasterStateAction.FetchInterviewSchedulesSuccess, (state, { payload }) => ({
		...state,
		InterviewSchedules: payload,
		loadingInterviewSchedules: false,
	})),

);

export const getMasterState = createFeatureSelector<IMasterState>(
	MASTERSTATE_REDUCER_NAME
);

export const getMasterStateBy = (fn: (_: IMasterState) => any) =>
	createSelector(getMasterState, fn);

export const getRoles = getMasterStateBy((s) => s.roles);
export const getUserInRoles = getMasterStateBy((s) => s.userInRoles);
export const getGenerations = getMasterStateBy((s) => s.generations);
export const getSubjects = getMasterStateBy((s) => s.subjects);
export const getPhases = getMasterStateBy((s) => s.phases);
export const getTraineeInPhase = getMasterStateBy((s) => s.traineeInPhase);
export const getSchedules = getMasterStateBy((s) => s.schedules);
export const getTraineeInSchedule = getMasterStateBy((s) => s.traineeInSchedule);
export const getInterviewQuestion = getMasterStateBy((s) => s.interviewQuestion);
export const getInterviewQuestionDetails = getMasterStateBy((s) => s.interviewQuestionDetails);
export const getIpList = getMasterStateBy((s) => s.ipList);

export const isRolesLoading = getMasterStateBy((s) => s.loadingRoles);
export const isUserInRolesLoading = getMasterStateBy((s) => s.loadingUserInRoles);
export const isGenerationsLoading = getMasterStateBy((s) => s.loadingGenerations);
export const isSubjectsLoading = getMasterStateBy((s) => s.loadingSubjects);
export const isPhasesLoading = getMasterStateBy((s) => s.loadingPhases);
export const isTraineeInPhaseLoading = getMasterStateBy((s) => s.loadingTraineeInPhase);
export const isSchedulesLoading = getMasterStateBy((s) => s.loadingSchedules);
export const isTraineeInScheduleLoading = getMasterStateBy((s) => s.loadingTraineeInSchedule);
export const isInterviewQuestionLoading = getMasterStateBy((s) => s.loadingInterviewQuestion);
export const isInterviewQuestionDetailsLoading = getMasterStateBy((s) => s.loadingInterviewQuestionDetails);

