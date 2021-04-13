import { createAction, props } from '@ngrx/store';
import { ClientEvaluation, ClientTraineeAttendanceReport, AttendanceType, ClientPeriodicTraineeAttendance } from '../../models';

export const FetchAttendanceReport = createAction(
	'[NoteState] FetchAttendanceReport',
	props<{ date: string }>()
);
export const FetchAttendanceReportSuccess = createAction(
	'[NoteState] FetchAttendanceReportSuccess',
	props<{ payload: ClientTraineeAttendanceReport }>()
);

export const FetchPeriodicAttendance = createAction(
	'[NoteState] FetchPeriodicAttendance',
	props<{ startDate: Date, endDate: Date, includeUnfinalized: boolean }>()
);
export const FetchPeriodicAttendanceSuccess = createAction(
	'[NoteState] FetchPeriodicAttendanceSuccess',
	props<{ payload: ClientPeriodicTraineeAttendance[] }>()
);

export const ExportPeriodicTraineeAttendancesForSubject = createAction(
	'[NoteState] ExportPeriodicTraineeAttendancesForSubject',
	props<{ subjectId: string }>()
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
