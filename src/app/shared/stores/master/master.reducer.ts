import { createFeatureSelector, createReducer, createSelector, on, select } from '@ngrx/store';

import * as MasterStateAction from './master.action';
import * as MainStateAction from '../main/main.action';
import {
	Role,
	ClientGeneration,
	ClientPhase,
	ClientSubject,
	ClientSchedule,
	ClientUserInRoles,
	ClientTrainee,
} from '../../models';
import { getCurrentGeneration } from '../main/main.reducer';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IMasterState {
	roles: Role[];
	userInRoles: ClientUserInRoles[];

	traineesInScheduleEntity: { [scheduleId: string]: ClientTrainee[] };
	traineesInPhaseEntity: { [phaseId: string]: ClientTrainee[] };
	subjectsByPhaseEntity: { [phaseId: string]: ClientSubject[] };
	schedulesBySubjectEntity: { [subjectId: string]: ClientSchedule[] };

	generations: ClientGeneration[];
	phaseTypes: any[];
	phases: ClientPhase[];
	traineeInPhase: ClientTrainee[];
	subjects: ClientSubject[];
	maxFileSizes: { [subjectId: string]: number };
	schedules: ClientSchedule[];
	traineeInSchedule: ClientTrainee[];

	ipList: string[];

	loadingRoles: boolean;
	loadingUserInRoles: boolean;
	loadingGenerations: boolean;
	loadingSubjects: boolean;
	loadingPhases: boolean;
	loadingTraineeInPhase: boolean;
	loadingSchedules: boolean;
	loadingTraineeInSchedule: boolean;
}

export const initialState: IMasterState = {
	roles: [],
	userInRoles: [],

	traineesInScheduleEntity: {},
	traineesInPhaseEntity: {},
	subjectsByPhaseEntity: {},
	schedulesBySubjectEntity: {},

	generations: [],
	phaseTypes: [
		{ key: 'ar', val: 'Assistant Recruitment' },
		{ key: 'other', val: 'Other' },
	],
	phases: [],
	traineeInPhase: [],
	subjects: [],
	maxFileSizes: {},
	schedules: [],
	traineeInSchedule: [],

	ipList: [],

	loadingRoles: false,
	loadingUserInRoles: false,
	loadingGenerations: false,
	loadingSubjects: false,
	loadingPhases: false,
	loadingTraineeInPhase: false,
	loadingSchedules: false,
	loadingTraineeInSchedule: false,
};

export const MASTERSTATE_REDUCER_NAME = 'MasterState';

export const MasterStateReducer = createReducer(
	initialState,

	// Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, (state) => ({
		...initialState,
		generations: state.generations,
		roles: state.roles,
	})),

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

	on(MasterStateAction.FetchSubjects, (state) => ({
		...state,
		loadingSchedules: true,
	})),

	on(MasterStateAction.FetchTraineeInSchedule, (state) => ({
		...state,
		loadingTraineeInSchedule: true,
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
		loadingSubjects: false,
		subjects: payload,
		maxFileSizes: {
			...state.maxFileSizes,
			...payload.reduce((acc, prev) => ({...acc, [prev.SubjectId]: prev.MaxFileSize}), {}),
		},
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

	// No need loadingIPList
	on(MasterStateAction.FetchIPListSuccess, (state, { payload }) => ({
		...state,
		ipList: payload,
	}))
);

export const getMasterState = createFeatureSelector<IMasterState>(MASTERSTATE_REDUCER_NAME);

export const getMasterStateBy = (fn: (_: IMasterState) => any) =>
	createSelector(getMasterState, fn);

//#region entity
export const getSubjectsEntity = getMasterStateBy((s) => s.subjectsByPhaseEntity);
export const getTraineesInPhaseEntity = getMasterStateBy((s) => s.traineesInPhaseEntity);
export const getSchedulesEntity = getMasterStateBy((s) => s.schedulesBySubjectEntity);
export const getTraineesInScheduleEntity = getMasterStateBy((s) => s.traineesInScheduleEntity);
//#endregion

//#region Master tab
export const getRoles = getMasterStateBy((s) => s.roles);
export const getUserInRoles = getMasterStateBy((s) => s.userInRoles);
export const getGenerations = getMasterStateBy((s) => s.generations);
export const getSubjects = getMasterStateBy((s) => s.subjects);
export const getMaxFileSizes = getMasterStateBy((s) => s.maxFileSizes);
export const getPhaseTypes = getMasterStateBy((s) => s.phaseTypes);
export const getPhases = getMasterStateBy((s) => s.phases);
export const getTraineesInPhase = getMasterStateBy((s) => s.traineeInPhase);
export const getSchedules = getMasterStateBy((s) => s.schedules);
export const getTraineesInSchedule = getMasterStateBy((s) => s.traineeInSchedule);
export const getIpList = getMasterStateBy((s) => s.ipList);

export const isRolesLoading = getMasterStateBy((s) => s.loadingRoles);
export const isUserInRolesLoading = getMasterStateBy((s) => s.loadingUserInRoles);
export const isGenerationsLoading = getMasterStateBy((s) => s.loadingGenerations);
export const isSubjectsLoading = getMasterStateBy((s) => s.loadingSubjects);
export const isPhasesLoading = getMasterStateBy((s) => s.loadingPhases);
export const isTraineeInPhaseLoading = getMasterStateBy((s) => s.loadingTraineeInPhase);
export const isSchedulesLoading = getMasterStateBy((s) => s.loadingSchedules);
export const isTraineeInScheduleLoading = getMasterStateBy((s) => s.loadingTraineeInSchedule);
//#endregion

//#region Extras
export const getGenerationOneYearLower = createSelector(
	getCurrentGeneration,
	(g: ClientGeneration) => parseInt(g?.Description.substr(0, 2), 10) - 1 + g?.Description.substr(2)
);
//#endregion
