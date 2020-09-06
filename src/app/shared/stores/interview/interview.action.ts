import { createAction, props } from '@ngrx/store';
import {
	ClientInterviewQuestion,
	InterviewQuestionDetail,
	ClientInterviewReport,
	InterviewMaterial,
  ClientInterviewSchedule,
} from '../../models';

//#region Fetch
export const FetchInterviewQuestions = createAction('[MasterState] FetchInterviewQuestions');
export const FetchInterviewQuestionDetails = createAction(
	'[MasterState] FetchInterviewQuestionDetails',
	props<{ interviewQuestionId: string }>()
);
//#endregion

//#region Fetch Success
export const FetchInterviewQuestionsSuccess = createAction(
	'[MasterState] FetchInterviewQuestionsSuccess',
	props<{ payload: ClientInterviewQuestion[] }>()
);
export const FetchInterviewQuestionDetailsSuccess = createAction(
	'[MasterState] FetchInterviewQuestionDetailsSuccess',
	props<{ payload: InterviewQuestionDetail[] }>()
);
//#endregion

//#region Create
export const CreateInterviewQuestion = createAction(
	'[MasterState] CreateInterviewQuestions',
	props<{ questionName: string; questions: string[] }>()
);
export const CreateInterviewQuestionDetail = createAction(
	'[MasterState] CreateInterviewQuestionDetails',
	props<{ interviewQuestionId: string }>()
);
export const CreateInterviewSchedule = createAction('[MasterState] CreateInterviewSchedules');
//#endregion

//#region Update// export const UpdateInterviewQuestion = createAction(
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

export const FetchInterviewMaterials = createAction(
	'[MasterState] FetchInterviewMaterials',
	props<{ phaseId: string }>()
);

export const FetchInterviewSchedules = createAction(
	'[MasterState] FetchInterviewSchedules',
	props<{ phaseId: string }>()
);

export const FetchInterviewMaterialsSuccess = createAction(
	'[MasterState] FetchInterviewMaterialsSuccess',
	props<{ payload: InterviewMaterial[] }>()
);

export const FetchInterviewSchedulesSuccess = createAction(
	'[MasterState] FetchInterviewSchedulesSuccess',
	props<{ payload: ClientInterviewSchedule[] }>()
);