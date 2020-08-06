import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import { GenerationService } from '../../services/generation.service';
import * as MasterStateAction from './master.action';
import * as fromMasterState from './master.reducer';
import { Observable, from, of } from 'rxjs';
import {
	switchMap,
	withLatestFrom,
	mergeMap,
	share,
	tap,
	pluck,
	delay,
} from 'rxjs/operators';
import {
	ClientGeneration,
	ClientPhase,
	ClientSubject,
	ClientSchedule,
} from '../../models';
import { map } from 'lodash';
import { PhaseService } from '../../services/phase.service';
import { SubjectService } from '../../services/subject.service';
import { GeneralService } from '../../services/new/general.service';
import { AnnouncementService } from '../../services/new/announcement.service';
import { InterviewService } from '../../services/new/interview.service';
import { LeaderService } from '../../services/new/leader.service';
import { NoteService } from '../../services/new/note.service';
import { PresentationService } from '../../services/new/presentation.service';
import { TraineeAttendanceService } from '../../services/new/trainee-attendance.service';
import { TraineeService } from '../../services/new/trainee.service';
import { VoteService } from '../../services/new/vote.service';
import { MockData } from '../../mock-data';

@Injectable({
	providedIn: 'root',
})
export class MasterStateEffects {
	constructor(
		private actions$: Actions,
		private store: Store<fromMasterState.IMasterState>,
		private generalService: GeneralService,
		private announcementService: AnnouncementService,
		private interviewService: InterviewService,
		private leaderService: LeaderService,
		private noteService: NoteService,
		private presentationService: PresentationService,
		private traineeAttendanceService: TraineeAttendanceService,
		private traineeService: TraineeService,
		private voteService: VoteService
	) {}

	@Effect()
	getRoles$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchRoles),
		switchMap(() => {
			return this.leaderService
				.GetRoles()
				.pipe(
					mergeMap((res) =>
						of(MasterStateAction.FetchRolesSuccess({ payload: res }))
					)
				);
		})
	);
	@Effect()
	getUserInRoles$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchUserInRoles),
		switchMap(() => {
			return this.leaderService
				.GetUserInRoles()
				.pipe(
					mergeMap((res) =>
						of(MasterStateAction.FetchUserInRolesSuccess({ payload: res }))
					)
				);
		})
	);
	@Effect()
	getGenerations$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchGenerations),
		switchMap(() => {
			return this.leaderService
				.GetGenerations()
				.pipe(
					mergeMap((res) =>
						of(MasterStateAction.FetchGenerationsSuccess({ payload: res }))
					)
				);
		})
	);
	@Effect()
	getSubjects$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchSubjects),
		switchMap(() => {
			return this.generalService
				.GetSubjects()
				.pipe(
					mergeMap((res) =>
						of(MasterStateAction.FetchSubjectsSuccess({ payload: res }))
					)
				);
		})
	);
	@Effect()
	getPhases$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchPhases),
		switchMap(() => {
			return this.generalService
				.GetPhasesCurrentGeneration()
				.pipe(
					mergeMap((res) =>
						of(MasterStateAction.FetchPhasesSuccess({ payload: res }))
					)
				);
		})
	);
	@Effect()
	getTraineeInPhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchTraineeInPhase),
		pluck('phaseId'),
		switchMap((phaseId) => {
			return this.leaderService
				.GetTraineesByPhase(phaseId)
				.pipe(
					mergeMap((res) =>
						of(MasterStateAction.FetchTraineeInPhaseSuccess({ payload: res }))
					)
				);
		})
	);
	@Effect()
	getSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchSchedules),
		pluck('subjectId'),
		switchMap((subjectId) => {
			return this.leaderService
				.GetSchedules(subjectId)
				.pipe(
					mergeMap((res) =>
						of(MasterStateAction.FetchSchedulesSuccess({ payload: res }))
					)
				);
		})
	);
	@Effect()
	getTraineeInSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchTraineeInSchedule),
		pluck('scheduleId'),
		switchMap((scheduleId) => {
			return this.leaderService
				.GetTraineesByPhase(scheduleId)
				.pipe(
					mergeMap((res) =>
						of(MasterStateAction.FetchTraineeInScheduleSuccess({ payload: res }))
					)
				);
		})
	);
	@Effect()
	getInterviewSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchInterviewSchedules),
		switchMap(() => {
			return this.interviewService
				.GetInterviewSchedules()
				.pipe(
					mergeMap((res) =>
						of(
							MasterStateAction.FetchInterviewSchedulesSuccess({ payload: res })
						)
					)
				);
		})
	);
	@Effect()
	getInterviewQuestions$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchInterviewQuestions),
		switchMap(() => {
			return this.interviewService
				.GetInterviewQuestions()
				.pipe(
					mergeMap((res) =>
						of(
							MasterStateAction.FetchInterviewQuestionsSuccess({ payload: res })
						)
					)
				);
		})
	);
	@Effect()
	getInterviewQuestionDetails$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchInterviewQuestionDetails),
		pluck('interviewQuestionId'),
		switchMap((interviewQuestionId) => {
			return this.interviewService
				.GetInterviewQuestionDetails(interviewQuestionId)
				.pipe(
					mergeMap((res) =>
						of(MasterStateAction.FetchInterviewQuestionDetailsSuccess({payload: res,})
						)
					)
				);
		})
	);
}
