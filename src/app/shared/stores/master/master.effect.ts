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
	map,
	switchMapTo,
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
		switchMapTo(this.leaderService.GetRoles()),
		mergeMap((res) => of(MasterStateAction.FetchRolesSuccess({ payload: res })))
	);

	@Effect()
	getUserInRoles$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchUserInRoles),
		switchMapTo(this.leaderService.GetUserInRoles()),
		mergeMap((res) =>
			of(MasterStateAction.FetchUserInRolesSuccess({ payload: res }))
		)
	);

	@Effect()
	getGenerations$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchGenerations),
		switchMapTo(this.leaderService.GetGenerations()),
		mergeMap((res) =>
			of(MasterStateAction.FetchGenerationsSuccess({ payload: res }))
		)
	);
	@Effect()
	getSubjects$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchSubjects),
		pluck('phaseId'),
		switchMap((phaseId) => this.generalService.GetSubjects(phaseId)),
		mergeMap((res) =>
			of(MasterStateAction.FetchSubjectsSuccess({ payload: res }))
		)
	);
	@Effect()
	getPhases$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchPhases),
		switchMapTo(this.generalService.GetPhasesCurrentGeneration()),
		mergeMap((res) =>
			of(MasterStateAction.FetchPhasesSuccess({ payload: res }))
		)
	);

	@Effect()
	getTraineeInPhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchTraineeInPhase),
		pluck('phaseId'),
		switchMap((phaseId) => this.leaderService.GetTraineesByPhase(phaseId)),
		mergeMap((res) =>
			of(MasterStateAction.FetchTraineeInPhaseSuccess({ payload: res }))
		)
	);

	@Effect()
	getSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchSchedules),
		pluck('subjectId'),
		switchMap((subjectId) => this.leaderService.GetSchedules(subjectId)),
		mergeMap((res) =>
			of(MasterStateAction.FetchSchedulesSuccess({ payload: res }))
		)
	);

	@Effect()
	getTraineeInSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchTraineeInSchedule),
		pluck('scheduleId'),
		switchMap((scheduleId) =>
			this.leaderService.GetTraineesByPhase(scheduleId)
		),
		mergeMap((res) =>
			of(MasterStateAction.FetchTraineeInScheduleSuccess({ payload: res }))
		)
	);

	@Effect()
	getInterviewSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchInterviewSchedules),
		switchMap(() => this.interviewService.GetInterviewSchedules()),
		mergeMap((res) =>
			of(MasterStateAction.FetchInterviewSchedulesSuccess({ payload: res }))
		)
	);
	@Effect()
	getInterviewQuestions$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchInterviewQuestions),
		switchMap(() => this.interviewService.GetInterviewQuestions()),
		mergeMap((res) =>
			of(MasterStateAction.FetchInterviewQuestionsSuccess({ payload: res }))
		)
	);
	@Effect()
	getInterviewQuestionDetails$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchInterviewQuestionDetails),
		pluck('interviewQuestionId'),
		switchMap((interviewQuestionId) =>
			this.interviewService.GetInterviewQuestionDetails(interviewQuestionId)
		),
		mergeMap((res) =>
			of(
				MasterStateAction.FetchInterviewQuestionDetailsSuccess({
					payload: res,
				})
			)
		)
	);
	//#endregion

	//#region create
	@Effect()
	createUserInRole$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateUserInRole),
		switchMap((action) =>
			of(
				MainStateAction.ToastMessage({
					messageType: 'danger',
					message: 'Failed in creating user role: Not implemented yet',
				})
			)
		)
	);
	@Effect()
	createGeneration$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateGeneration),
		switchMap((action) =>
			of(
				MainStateAction.ToastMessage({
					messageType: 'danger',
					message: 'Failed in creating generation: Not implemented yet',
				})
			)
		)
	);
	@Effect()
	createPhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreatePhase),
		switchMap((action) =>
			this.leaderService.SavePhase({ ...action, type: action.phaseType })
		),
		mergeMap((res) => {
			if (!res)
				return of(
					MainStateAction.ToastMessage({
						messageType: 'danger',
						message: 'Failed in creating phase',
					})
				);
			else return of(MasterStateAction.FetchPhases());
		})
	);
	@Effect()
	createTraineeInPhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateTraineeInPhase),
		switchMap((action) =>
			this.leaderService
				.SaveTraineesToPhase(action)
				.pipe(map((res) => ({ res, action })))
		),
		mergeMap(({ res, action }) => {
			if (!res)
				return of(
					MainStateAction.ToastMessage({
						messageType: 'danger',
						message: 'Failed in creating trainee',
					})
				);
			else
				return of(
					MasterStateAction.FetchTraineeInPhase({ phaseId: action.phaseId })
				);
		})
	);
	@Effect()
	createSubject$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateSubject),
		switchMap((action) =>
			this.leaderService
				.SaveSubject(action)
				.pipe(map((res) => ({ res, action })))
		),
		switchMap(({ res, action }) => {
			if (res)
				return this.leaderService
					.SaveMaximumFileSize({
						fileSize: action.maxFileSize + '',
						subjectId: '',
					})
					.pipe(
						mergeMap((res) => {
							if (res)
								return of(
									MasterStateAction.ActionSuccess({
										message: 'Successfully created subject',
									}),
									MasterStateAction.FetchSubjects({ phaseId: action.phaseId })
								);
						})
					);
			else
				return of(
					MainStateAction.ToastMessage({
						messageType: 'danger',
						message: 'Failed in creating subject: Not implemented yet',
					})
				);
		})
	);
	@Effect()
	createSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateSchedule),
		switchMap((action) =>
			of(
				MainStateAction.ToastMessage({
					messageType: 'danger',
					message: 'Failed in creating Schedule: Not implemented yet',
				})
			)
		)
	);
	@Effect()
	createTraineeInSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateTraineeInSchedule),
		switchMap((action) =>
			of(
				MainStateAction.ToastMessage({
					messageType: 'danger',
					message: 'Failed in creating TraineeInSchedule: Not implemented yet',
				})
			)
		)
	);
	@Effect()
	createInterviewQuestion$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateInterviewQuestion),
		switchMap((action) =>
			of(
				MainStateAction.ToastMessage({
					messageType: 'danger',
					message: 'Failed in creating InterviewQuestion: Not implemented yet',
				})
			)
		)
	);
	@Effect()
	createInterviewQuestionDetail$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateInterviewQuestionDetail),
		switchMap((action) =>
			of(
				MainStateAction.ToastMessage({
					messageType: 'danger',
					message:
						'Failed in creating InterviewQuestionDetail: Not implemented yet',
				})
			)
		)
	);
	@Effect()
	createInterviewSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateInterviewSchedule),
		switchMap((action) =>
			of(
				MainStateAction.ToastMessage({
					messageType: 'danger',
					message: 'Failed in creating InterviewSchedule: Not implemented yet',
				})
			)
		)
	);
	//#endregion

	//#region update
	@Effect()
	updatePhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.UpdatePhase),
		switchMap((action) => this.leaderService.UpdatePhase(action)),
		mergeMap((res) => {
			if (!res)
				return of(
					MainStateAction.ToastMessage({
						messageType: 'danger',
						message: 'Failed in updating phase',
					})
				);
			else return of(MasterStateAction.FetchPhases());
		})
	);

	//#endregion

	//#region delete
	@Effect()
	deletePhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeletePhase),
		switchMap(
			(action) =>
				of(
					MainStateAction.ToastMessage({
						messageType: 'danger',
						message: 'Failed in deleting phase: Not implemented yet',
					})
				)
			// return this.leaderService.dele(action).pipe(
			//   mergeMap(res => {
			// if(!res) return of(MasterStateAction.ToastMessage({message: 'Failed in deleting phase'}))
			// messageType: 'danger',
			//     else return of(MasterStateAction.FetchPhases())
			//   })
			// )
		)
	);

	@Effect()
	deleteTraineeInPhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeleteTraineeInPhase),
		switchMap((action) =>
			this.leaderService.DeleteTraineeInPhase(action).pipe(
				mergeMap((res) => {
					if (!res)
						return of(
							MainStateAction.ToastMessage({
								messageType: 'danger',
								message: 'Failed in Deleting trainee in phase',
							})
						);
					else return of(MasterStateAction.FetchPhases());
				})
			)
		)
	);

	//#endregion
}
