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
export const FetchPresentationScorings = createAction(
	'[PresentationState] FetchPresentationScorings',
	props<{ 
		generationId: string;
		phaseId?: string;
		subjectId?: string;
		traineeId?: string;
		presentationNo?: number;
	 }>()
);
export const FetchPresentationScoringsBy = createAction(
	'[PresentationState] FetchPresentationScoringsBy',
	props<{ time?: string; subjectId?: string }>()
);
export const FetchPresentationScoringsSummary = createAction(
	'[PresentationState] FetchPresentationScoringsSummary',
	props<{ subjectId: string }>()
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
export const FetchPresentationScoringsSuccess = createAction(
	'[PresentationState] FetchPresentationScoringsSuccess',
	props<{ payload: TraineePresentation[] }>()
);
export const FetchPresentationScoringsSummarySuccess = createAction(
	'[PresentationState] FetchPresentationScoringsSummarySuccess',
	props<{ payload: TraineePresentation[] }>()
);
export const FetchMyPresentations = createAction('[PresentationState] FetchMyPresentations');
export const FetchMyPresentationsSuccess = createAction(
	'[PresentationState] FetchMyPresentationsSuccess',
	props<{ payload: CoreTrainingPresentation[] }>()
);

export const SetQuestionsFilter = createAction(
	'[PresentationState] SetQuestionsFilter',
	props<{ search: string; status: string; subjectId: string }>()
);
// For trainee saving questions & comment
export const SaveCoreTrainingPresentation = createAction(
	'[PresentationState] SaveCoreTrainingPresentation',
	props<{ data: CoreTrainingPresentation }>()
);
// For trainer saving score
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
	'[PresentationState] DeleteCoreTrainingPresentationComment',
	props<{ filename: string; itemId: string; commentId: string }>()
);
//#endregion
