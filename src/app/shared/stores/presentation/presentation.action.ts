import { createAction, props } from '@ngrx/store';
import { CoreTrainingPresentation } from '../../models';

export const FetchPresentations = createAction(
	'[PresentationState] FetchPresentations',
	props<{ generationId: string, subjectId: string }>()
);

export const FetchPresentationStatus = createAction(
	'[PresentationState] FetchPresentationStatus',
	props<{ filename: string }>()
);

export const FetchPresentationsSuccess = createAction(
	'[PresentationState] FetchPresentationsSuccess',
	props<{ payload: CoreTrainingPresentation[] }>()
);

export const FetchPresentationStatusSuccess = createAction(
	'[PresentationState] FetchPresentationStatusSuccess',
	props<{ payload: string }>()
);