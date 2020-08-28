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
}

export const initialState: IPresentationState = {
  presentations: [],
};

export const PRESENTATIONSTATE_REDUCER_NAME = 'PresentationState';

export const PresentationStateReducer = createReducer(
	initialState,

  on(PresentationStateAction.FetchPresentationsSuccess, (state, {payload})=> ({
    ...state,
    presentations: payload
  }))

);

export const getPresentationState = createFeatureSelector<IPresentationState>(
	PRESENTATIONSTATE_REDUCER_NAME
);

export const getPresentationStateBy = (fn: (_: IPresentationState) => any) =>
	createSelector(getPresentationState, fn);

export const getPresentations = getPresentationStateBy((s) => s.presentations);
// export const getAnnouncements = getPresentationStateBy((s) => s.announcement);

// export const getCurrentGeneration = getPresentationStateBy((s) => s.currentGeneration);
// export const getCurrentRole = getPresentationStateBy((s) => s.currentRole);