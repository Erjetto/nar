import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as PresentationStateAction from './presentation.action';
import * as MainStateAction from '../main/main.action';
import { CoreTrainingPresentation } from '../../models';

export interface IPresentationState {
	presentationsEntity: { [subjectId: string]: CoreTrainingPresentation[] };
	presentations: CoreTrainingPresentation[];

	presentationStatus: string;
	loadingPresentations: boolean;
}

export const initialState: IPresentationState = {
	presentationsEntity: {},
	presentations: [],

	presentationStatus: '',
	loadingPresentations: false,
};

export const PRESENTATIONSTATE_REDUCER_NAME = 'PresentationState';

export const PresentationStateReducer = createReducer(
	initialState,
  // Remove all data when generation changed
	on(MainStateAction.ChangeGenerationSuccess, () => ({
		...initialState,
	})),

	on(PresentationStateAction.FetchPresentations, (state) => ({
		...state,
		loadingPresentations: true,
	})),

	on(PresentationStateAction.FetchPresentationsSuccess, (state, { payload }) => ({
		...state,
		loadingPresentations: false,
		presentations: payload,
		presentationsEntity: payload.reduce(
			(acc, curr) => (acc[curr.SubjectId] = [...acc[curr.SubjectId], curr]),
			{}
		),
	})),

	on(PresentationStateAction.FetchPresentationStatus, (state) => ({
		...state,
		presentationStatus: 'Loading...',
	})),

	on(PresentationStateAction.FetchPresentationStatusSuccess, (state, { payload }) => ({
		...state,
		presentationStatus: payload,
	}))
);

export const getPresentationState = createFeatureSelector<IPresentationState>(
	PRESENTATIONSTATE_REDUCER_NAME
);

export const getPresentationStateBy = (fn: (_: IPresentationState) => any) =>
	createSelector(getPresentationState, fn);

export const getPresentations = getPresentationStateBy((s) => s.presentations);
export const getPresentationStatus = getPresentationStateBy((s) => s.presentationStatus);
export const isPresentationsLoading = getPresentationStateBy((s) => s.loadingPresentations);
// export const getAnnouncements = getPresentationStateBy((s) => s.announcement);

// export const getCurrentGeneration = getPresentationStateBy((s) => s.currentGeneration);
// export const getCurrentRole = getPresentationStateBy((s) => s.currentRole);
