import { createAction, props } from '@ngrx/store';
import {
	ClientInterviewQuestion,
	InterviewQuestionDetail,
	ClientInterviewReport,
	InterviewMaterial,
	ClientInterviewSchedule,
  ClientInterviewResult,
  InterviewResultDetail,
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
export const CreateInterviewSchedule = createAction(
	'[MasterState] CreateInterviewSchedules',
	props<{ interviewQuestionId: string; schedules: string[] }>()
);
export const CreateInterviewMaterial = createAction(
	'[MasterState] CreateInterviewMaterial',
	props<{
		fileId: string;
		materialName: string;
		trainee_Id: string;
	}>()
);
export const MassCreateInterviewMaterial = createAction(
	'[MasterState] MassCreateInterviewMaterial',
	props<{
		fileIds: string[];
		fileNames: string[];
	}>()
);
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
export const UpdateInterviewResult = createAction(
  '[MasterState] UpdateInterviewResult',
	props<{
		interviewScheduleId: string;
    details: InterviewResultDetail[],
    note: string;
    decision: string;
    attnote: string;
    devnote: string;
    summary: string;
	}>()
);
//#endregion

//#region Delete
// export const DeleteInterviewQuestion = createAction(
// 	'[MasterState] DeleteInterviewQuestions'
// );
// export const DeleteInterviewQuestionDetail = createAction(
// 	'[MasterState] DeleteInterviewQuestionDetails',
// 	props<{ interviewQuestionId: string }>()
// );
export const DeleteInterviewSchedule = createAction(
	'[MasterState] DeleteInterviewSchedules',
	props<{
		interviewScheduleId: string;
		note: string;
	}>()
);
export const DeleteInterviewMaterial = createAction(
	'[MasterState] DeleteInterviewMaterial',
	props<{
		fileid: string;
		materialId: string;
		traineeid: string;
		reason: string;
	}>()
);
export const DeleteInterviewQuestion = createAction(
	'[MasterState] DeleteInterviewQuestion',
	props<{ interviewQuestionId: string}>()
);
//#endregion

export const FetchInterviewMaterials = createAction(
	'[MasterState] FetchInterviewMaterials',
	props<{ phaseId: string }>()
);
export const FetchInterviewSchedules = createAction('[MasterState] FetchInterviewSchedules');
export const FetchInterviewSchedulesReport = createAction(
	'[MasterState] FetchInterviewSchedulesReport'
);
export const FetchInterviewResult = createAction(
  '[MasterState] FetchInterviewResult',
  props<{interviewScheduleId: string}>()
);


export const FetchInterviewMaterialsSuccess = createAction(
	'[MasterState] FetchInterviewMaterialsSuccess',
	props<{ payload: InterviewMaterial[] }>()
);
export const FetchInterviewSchedulesSuccess = createAction(
	'[MasterState] FetchInterviewSchedulesSuccess',
	props<{ payload: ClientInterviewSchedule[] }>()
);
export const FetchInterviewSchedulesReportSuccess = createAction(
	'[MasterState] FetchInterviewSchedulesReportSuccess',
	props<{ payload: ClientInterviewReport }>()
);
export const FetchInterviewResultSuccess = createAction(
	'[MasterState] FetchInterviewResultSuccess',
	props<{ payload: ClientInterviewResult }>()
);
