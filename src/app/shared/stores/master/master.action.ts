import { createAction, props } from '@ngrx/store';
import {
	ClientGeneration,
	Role,
	ClientPhase,
	ClientSubject,
	ClientSchedule,
	ClientUserInRoles,
	ClientTrainee,
	AttendanceType,
  TraineeSchedule,
} from '../../models';

//#region Fetch
export const FetchRoles = createAction('[MasterState] FetchRoles');
export const FetchUserInRoles = createAction('[MasterState] FetchUserInRoles');
export const FetchGenerations = createAction('[MasterState] FetchGenerations');
export const FetchPhases = createAction('[MasterState] FetchPhases');
export const FetchTraineeInPhase = createAction(
	'[MasterState] FetchTraineeInPhase',
	props<{ phaseId: string }>()
);
export const FetchSubjects = createAction(
	'[MasterState] FetchSubjects',
	props<{ phaseId: string }>()
);
export const FetchSchedules = createAction(
	'[MasterState] FetchSchedules',
	props<{ subjectId: string }>()
);
export const FetchTraineeInSchedule = createAction(
	'[MasterState] FetchTraineeInSchedule',
	props<{ scheduleId: string }>()
);
export const FetchIPList = createAction('[MasterState] FetchIPList');
//#endregion

//#region Fetch Success
export const FetchRolesSuccess = createAction(
	'[MasterState] FetchRolesSuccess',
	props<{ payload: Role[] }>()
);
export const FetchUserInRolesSuccess = createAction(
	'[MasterState] FetchUserInRolesSuccess',
	props<{ payload: ClientUserInRoles[] }>()
);
export const FetchGenerationsSuccess = createAction(
	'[MasterState] FetchGenerationsSuccess',
	props<{ payload: ClientGeneration[] }>()
);
export const FetchPhasesSuccess = createAction(
	'[MasterState] FetchPhasesSuccess',
	props<{ payload: ClientPhase[] }>()
);
export const FetchTraineeInPhaseSuccess = createAction(
	'[MasterState] FetchTraineeInPhaseSuccess',
	props<{ payload: ClientTrainee[]; phaseId: string }>()
);
export const FetchSubjectsSuccess = createAction(
	'[MasterState] FetchSubjectsSuccess',
	props<{ payload: ClientSubject[]; phaseId: string }>()
);
export const FetchSchedulesSuccess = createAction(
	'[MasterState] FetchSchedulesSuccess',
	props<{ payload: ClientSchedule[]; subjectId: string }>()
);
export const FetchTraineeInScheduleSuccess = createAction(
	'[MasterState] FetchTraineeInScheduleSuccess',
	props<{ payload: ClientTrainee[]; scheduleId: string }>()
);
export const FetchIPListSuccess = createAction(
	'[MasterState] FetchIPListSuccess',
	props<{ payload: string[] }>()
);
//#endregion

//#region Create
// export const CreateRole = createAction('[MasterState] CreateRoles');
export const CreateUserInRole = createAction(
	'[MasterState] CreateUserInRoles',
	props<{ userRoleId: string; usernames: string[] }>()
);
export const CreateGeneration = createAction(
	'[MasterState] CreateGenerations',
	props<{
		generationName: string;
		semester: string;
		year: string;
	}>()
);
export const CreatePhase = createAction(
	'[MasterState] CreatePhase',
	props<{
		name: string;
		beginDate: string;
		endDate: string;
		phaseType: string;
	}>()
);
export const CreateTraineeInPhase = createAction(
	'[MasterState] CreateTraineeInPhase',
	props<{
		binusianNumbers: string[];
		phaseId: string;
		isAddToSchedule: boolean;
	}>()
);
export const CreateSubject = createAction(
	'[MasterState] CreateSubject',
	props<{
		name: string;
		phaseId: string;
		value: boolean;
		maxFileSize: number;
	}>()
);
export const CreateDailySchedule = createAction(
	'[MasterState] CreateDailySchedule',
	props<{
		subjectId: string;
		scheduleName: string;
		scheduleDates: string[];
	}>()
);
export const CreateSpecificSchedule = createAction(
	'[MasterState] CreateSpecificSchedule',
	props<{
		subjectId: string;
		scheduleName: string;
		dataSchedule: {
			Capacity: string;
			MeetingNo: number;
			Room: string;
			SubjectId: string;
			VariationNo: number;
			Detail: { ScheduleDate: string; ShiftStart: number; ShiftEnd: number }[];
		};
		start: string;
		end: string;
		canSelfRegis: boolean;
		excTrainee: string[];
	}>()
);
export const CreateTraineeInSchedule = createAction(
	'[MasterState] CreateTraineeInSchedule',
	props<{
		binusianNumbers: string[]; // yyyy-mm-dd
		phaseId: string;
		subjectId: string;
		scheduleId: string;
	}>()
);
//#endregion

