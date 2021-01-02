import { StoreModule } from '@ngrx/store';

import * as BinusianStateAction from 'src/app/shared/stores/binusian/binusian.action';
import * as CandidateStateAction from 'src/app/shared/stores/candidate/candidate.action';
import * as CaseStateAction from 'src/app/shared/stores/case/case.action';
import * as InterviewStateAction from 'src/app/shared/stores/interview/interview.action';
import * as MainStateAction from 'src/app/shared/stores/main/main.action';
import * as MasterStateAction from 'src/app/shared/stores/master/master.action';
import * as PresentationStateAction from 'src/app/shared/stores/presentation/presentation.action';
import * as VoteStateAction from 'src/app/shared/stores/vote/vote.action';
import * as AttendanceStateAction from 'src/app/shared/stores/attendance/attendance.action';
import * as NoteStateAction from 'src/app/shared/stores/note/note.action';
import * as LogStateAction from 'src/app/shared/stores/log/log.action';

import {
	BINUSIANSTATE_REDUCER_NAME,
	BinusianStateReducer,
} from 'src/app/shared/stores/binusian/binusian.reducer';
import {
	CANDIDATE_REDUCER_NAME,
	CandidateStateReducer,
} from 'src/app/shared/stores/candidate/candidate.reducer';
import { CASESTATE_REDUCER_NAME, CaseStateReducer } from 'src/app/shared/stores/case/case.reducer';
import {
	INTERVIEWSTATE_REDUCER_NAME,
	InterviewStateReducer,
} from 'src/app/shared/stores/interview/interview.reducer';
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
import { NOTESTATE_REDUCER_NAME, NoteStateReducer } from 'src/app/shared/stores/note/note.reducer';
import {
	ATTENDANCESTATE_REDUCER_NAME,
	AttendanceStateReducer,
} from 'src/app/shared/stores/attendance/attendance.reducer';
import {
	LOGSTATE_REDUCER_NAME,
	LogStateReducer,
} from 'src/app/shared/stores/log/log.reducer';

import * as fromAppState from 'src/app/app.reducer';
import * as fromAttendanceState from 'src/app/shared/stores/attendance/attendance.reducer';
import * as fromNoteState from 'src/app/shared/stores/note/note.reducer';
import * as fromBinusianState from 'src/app/shared/stores/binusian/binusian.reducer';
import * as fromCandidateState from 'src/app/shared/stores/candidate/candidate.reducer';
import * as fromCaseState from 'src/app/shared/stores/case/case.reducer';
import * as fromInterviewState from 'src/app/shared/stores/interview/interview.reducer';
import * as fromMainState from 'src/app/shared/stores/main/main.reducer';
import * as fromMasterState from 'src/app/shared/stores/master/master.reducer';
import * as fromPresentationState from 'src/app/shared/stores/presentation/presentation.reducer';
import * as fromVoteState from 'src/app/shared/stores/vote/vote.reducer';
import * as fromLogState from 'src/app/shared/stores/log/log.reducer';

import { AttendanceStateEffects } from 'src/app/shared/stores/attendance/attendance.effect';
import { NoteStateEffects } from 'src/app/shared/stores/note/note.effect';
import { BinusianStateEffects } from 'src/app/shared/stores/binusian/binusian.effect';
import { CandidateStateEffects } from 'src/app/shared/stores/candidate/candidate.effect';
import { CaseStateEffects } from 'src/app/shared/stores/case/case.effect';
import { InterviewStateEffects } from 'src/app/shared/stores/interview/interview.effect';
import { MainStateEffects } from 'src/app/shared/stores/main/main.effect';
import { MasterStateEffects } from 'src/app/shared/stores/master/master.effect';
import { PresentationStateEffects } from 'src/app/shared/stores/presentation/presentation.effect';
import { VoteStateEffects } from 'src/app/shared/stores/vote/vote.effect';
import { LogStateEffects } from 'src/app/shared/stores/log/log.effect';

export {
	// Get all state getter
	fromAppState,
	fromAttendanceState,
	fromNoteState,
	fromBinusianState,
	fromCandidateState,
	fromCaseState,
	fromInterviewState,
	fromMainState,
	fromMasterState,
	fromPresentationState,
	fromVoteState,
	fromLogState,
  // Get all action
  AttendanceStateAction,
  NoteStateAction,
	BinusianStateAction,
	CandidateStateAction,
	CaseStateAction,
	InterviewStateAction,
	MainStateAction,
	MasterStateAction,
	PresentationStateAction,
	VoteStateAction,
	LogStateAction,
  // Get all reducer (doubt I'll need it)
  AttendanceStateReducer,
  NoteStateReducer,
	MainStateReducer,
	CaseStateReducer,
	CandidateStateReducer,
	InterviewStateReducer,
	MasterStateReducer,
	PresentationStateReducer,
	BinusianStateReducer,
	VoteStateReducer,
	LogStateReducer,
  // Get all effects (only if you want to observe/subscribe the effect)
  AttendanceStateEffects,
  NoteStateEffects,
	MainStateEffects,
	CandidateStateEffects,
	CaseStateEffects,
	InterviewStateEffects,
	MasterStateEffects,
	PresentationStateEffects,
	BinusianStateEffects,
	VoteStateEffects,
	LogStateEffects,
};

export const ALL_STORES = [
	StoreModule.forFeature(ATTENDANCESTATE_REDUCER_NAME, AttendanceStateReducer),
	StoreModule.forFeature(NOTESTATE_REDUCER_NAME, NoteStateReducer),
	StoreModule.forFeature(MAINSTATE_REDUCER_NAME, MainStateReducer),
	StoreModule.forFeature(CASESTATE_REDUCER_NAME, CaseStateReducer),
	StoreModule.forFeature(CANDIDATE_REDUCER_NAME, CandidateStateReducer),
	StoreModule.forFeature(INTERVIEWSTATE_REDUCER_NAME, InterviewStateReducer),
	StoreModule.forFeature(MASTERSTATE_REDUCER_NAME, MasterStateReducer),
	StoreModule.forFeature(PRESENTATIONSTATE_REDUCER_NAME, PresentationStateReducer),
	StoreModule.forFeature(BINUSIANSTATE_REDUCER_NAME, BinusianStateReducer),
	StoreModule.forFeature(VOTESTATE_REDUCER_NAME, VoteStateReducer),
	StoreModule.forFeature(LOGSTATE_REDUCER_NAME, LogStateReducer),
];

export const ALL_EFFECTS = [
	AttendanceStateEffects,
	NoteStateEffects,
	MainStateEffects,
	CandidateStateEffects,
	CaseStateEffects,
	InterviewStateEffects,
	MasterStateEffects,
	PresentationStateEffects,
	BinusianStateEffects,
	VoteStateEffects,
	LogStateEffects,
];
