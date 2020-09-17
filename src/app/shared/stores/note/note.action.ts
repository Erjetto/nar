import { createAction, props } from '@ngrx/store';
import { ClientEvaluation } from '../../models';

export const FetchEvaluation = createAction(
	'[NoteState] FetchEvaluation',
	props<{ sdate: string }>()
);

export const FetchTodaysPresentation = createAction(
	'[NoteState] FetchTodaysPresentation',
	props<{ sdate: string }>()
);

export const FetchEvaluationSuccess = createAction(
	'[NoteState] FetchEvaluationSuccess',
	props<{ payload: ClientEvaluation }>()
);
