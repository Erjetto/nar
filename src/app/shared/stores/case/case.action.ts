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
