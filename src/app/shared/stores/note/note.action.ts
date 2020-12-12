import { createAction, props } from '@ngrx/store';
import {
	ClientEvaluation,
	ClientTraineeData,
	ClientTraineeReputation,
	TraineeComment,
} from '../../models';

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

//#region View Trainee
export const FetchTraineesReputation = createAction(
	'[NoteState] FetchTraineesReputation',
	props<{ phaseId: string }>()
);
export const FetchTraineesReputationSuccess = createAction(
	'[NoteState] FetchTraineesReputationSuccess',
	props<{ payload: ClientTraineeReputation[] }>()
);

export const FetchTraineeData = createAction(
	'[NoteState] FetchTraineeData',
	props<{ traineeId: string }>()
);
export const FetchTraineeDataSuccess = createAction(
	'[NoteState] FetchTraineeDataSuccess',
	props<{ payload: ClientTraineeData }>()
);
export const FetchTraineeDataForTrainer = createAction(
	'[NoteState] FetchTraineeDataForTrainer',
	props<{ traineeId: string }>()
);
export const FetchTraineeDataForTrainerSuccess = createAction(
	'[NoteState] FetchTraineeDataForTrainerSuccess',
	props<{ payload: ClientTraineeData }>()
);

export const CreateNote = createAction(
	'[NoteState] CreateNote',
	props<{ traineeId: string; note: string; reputation: number }>()
);
export const DeleteNote = createAction(
	'[NoteState] DeleteNote',
	props<{ noteId: string; traineeId: string }>()
);
//#endregion

//#region Home
// export const FetchTraineeCommentHistory = createAction('[NoteState] FetchTraineeCommentHistory');
// export const FetchTraineeCommentHistorySuccess = createAction(
// 	'[NoteState] FetchTraineeCommentHistorySuccess',
// 	props<{ payload: TraineeComment[] }>()
// );
//#endregion
