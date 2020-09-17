import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as AttendanceStateAction from './attendance.action';
import * as MainStateAction from '../main/main.action';
import { TraineePresentation, ClientTraineeAttendanceReport, ClientEvaluation, ClientTraineeData } from '../../models';

export interface IAttendanceState {
  attendanceReport: ClientTraineeAttendanceReport;


  loadingAttendanceReport: boolean;
}

export const initialState: IAttendanceState = {
  attendanceReport: null,
  
  loadingAttendanceReport: false,
};

export const ATTENDANCESTATE_REDUCER_NAME = 'AttendanceState';

export const AttendanceStateReducer = createReducer(
	initialState,
	// Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, () => ({
		...initialState,
  })),
  
  on(AttendanceStateAction.FetchAttendanceReport, (state) => ({
    ...state,
    loadingAttendanceReport: true
  })),
  
  on(AttendanceStateAction.FetchAttendanceReportSuccess, (state, {payload}) => ({
    ...state,
    attendanceReport: payload,
    loadingAttendanceReport: false
  })),

);

export const getAttendanceState = createFeatureSelector<IAttendanceState>(
	ATTENDANCESTATE_REDUCER_NAME
);

export const getAttendanceStateBy = (fn: (_: IAttendanceState) => any) =>
	createSelector(getAttendanceState, fn);

export const getAttendanceReport = getAttendanceStateBy((s) => s.attendanceReport);
export const isAttendanceReportLoading = getAttendanceStateBy((s) => s.loadingAttendanceReport);
// export const getAttendanceStatus = getAttendanceStateBy((s) => s.attendanceStatus);
// export const getAnnouncements = getAttendanceStateBy((s) => s.announcement);

// export const getCurrentGeneration = getAttendanceStateBy((s) => s.currentGeneration);
// export const getCurrentRole = getAttendanceStateBy((s) => s.currentRole);
