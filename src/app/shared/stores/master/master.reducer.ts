import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

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

	traineesInScheduleEntity: { [scheduleId: string]: ClientTrainee[] };
	traineesInPhaseEntity: { [phaseId: string]: ClientTrainee[] };
	subjectsByPhaseEntity: { [phaseId: string]: ClientSubject[] };
	schedulesBySubjectEntity: { [subjectId: string]: ClientSchedule[] };

	generations: ClientGeneration[];
	subjects: ClientSubject[];

	phaseTypes: any[];
	phases: ClientPhase[];
	traineeInPhase: ClientTrainee[];

	schedules: ClientSchedule[];
	traineeInSchedule: ClientTrainee[];

	interviewQuestions: ClientInterviewQuestion[];
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
	loadingInterviewQuestions: boolean;
	loadingInterviewQuestionDetails: boolean;
}

export const initialState: IMasterState = {
	roles: [],
	userInRoles: [],

	traineesInScheduleEntity: {},
	traineesInPhaseEntity: {},
	subjectsByPhaseEntity: {},
	schedulesBySubjectEntity: {},

	generations: [],
	subjects: [],

	phaseTypes: [
		{ key: 'ar', val: 'Assistant Recruitment' },
		{ key: 'other', val: 'Other' },
	],
	phases: [],
	traineeInPhase: [],

	schedules: [],
	traineeInSchedule: [],

	interviewQuestions: [],
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
	loadingInterviewQuestions: false,
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
		loadingTraineeInPhase: true,
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
    loadingRoles: false,
	})),

	on(MasterStateAction.FetchUserInRolesSuccess, (state, { payload }) => ({
		...state,
    userInRoles: payload,
    loadingUserInRoles: false,
	})),

	on(MasterStateAction.FetchGenerationsSuccess, (state, { payload }) => ({
		...state,
    generations: payload,
    loadingGenerations: false,
	})),

	on(MasterStateAction.FetchPhasesSuccess, (state, { payload }) => ({
		...state,
		phases: payload,
		loadingPhases: false,
	})),

	on(MasterStateAction.FetchTraineeInPhaseSuccess, (state, { payload, phaseId }) => ({
		...state,
		traineeInPhase: payload,
		loadingTraineeInPhase: false,
		traineesInPhaseEntity: { ...state.traineesInPhaseEntity, [phaseId]: payload },
	})),

	on(MasterStateAction.FetchSubjectsSuccess, (state, { payload, phaseId }) => ({
		...state,
		subjects: payload,
		loadingSubjects: false,
		subjectsByPhaseEntity: { ...state.subjectsByPhaseEntity, [phaseId]: payload },
	})),

	on(MasterStateAction.FetchSchedulesSuccess, (state, { payload, subjectId }) => ({
		...state,
		schedules: payload,
		loadingSchedules: false,
		schedulesBySubjectEntity: { ...state.schedulesBySubjectEntity, [subjectId]: payload },
	})),

	on(MasterStateAction.FetchTraineeInScheduleSuccess, (state, { payload, scheduleId }) => ({
		...state,
		traineeInSchedule: payload,
		loadingTraineeInSchedule: false,
		traineesInScheduleEntity: { ...state.traineesInScheduleEntity, [scheduleId]: payload },
	})),

	on(MasterStateAction.FetchInterviewQuestionsSuccess, (state, { payload }) => ({
		...state,
		interviewQuestions: payload,
		loadingInterviewQuestions: false,
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
	}))
);

export const getMasterState = createFeatureSelector<IMasterState>(MASTERSTATE_REDUCER_NAME);

export const getMasterStateBy = (fn: (_: IMasterState) => any) =>
	createSelector(getMasterState, fn);

export const getSubjectsEntity = getMasterStateBy((s) => s.subjectsByPhaseEntity);
export const getTraineesInPhaseEntity = getMasterStateBy((s) => s.traineesInPhaseEntity);
export const getSchedulesEntity = getMasterStateBy((s) => s.schedulesBySubjectEntity);
export const getTraineesInScheduleEntity = getMasterStateBy((s) => s.traineesInScheduleEntity);

export const getRoles = getMasterStateBy((s) => s.roles);
export const getUserInRoles = getMasterStateBy((s) => s.userInRoles);
export const getGenerations = getMasterStateBy((s) => s.generations);
export const getSubjects = getMasterStateBy((s) => s.subjects);
export const getPhaseTypes = getMasterStateBy((s) => s.phaseTypes);
export const getPhases = getMasterStateBy((s) => s.phases);
export const getTraineesInPhase = getMasterStateBy((s) => s.traineeInPhase);
export const getSchedules = getMasterStateBy((s) => s.schedules);
export const getTraineesInSchedule = getMasterStateBy((s) => s.traineeInSchedule);
export const getInterviewQuestion = getMasterStateBy((s) => s.interviewQuestions);
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
export const isInterviewQuestionsLoading = getMasterStateBy((s) => s.loadingInterviewQuestions);
export const isInterviewQuestionDetailsLoading = getMasterStateBy(
	(s) => s.loadingInterviewQuestionDetails
);

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
// 				this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: currPhase.PhaseId }));
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
// 				this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: currPhase.PhaseId }));
// 				return [];
// 			}
// 		})
// 	);

