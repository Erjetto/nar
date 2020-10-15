import { createAction, props } from '@ngrx/store';
import { CoreTrainingPresentation, TraineePresentation, QuestionStatus } from '../../models';

export const FetchPresentationsBy = createAction(
	'[PresentationState] FetchPresentationsBy',
	props<{ generationId: string; subjectId?: string; traineeId?: string }>()
);
export const FetchPresentationStatus = createAction(
	'[PresentationState] FetchPresentationStatus',
	props<{ filename: string }>()
);
export const FetchPresentationsByDate = createAction(
	'[PresentationState] FetchPresentationsByDate',
	props<{ time: string }>()
);

export const FetchPresentationsByGenerationSuccess = createAction(
	'[PresentationState] FetchPresentationsByGenerationSuccess',
	props<{ payload: CoreTrainingPresentation[] }>()
);
export const FetchPresentationsBySubjectSuccess = createAction(
	'[PresentationState] FetchPresentationsBySubjectSuccess',
	props<{ payload: CoreTrainingPresentation[]; subjectId: string }>()
);
export const FetchPresentationsByTraineeSuccess = createAction(
	'[PresentationState] FetchPresentationsByTraineeSuccess',
	props<{ payload: CoreTrainingPresentation[]; traineeId: string }>()
);
export const FetchPresentationStatusSuccess = createAction(
	'[PresentationState] FetchPresentationStatusSuccess',
	props<{ payload: string }>()
);
export const FetchPresentationsByDateSuccess = createAction(
	'[PresentationState] FetchPresentationsByDateSuccess',
	props<{ payload: TraineePresentation[] }>()
);

export const SetQuestionsFilter = createAction(
	'[PresentationState] SetQuestionsFilter',
	props<{ search: string; status: string; subjectId: string }>()
);

export const SaveTraineePresentation = createAction(
	'[PresentationState] SaveTraineePresentation',
	props<{ data: TraineePresentation }>()
);

/*
  Region for CTP questions, answers and their comments
*/
//#region Add
export const AddCoreTrainingPresentationQuestion = createAction(
	'[PresentationState] AddCoreTrainingPresentationQuestion',
	props<{ filename: string; question: string }>()
);
export const AddCoreTrainingPresentationAnswer = createAction(
	'[PresentationState] AddCoreTrainingPresentationAnswer',
	props<{ filename: string; questionId: string; text: string }>()
);
export const AddCoreTrainingPresentationComment = createAction(
	'[PresentationState] AddCoreTrainingPresentationComment',
	props<{ filename: string; itemId: string; text: string }>()
);
//#endregion
//#region Update
export const UpdateCoreTrainingPresentationItem = createAction(
	'[PresentationState] UpdateCoreTrainingPresentationItem',
	props<{ filename: string; itemId: string; text?: string; status?: QuestionStatus }>()
);
export const UpdateCoreTrainingPresentationComment = createAction(
	'[PresentationState] UpdateCoreTrainingPresentationComment',
	props<{ filename: string; itemId: string; commentId: string; comment: string }>()
);
//#endregion
//#region Delete
export const DeleteCoreTrainingPresentationItem = createAction(
	'[PresentationState] DeleteCoreTrainingPresentationItem',
	props<{ filename: string; itemId: string; note: string }>()
);
export const DeleteCoreTrainingPresentationComment = createAction(
	'[PresentationState] DeleteCoreTrainingPresentationItem',
	props<{ filename: string; itemId: string; commentId: string }>()
);
//#endregion
