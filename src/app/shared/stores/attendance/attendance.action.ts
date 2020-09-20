import { createAction, props } from '@ngrx/store';
import { ClientEvaluation, ClientTraineeAttendanceReport, AttendanceType } from '../../models';

export const FetchAttendanceReport = createAction(
	'[NoteState] FetchAttendanceReport',
	props<{ date: string }>()
);
export const FetchAttendanceReportSuccess = createAction(
	'[NoteState] FetchAttendanceReportSuccess',
	props<{ payload: ClientTraineeAttendanceReport }>()
);

export const SaveTraineeAttendance = createAction(
	'[NoteState] SaveTraineeAttendance',
	props<{ traineeCode: string; attType: AttendanceType }>()
);

export const ChangeTraineeAttendanceStatus = createAction(
	'[NoteState] ChangeTraineeAttendanceStatus',
	props<{
		attendanceId: string;
		status: string;
		note: string;
		traineeCode: string;
		attType: AttendanceType;
		attendanceDate: string;
	}>()
);

export const SetAttendancePermission = createAction(
	'[NoteState] SetAttendancePermission',
	props<{
		traineecode: string;
    reason: string;
    date: string;
		to: boolean;
	}>()
);