//#region Update
export const UpdateGeneration = createAction(
	'[MasterState] UpdateGenerations',
	props<{
		GenerationId: string;
		Description: string;
		Semester: string;
		Year: string;
	}>()
);
export const UpdatePhase = createAction(
	'[MasterState] UpdatePhase',
	props<{
		Description: string;
		EndDate: string;
		PhaseId: string;
		StartDate: string;
	}>()
);
export const UpdateSubject = createAction(
	'[MasterState] UpdateSubject',
	props<{
		subjectId: string;
		value?: boolean;
		maxFileSize?: number;
	}>()
);
// export const UpdateSchedule = createAction(
// 	'[MasterState] UpdateSchedules',
// 	props<{ subjectId: string }>()
// );
// export const UpdateTraineeInSchedule = createAction(
// 	'[MasterState] UpdateTraineeInSchedule',
// 	props<{ schedule: string }>()
// );
export const UpdateIPList = createAction(
	'[MasterState] UpdateIPList',
	props<{ ipList: string[] }>()
);
//#endregion

//#region Delete
// export const DeleteRole = createAction('[MasterState] DeleteRoles');
export const DeleteUserInRole = createAction(
	'[MasterState] DeleteUserInRole',
	props<{ userInRoleId: string }>()
);
// export const DeleteGeneration = createAction('[MasterState] DeleteGenerations');
export const DeletePhase = createAction('[MasterState] DeletePhase', props<{ PhaseId: string }>());
export const DeleteTraineeInPhase = createAction(
	'[MasterState] DeleteTraineeInPhase',
	props<{
		PhaseId: string;
		TraineeId: string;
	}>()
);
export const DeleteSubject = createAction(
	'[MasterState] DeleteSubjects',
	props<{ subjectId: string }>()
);
export const DeleteSchedule = createAction(
	'[MasterState] DeleteSchedules',
	props<{ scheduleId: string; reason: string }>()
);
export const DeleteAllSchedule = createAction(
	'[MasterState] DeleteAllSchedules',
	props<{ reason: string }>()
);
export const DeleteTraineeInSchedule = createAction(
	'[MasterState] DeleteTraineeInSchedule',
	props<{ ScheduleId: string; TraineeId: string }>()
);
//#endregion

//#region Modify
/**
 * The param must be in the exact order
 * ex: 
 * `{ genId, traineeId, date}`
 * date will be omitted because no scheduleType
 * 
 * date in `dd-MMM-yyyy` format
 */
export const FetchTraineeSchedulesBy = createAction(
	'[MasterState] FetchTraineeSchedulesBy',
	props<{
		generationId?: string;
		traineeId?: string;
		scheduleType?: AttendanceType;
		date?: string;
		traineeScheduleId?: string;
	}>()
);
export const FetchTraineeSchedulesSuccess = createAction(
  '[MasterState] FetchTraineeSchedulesSuccess',
  props<{payload: TraineeSchedule[]}>()
);
//#endregion
