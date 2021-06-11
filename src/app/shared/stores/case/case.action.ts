import { createAction, props } from '@ngrx/store';
import { Case, ClientUploadAnswer, ClientCaseTrainer, ClientCaseTrainee } from '../../models';

export const FetchCases = createAction('[CaseState] FetchCases', props<{ scheduleId: string }>());
export const FetchAnswers = createAction('[CaseState] FetchAnswers');

export const FetchCasesSuccess = createAction(
	'[CaseState] FetchCasesSuccess',
	props<{ payload: Case[] }>()
);
export const FetchAnswersSuccess = createAction(
	'[CaseState] FetchAnswersSuccess',
	props<{ payload: ClientUploadAnswer[] }>()
);

export const CreateCase = createAction(
	'[CaseState] CreateCase',
	props<{
		fileId: string;
		subjectId: string;
		scheduleId: string;
		caseName: string;
		correctorNames: string[];
		traineeDays: string;
		trainerDays: string;
		scheduleDate: string;
		noUpload: boolean;
	}>()
);

export const UpdateCase = createAction(
	'[CaseState] UpdateCase',
	props<{
		caseId: string;
		caseName: string;
		correctorNames: string[];
		traineeDays: string;
		trainerDays: string;
		fileId?: string;
		scheduleDate: string; // yyyy-MM-dd HH:mm:ss
	}>()
);

export const DeleteCase = createAction(
	'[CaseState] DeleteCase',
	props<{
		caseId: string;
		reason: string;
	}>()
);

//#region Trainee
export const FetchTraineeCasesBy = createAction(
	'[CaseState] FetchTraineeCasesBy',
	props<{
		phaseId: string;
		subjectId?: string;
	}>()
);
export const FetchTraineeCasesSuccess = createAction(
	'[CaseState] FetchTraineeCasesSuccess',
	props<{ payload: ClientCaseTrainee }>()
);

export const SubmitTraineeAnswer = createAction(
	'[CaseState] SubmitTraineeAnswer',
	props<{ phaseId: string; caseId: string; fileId: string }>()
);
//#endregion

//#region Correction
export const FetchCorrectionListBy = createAction(
	'[CaseState] FetchCorrectionListBy',
	props<{
		phaseId?: string;
		subjectId?: string;
	}>()
);
export const FetchCorrectionListSuccess = createAction(
	'[CaseState] FetchCorrectionListSuccess',
	props<{ payload: ClientCaseTrainer[] }>()
);
export const FetchCorrectionScoring = createAction(
	'[CaseState] FetchCorrectionScoring',
	props<{ caseId: string }>()
);
export const FetchCorrectionScoringSuccess = createAction(
	'[CaseState] FetchCorrectionScoringSuccess',
	props<{ payload: ClientUploadAnswer[] }>()
);
export const SaveTraineeScores = createAction(
	'[CaseState] SaveTraineeScores',
	props<{
		phaseId: string;
		caseId: string;
		traineeId: string[];
		score: number[];
		zeroingReason: string[];
	}>()
);

export const ExportScoreBySubject = createAction(
	'[CaseState] ExportScoreBySubject',
	props<{subjectId: string;}>()
);
export const GenerateExcelTemplateForScoring = createAction(
	'[CaseState] GenerateExcelTemplateForScoring',
	props<{caseId: string;}>()
);
export const ImportScoreFromExcel = createAction(
	'[CaseState] ImportScoreFromExcel',
	props<{
		fileId: string;
		caseId: string;
	}>()
);
export const DownloadAllAnswers = createAction(
	'[CaseState] DownloadAllAnswers',
	props<{caseId: string;}>()
);

//#endregion
