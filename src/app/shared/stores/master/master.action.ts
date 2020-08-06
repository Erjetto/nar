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
	props<{ schedule: string }>()
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
