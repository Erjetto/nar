import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';

import * as PresentationStateAction from './presentation.action';
import { Toast, Message, CoreTrainingPresentation } from '../../models';
import { drop, filter, min, max } from 'lodash';

export interface IPresentationState {
  presentations: CoreTrainingPresentation[];

  loadingPresentations: boolean;
}

export const initialState: IPresentationState = {
  presentations: [],

  loadingPresentations: false,
};

export const PRESENTATIONSTATE_REDUCER_NAME = 'PresentationState';

export const PresentationStateReducer = createReducer(
	initialState,

  on(PresentationStateAction.FetchPresentations, (state)=> ({
    ...state,
    loadingPresentations: true
  })),

  on(PresentationStateAction.FetchPresentationsSuccess, (state, {payload})=> ({
    ...state,
    loadingPresentations: false,
    presentations: payload
  })),

);

export const getPresentationState = createFeatureSelector<IPresentationState>(
	PRESENTATIONSTATE_REDUCER_NAME
);

export const getPresentationStateBy = (fn: (_: IPresentationState) => any) =>
	createSelector(getPresentationState, fn);

export const getPresentations = getPresentationStateBy((s) => s.presentations);
export const isPresentationsLoading = getPresentationStateBy((s) => s.loadingPresentations);
// export const getAnnouncements = getPresentationStateBy((s) => s.announcement);

// export const getCurrentGeneration = getPresentationStateBy((s) => s.currentGeneration);
// export const getCurrentRole = getPresentationStateBy((s) => s.currentRole);