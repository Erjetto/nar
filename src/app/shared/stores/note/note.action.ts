import { createAction, props } from '@ngrx/store';
import { ClientEvaluation } from '../../models';

export const FetchEvaluation = createAction(
	'[NoteState] FetchEvaluation',
	props<{ sdate: string }>()
);
export const FetchEvaluationSuccess = createAction(
	'[NoteState] FetchEvaluationSuccess',
	props<{ payload: ClientEvaluation }>()
);

export const CreateEvaluationNote = createAction(
	'[NoteState] CreateEvaluationNote',
	props<{ notes: string; evalType: string; sdate: Date }>()
);
export const CreateNote = createAction(
	'[NoteState] CreateNote',
	props<{ traineeId: string; note: string; reputation: number }>()
);

export const DeleteEvaluationNote = createAction(
	'[NoteState] DeleteEvaluationNote',
	props<{ noteId: string }>()
);

export const SetEvaluationNoteFilter = createAction(
	'[NoteState] SetEvaluationFilter',
	props<{
		evalType: string;
		search: string;
		sort: string;
		asc: string;
	}>()
);
