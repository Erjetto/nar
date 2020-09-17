import { createAction, props } from '@ngrx/store';
import { ClientEvaluation, ClientTraineeAttendanceReport } from '../../models';

export const FetchAttendanceReport = createAction(
	'[NoteState] FetchAttendanceReport',
	props<{ date: string }>()
);
export const FetchAttendanceReportSuccess = createAction(
	'[NoteState] FetchAttendanceReportSuccess',
	props<{ payload: ClientTraineeAttendanceReport }>()
);
