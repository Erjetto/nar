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
		mergeMap((res) => of(MasterStateAction.FetchUserInRolesSuccess({ payload: res })))
	);

	@Effect()
	getGenerations$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchGenerations),
		switchMapTo(this.leaderService.GetGenerations()),
		mergeMap((res) => of(MasterStateAction.FetchGenerationsSuccess({ payload: res })))
	);
	@Effect()
	getSubjects$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchSubjects),
		pluck('phaseId'),
		switchMap((phaseId) =>
			this.generalService.GetSubjects({ phaseId }).pipe(map((res) => ({ phaseId, res })))
		),
		mergeMap(({ phaseId, res }) => of(MasterStateAction.FetchSubjectsSuccess({ payload: res })))
	);
	@Effect()
	getPhases$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchPhases),
		switchMapTo(this.generalService.GetPhasesCurrentGeneration()),
		mergeMap((res) => of(MasterStateAction.FetchPhasesSuccess({ payload: res })))
	);

	@Effect()
	getTraineeInPhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchTraineeInPhase),
		pluck('phaseId'),
		switchMap((phaseId) => this.leaderService.GetTraineesByPhase({ phaseId })),
		mergeMap((res) => of(MasterStateAction.FetchTraineeInPhaseSuccess({ payload: res })))
	);

	@Effect()
	getSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchSchedules),
		pluck('subjectId'),
		switchMap((subjectId) => this.leaderService.GetSchedules({ subjectId })),
		mergeMap((res) => of(MasterStateAction.FetchSchedulesSuccess({ payload: res })))
	);

	@Effect()
	getTraineeInSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchTraineeInSchedule),
		pluck('scheduleId'),
		switchMap((scheduleId) => this.leaderService.GetTraineesBySchedule({ scheduleId })),
		mergeMap((res) => of(MasterStateAction.FetchTraineeInScheduleSuccess({ payload: res })))
	);

	@Effect()
	getInterviewSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchInterviewSchedules),
		switchMap(() => this.interviewService.GetInterviewSchedules()),
		mergeMap((res) => of(MasterStateAction.FetchInterviewSchedulesSuccess({ payload: res })))
	);
	@Effect()
	getInterviewQuestions$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchInterviewQuestions),
		switchMap(() => this.interviewService.GetInterviewQuestions()),
		mergeMap((res) => of(MasterStateAction.FetchInterviewQuestionsSuccess({ payload: res })))
	);
	@Effect()
	getInterviewQuestionDetails$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchInterviewQuestionDetails),
		switchMap((data) => this.interviewService.GetInterviewQuestionDetails(data)),
		mergeMap((res) => of(MasterStateAction.FetchInterviewQuestionDetailsSuccess({ payload: res })))
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
		switchMap((action) => this.leaderService.SavePhase({ ...action, type: action.phaseType })),
		mergeMap((res) =>
			res != null
				? of(MasterStateAction.FetchPhases())
				: of(
						MainStateAction.ToastMessage({
							messageType: 'danger',
							message: 'Failed in updating phase',
						})
				  )
		)
	);
	@Effect()
	createTraineeInPhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateTraineeInPhase),
		switchMap((action) =>
			this.leaderService.SaveTraineesToPhase(action).pipe(map((res) => ({ res, action })))
		),
		mergeMap(({ res, action }) =>
			res != null
				? of(MasterStateAction.FetchTraineeInPhase({ phaseId: action.phaseId }))
				: of(MainStateAction.FailMessage('Creating Trainee in Phase'))
		)
	);
	@Effect()
	createSubject$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateSubject),
		switchMap((action) =>
			this.leaderService.SaveSubject(action).pipe(map((res) => ({ res, action })))
		),
		switchMap(({ res, action }) => {
			// Nested Observable BAD! Do something?
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
			else return of(MainStateAction.NotImplementedMessage('Creating Subject'));
		})
	);
	@Effect()
	createSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateSchedule),
		switchMap((action) => of(MainStateAction.NotImplementedMessage('creating Schedule')))
	);

	@Effect()
	createTraineeInSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateTraineeInSchedule),
		switchMap((action) => of(MainStateAction.NotImplementedMessage('creating Schedule')))
	);

	@Effect()
	createInterviewQuestion$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateInterviewQuestion),
		switchMap((action) => of(MainStateAction.NotImplementedMessage('creating InterviewQuestion')))
	);
	@Effect()
	createInterviewQuestionDetail$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateInterviewQuestionDetail),
		switchMap((action) =>
			of(MainStateAction.NotImplementedMessage('creating InterviewQuestionDetail'))
		)
	);
	@Effect()
	createInterviewSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateInterviewSchedule),
		switchMap((action) => of(MainStateAction.NotImplementedMessage('creating InterviewSchedule')))
	);
	//#endregion

	//#region update
	@Effect()
	updatePhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.UpdatePhase),
		switchMap((action) => this.leaderService.UpdatePhase(action)),
		mergeMap((res) =>
			res != null
				? of(MasterStateAction.FetchPhases())
				: of(MainStateAction.FailMessage('Updating phase'))
		)
	);

	//#endregion

	//#region delete
	@Effect()
	deletePhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeletePhase),
		switchMap((action) => of(MainStateAction.NotImplementedMessage('deleting phase')))
	);

	@Effect()
	deleteTraineeInPhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeleteTraineeInPhase),
		switchMap((action) => this.leaderService.DeleteTraineeInPhase(action)),
		mergeMap((res) =>
			res != null
				? of(MasterStateAction.FetchPhases())
				: of(MainStateAction.NotImplementedMessage('Deleting trainee in phase'))
		)
	);

	//#endregion
}
