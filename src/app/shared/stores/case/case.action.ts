import { createAction, props } from '@ngrx/store';
import { Case, ClientUploadAnswer, ClientCaseTrainer } from '../../models';

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

export const DownloadCase = createAction('[CaseState] DownloadCase', props<{ fileId: string }>());
