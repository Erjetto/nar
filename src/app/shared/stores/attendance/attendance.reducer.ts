import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import {
	ClientTraineeAttendanceReport,
	ClientPeriodicTraineeAttendance,
} from '../../models';
import {
	FetchAttendanceReportSuccess,
	FetchAttendanceReport,
	FetchPeriodicAttendance,
  FetchPeriodicAttendanceSuccess,
} from './attendance.action';

export interface IAttendanceState {
	attendanceReport: ClientTraineeAttendanceReport;
	traineePeriodicAttendance: ClientPeriodicTraineeAttendance[];

	loadingAttendanceReport: boolean;
	loadingPeriodicAttendance: boolean;
}

export const initialState: IAttendanceState = {
	attendanceReport: null,
	traineePeriodicAttendance: [],

	loadingAttendanceReport: false,
	loadingPeriodicAttendance: false,
};

export const ATTENDANCESTATE_REDUCER_NAME = 'AttendanceState';

export const AttendanceStateReducer = createReducer(
	initialState,
	// Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, () => ({
		...initialState,
	})),

	on(FetchAttendanceReport, (state) => ({
		...state,
		loadingAttendanceReport: true,
	})),

	on(FetchAttendanceReportSuccess, (state, { payload }) => ({
		...state,
		attendanceReport: payload,
		loadingAttendanceReport: false,
	})),

	on(FetchPeriodicAttendance, (state) => ({
		...state,
		loadingPeriodicAttendance: true,
	})),

	on(FetchPeriodicAttendanceSuccess, (state, { payload }) => ({
		...state,
		traineePeriodicAttendance: payload,
		loadingPeriodicAttendance: false,
	}))
);

export const getAttendanceState = createFeatureSelector<IAttendanceState>(
	ATTENDANCESTATE_REDUCER_NAME
);

export const getAttendanceStateBy = (fn: (_: IAttendanceState) => any) =>
	createSelector(getAttendanceState, fn);

export const getAttendanceReport = getAttendanceStateBy((s) => s.attendanceReport);
export const isAttendanceReportLoading = getAttendanceStateBy((s) => s.loadingAttendanceReport);

export const getPeriodicAttendance = getAttendanceStateBy((s) => s.traineePeriodicAttendance);
export const isPeriodicAttendanceLoading = getAttendanceStateBy((s) => s.loadingPeriodicAttendance);
