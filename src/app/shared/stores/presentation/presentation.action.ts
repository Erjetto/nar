import { createAction, props } from '@ngrx/store';
import { CoreTrainingPresentation, TraineePresentation } from '../../models';

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
	props<{ payload: CoreTrainingPresentation[], subjectId: string }>()
);
export const FetchPresentationsByTraineeSuccess = createAction(
	'[PresentationState] FetchPresentationsByTraineeSuccess',
	props<{ payload: CoreTrainingPresentation[], traineeId: string }>()
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
