import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

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

import * as MasterStateAction from './master.action';
import * as fromMasterState from './master.reducer';

import * as MainStateAction from '../main/main.action';
import * as fromMainState from '../main/main.reducer';

import { GeneralService } from '../../services/new/general.service';
import { AnnouncementService } from '../../services/new/announcement.service';
import { InterviewService } from '../../services/new/interview.service';
import { LeaderService } from '../../services/new/leader.service';
import { NoteService } from '../../services/new/note.service';
import { PresentationService } from '../../services/new/presentation.service';
import { TraineeAttendanceService } from '../../services/new/trainee-attendance.service';
import { TraineeService } from '../../services/new/trainee.service';
import { VoteService } from '../../services/new/vote.service';

@Injectable({
	providedIn: 'root',
})
export class MasterStateEffects {
	constructor(
		private actions$: Actions,
		private masterStore: Store<fromMasterState.IMasterState>,
		private mainStore: Store<fromMainState.IMainState>,
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

  //#region get
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
    pluck('phaseId'),
		switchMap((phaseId) => {
			return this.generalService
				.GetSubjects(phaseId)
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
  //#endregion
  
  //#region create
  @Effect()
  createPhase$: Observable<Action> = this.actions$.pipe(
    ofType(MasterStateAction.CreatePhase),
    switchMap(action => {
      return this.leaderService.SavePhase({...action, type: action.phaseType}).pipe(
        mergeMap(res => {
          if(!res) return of(MasterStateAction.DeleteFailed({message: 'Failed in creating phase'}))
          else return of(MasterStateAction.FetchPhases())
        })
      )
    })
  );
  @Effect()
  createTraineeInPhase$: Observable<Action> = this.actions$.pipe(
    ofType(MasterStateAction.CreateTraineeInPhase),
    switchMap(action => {
      return this.leaderService.SaveTraineesToPhase(action).pipe(
        mergeMap(res => {
          if(!res) return of(MasterStateAction.DeleteFailed({message: 'Failed in creating trainee'}))
          else return of(MasterStateAction.FetchTraineeInPhase({phaseId: action.phaseId}))
        })
      )
    })
  );
  //#endregion

  //#region 
  @Effect()
  updatePhase$: Observable<Action> = this.actions$.pipe(
    ofType(MasterStateAction.UpdatePhase),
    switchMap(action => {
      return this.leaderService.UpdatePhase(action).pipe(
        mergeMap(res => {
          if(!res) return of(MasterStateAction.DeleteFailed({message: 'Failed in updating phase'}))
          else return of(MasterStateAction.FetchPhases())
        })
      )
    })
  );
  

  //#endregion

}
