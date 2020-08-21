import { createAction, props } from '@ngrx/store';
import {
	ClientGeneration,
	Role,
	ClientPhase,
	ClientSubject,
	ClientSchedule,
	ClientInterviewQuestion,
	InterviewQuestionDetail,
	ClientInterviewReport,
	ClientUserInRoles,
	ClientTrainee,
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
export const FetchInterviewQuestions = createAction(
	'[MasterState] FetchInterviewQuestions'
);
export const FetchInterviewQuestionDetails = createAction(
	'[MasterState] FetchInterviewQuestionDetails',
	props<{ interviewQuestionId: string }>()
);
export const FetchInterviewSchedules = createAction(
	'[MasterState] FetchInterviewSchedules'
);
//#endregion

//#region Fetch Success
export const FetchRolesSuccess = createAction(
	'[MasterState] FetchRolesSuccess',
	props<{ payload: Role[] }>()
);
export const FetchUserInRolesSuccess = createAction(
	'[MasterState] FetchUserInRoles',
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
	props<{ payload: ClientTrainee[] }>()
);
export const FetchSubjectsSuccess = createAction(
	'[MasterState] FetchSubjectsSuccess',
	props<{ payload: ClientSubject[] }>()
);
export const FetchSchedulesSuccess = createAction(
	'[MasterState] FetchSchedulesSuccess',
	props<{ payload: ClientSchedule[] }>()
);
export const FetchTraineeInScheduleSuccess = createAction(
	'[MasterState] FetchTraineeInScheduleSuccess',
	props<{ payload: ClientTrainee[] }>()
);

export const FetchInterviewQuestionsSuccess = createAction(
	'[MasterState] FetchInterviewQuestionsSuccess',
	props<{ payload: ClientInterviewQuestion[] }>()
);
export const FetchInterviewQuestionDetailsSuccess = createAction(
	'[MasterState] FetchInterviewQuestionDetailsSuccess',
	props<{ payload: InterviewQuestionDetail[] }>()
);
export const FetchInterviewSchedulesSuccess = createAction(
	'[MasterState] FetchInterviewSchedulesSuccess',
	props<{ payload: ClientInterviewReport }>()
);
//#endregion

//#region Create
// export const CreateRole = createAction('[MasterState] CreateRoles');
export const CreateUserInRole = createAction('[MasterState] CreateUserInRoles');
export const CreateGeneration = createAction('[MasterState] CreateGenerations');
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
	'[MasterState] CreateSubjects',
	props<{
		name: string;
		phaseId: string;
    value: boolean;
    maxFileSize: number;
	}>()
);
export const CreateSchedule = createAction(
	'[MasterState] CreateSchedules',
	props<{ subjectId: string }>()
);
export const CreateTraineeInSchedule = createAction(
	'[MasterState] CreateTraineeInSchedule',
	props<{ schedule: string }>()
);
export const CreateInterviewQuestion = createAction(
	'[MasterState] CreateInterviewQuestions'
);
export const CreateInterviewQuestionDetail = createAction(
	'[MasterState] CreateInterviewQuestionDetails',
	props<{ interviewQuestionId: string }>()
);
export const CreateInterviewSchedule = createAction(
	'[MasterState] CreateInterviewSchedules'
);
//#endregion

//#region Update
// export const UpdateRole = createAction('[MasterState] UpdateRoles');
// export const UpdateUserInRole = createAction('[MasterState] UpdateUserInRoles');
// export const UpdateGeneration = createAction('[MasterState] UpdateGenerations');
export const UpdatePhase = createAction(
	'[MasterState] UpdatePhase',
	props<{
		Description: string;
		EndDate: string;
		PhaseId: string;
		StartDate: string;
	}>()
);
// export const UpdateSubject = createAction(
// 	'[MasterState] UpdateSubjects',
// 	props<{ phaseId: string }>()
// );
// export const UpdateSchedule = createAction(
// 	'[MasterState] UpdateSchedules',
// 	props<{ subjectId: string }>()
// );
// export const UpdateTraineeInSchedule = createAction(
// 	'[MasterState] UpdateTraineeInSchedule',
// 	props<{ schedule: string }>()
// );
// export const UpdateInterviewQuestion = createAction(
// 	'[MasterState] UpdateInterviewQuestions'
// );
// export const UpdateInterviewQuestionDetail = createAction(
// 	'[MasterState] UpdateInterviewQuestionDetails',
// 	props<{ interviewQuestionId: string }>()
// );
// export const UpdateInterviewSchedule = createAction(
// 	'[MasterState] UpdateInterviewSchedules'
// );
//#endregion

//#region Delete
// export const DeleteRole = createAction('[MasterState] DeleteRoles');
export const DeleteUserInRole = createAction('[MasterState] DeleteUserInRoles');
// export const DeleteGeneration = createAction('[MasterState] DeleteGenerations');
export const DeletePhase = createAction(
	'[MasterState] DeletePhase',
	props<{ PhaseId: string }>()
);
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
// export const DeleteSchedule = createAction(
// 	'[MasterState] DeleteSchedules',
// 	props<{ subjectId: string }>()
// );
// export const DeleteTraineeInSchedule = createAction(
// 	'[MasterState] DeleteTraineeInSchedule',
// 	props<{ schedule: string }>()
// );
// export const DeleteInterviewQuestion = createAction(
// 	'[MasterState] DeleteInterviewQuestions'
// );
// export const DeleteInterviewQuestionDetail = createAction(
// 	'[MasterState] DeleteInterviewQuestionDetails',
// 	props<{ interviewQuestionId: string }>()
// );
// export const DeleteInterviewSchedule = createAction(
// 	'[MasterState] DeleteInterviewSchedules'
// );
//#endregion

export const ActionSuccess = createAction(
	'[MasterState] ActionSuccess',
	props<{ message: string }>()
);
export const ActionFailed = createAction(
	'[MasterState] ActionFailed',
	props<{ message: string }>()
);