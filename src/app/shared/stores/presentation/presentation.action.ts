import { createAction, props } from '@ngrx/store';
import { CoreTrainingPresentation } from '../../models';

export const FetchPresentations = createAction(
	'[MainState] FetchPresentations',
	props<{ generationId: string, subjectId: string }>()
);

export const FetchPresentationStatus = createAction(
	'[MainState] FetchPresentationStatus',
	props<{ filename: string }>()
);

export const FetchPresentationsSuccess = createAction(
	'[MainState] FetchPresentationsSuccess',
	props<{ payload: CoreTrainingPresentation[] }>()
);

export const FetchPresentationStatusSuccess = createAction(
	'[MainState] FetchPresentationStatusSuccess',
	props<{ payload: string }>()
);
