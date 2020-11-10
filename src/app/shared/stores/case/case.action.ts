import { createAction, props } from '@ngrx/store';
import { Case, ClientUploadAnswer, ClientCaseTrainer, ClientCaseTrainee } from '../../models';

export const FetchCases = createAction('[CaseState] FetchCases', props<{ scheduleId: string }>());
export const FetchClientCaseTrainers = createAction('[CaseState] FetchClientCaseTrainers');
export const FetchAnswers = createAction('[CaseState] FetchAnswers');

export const FetchCasesSuccess = createAction(
	'[CaseState] FetchCasesSuccess',
	props<{ payload: Case[] }>()
);
export const FetchClientCaseTrainersSuccess = createAction(
	'[CaseState] FetchClientCaseTrainersSuccess',
	props<{ payload: ClientCaseTrainer[] }>()
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
