import { StoreModule } from '@ngrx/store';

import * as BinusianStateAction from 'src/app/shared/stores/binusian/binusian.action';
import * as CandidateStateAction from 'src/app/shared/stores/candidate/candidate.action';
import * as CaseStateAction from 'src/app/shared/stores/case/case.action';
import * as InterviewStateAction from 'src/app/shared/stores/interview/interview.action';
import * as MainStateAction from 'src/app/shared/stores/main/main.action';
import * as MasterStateAction from 'src/app/shared/stores/master/master.action';
import * as PresentationStateAction from 'src/app/shared/stores/presentation/presentation.action';
import * as VoteStateAction from 'src/app/shared/stores/vote/vote.action';

import {
	BINUSIANSTATE_REDUCER_NAME,
	BinusianStateReducer,
} from 'src/app/shared/stores/binusian/binusian.reducer';
import {
	CANDIDATE_REDUCER_NAME,
	CandidateStateReducer,
} from 'src/app/shared/stores/candidate/candidate.reducer';
import { CASESTATE_REDUCER_NAME, CaseStateReducer } from 'src/app/shared/stores/case/case.reducer';
import { INTERVIEWSTATE_REDUCER_NAME, InterviewStateReducer } from 'src/app/shared/stores/interview/interview.reducer';
import { MAINSTATE_REDUCER_NAME, MainStateReducer } from 'src/app/shared/stores/main/main.reducer';
import {
	MASTERSTATE_REDUCER_NAME,
	MasterStateReducer,
} from 'src/app/shared/stores/master/master.reducer';
import {
	PRESENTATIONSTATE_REDUCER_NAME,
	PresentationStateReducer,
} from 'src/app/shared/stores/presentation/presentation.reducer';
import { VOTESTATE_REDUCER_NAME, VoteStateReducer } from 'src/app/shared/stores/vote/vote.reducer';

import * as fromBinusianState from 'src/app/shared/stores/binusian/binusian.reducer';
import * as fromCandidateState from 'src/app/shared/stores/candidate/candidate.reducer';
import * as fromCaseState from 'src/app/shared/stores/case/case.reducer';
import * as fromInterviewState from 'src/app/shared/stores/interview/interview.reducer';
import * as fromMainState from 'src/app/shared/stores/main/main.reducer';
import * as fromMasterState from 'src/app/shared/stores/master/master.reducer';
import * as fromPresentationState from 'src/app/shared/stores/presentation/presentation.reducer';
import * as fromVoteState from 'src/app/shared/stores/vote/vote.reducer';

import { BinusianStateEffects } from 'src/app/shared/stores/binusian/binusian.effect';
import { CandidateStateEffects } from 'src/app/shared/stores/candidate/candidate.effect';
import { CaseStateEffects } from 'src/app/shared/stores/case/case.effect';
import { InterviewStateEffects } from 'src/app/shared/stores/interview/interview.effect';
import { MainStateEffects } from 'src/app/shared/stores/main/main.effect';
import { MasterStateEffects } from 'src/app/shared/stores/master/master.effect';
import { PresentationStateEffects } from 'src/app/shared/stores/presentation/presentation.effect';
import { VoteStateEffects } from 'src/app/shared/stores/vote/vote.effect';

export {
  // Get all state getter
	fromBinusianState,
	fromCandidateState,
	fromCaseState,
	fromInterviewState,
	fromMainState,
	fromMasterState,
	fromPresentationState,
  fromVoteState,
  
  // Get all action
	BinusianStateAction,
	CandidateStateAction,
	CaseStateAction,
	InterviewStateAction,
	MainStateAction,
	MasterStateAction,
	PresentationStateAction,
	VoteStateAction,
  
  // Get all reducer (doubt I'll need it)
  MainStateReducer,
	CaseStateReducer,
	CandidateStateReducer,
	InterviewStateReducer,
	MasterStateReducer,
	PresentationStateReducer,
	VoteStateReducer,
	BinusianStateReducer,
  
  // Get all effects (only if you want to observe/subscribe the effect)
  MainStateEffects,
	CandidateStateEffects,
	CaseStateEffects,
	InterviewStateEffects,
	MasterStateEffects,
	PresentationStateEffects,
	VoteStateEffects,
	BinusianStateEffects,
};

export const ALL_STORES = [
	StoreModule.forFeature(MAINSTATE_REDUCER_NAME, MainStateReducer),
	StoreModule.forFeature(CASESTATE_REDUCER_NAME, CaseStateReducer),
	StoreModule.forFeature(CANDIDATE_REDUCER_NAME, CandidateStateReducer),
	StoreModule.forFeature(INTERVIEWSTATE_REDUCER_NAME, InterviewStateReducer),
	StoreModule.forFeature(MASTERSTATE_REDUCER_NAME, MasterStateReducer),
	StoreModule.forFeature(PRESENTATIONSTATE_REDUCER_NAME, PresentationStateReducer),
	StoreModule.forFeature(VOTESTATE_REDUCER_NAME, VoteStateReducer),
	StoreModule.forFeature(BINUSIANSTATE_REDUCER_NAME, BinusianStateReducer),
];

export const ALL_EFFECTS = [
	MainStateEffects,
	CandidateStateEffects,
	CaseStateEffects,
	InterviewStateEffects,
	MasterStateEffects,
	PresentationStateEffects,
	VoteStateEffects,
	BinusianStateEffects,
];
