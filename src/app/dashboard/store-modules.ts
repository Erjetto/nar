
import { MAINSTATE_REDUCER_NAME, MainStateReducer } from '../shared/stores/main/main.reducer';
import {
	CANDIDATE_REDUCER_NAME,
	CandidateStateReducer,
} from '../shared/stores/candidate/candidate.reducer';
import { CASESTATE_REDUCER_NAME, CaseStateReducer } from '../shared/stores/case/case.reducer';
import {
	MASTERSTATE_REDUCER_NAME,
	MasterStateReducer,
} from '../shared/stores/master/master.reducer';
import {
	PRESENTATIONSTATE_REDUCER_NAME,
	PresentationStateReducer,
} from '../shared/stores/presentation/presentation.reducer';
import { VOTESTATE_REDUCER_NAME, VoteStateReducer } from '../shared/stores/vote/vote.reducer';

import { MainStateEffects } from '../shared/stores/main/main.effect';
import { CandidateStateEffects } from '../shared/stores/candidate/candidate.effect';
import { CaseStateEffects } from '../shared/stores/case/case.effect';
import { MasterStateEffects } from '../shared/stores/master/master.effect';
import { PresentationStateEffects } from '../shared/stores/presentation/presentation.effect';
import { VoteStateEffects } from '../shared/stores/vote/vote.effect';
import { StoreModule } from '@ngrx/store';


export const ALL_STORES = [
	StoreModule.forFeature(MAINSTATE_REDUCER_NAME, MainStateReducer),
	StoreModule.forFeature(CASESTATE_REDUCER_NAME, CaseStateReducer),
	StoreModule.forFeature(CANDIDATE_REDUCER_NAME, CandidateStateReducer),
	StoreModule.forFeature(MASTERSTATE_REDUCER_NAME, MasterStateReducer),
	StoreModule.forFeature(PRESENTATIONSTATE_REDUCER_NAME, PresentationStateReducer),
	StoreModule.forFeature(VOTESTATE_REDUCER_NAME, VoteStateReducer),
];

export const ALL_EFFECTS = [
	MainStateEffects,
	CandidateStateEffects,
	CaseStateEffects,
	MasterStateEffects,
	PresentationStateEffects,
	VoteStateEffects,
];
