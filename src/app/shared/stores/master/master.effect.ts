import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
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

import * as MasterStateAction from 'src/app/shared/stores/master/master.action';
import * as fromMasterState from 'src/app/shared/stores/master/master.reducer';
import * as MainStateAction from 'src/app/shared/stores/main/main.action';
import * as fromMainState from 'src/app/shared/stores/main/main.reducer';
import * as BinusianStateAction from 'src/app/shared/stores/binusian/binusian.action';
import * as fromBinusianState from 'src/app/shared/stores/binusian/binusian.reducer';

import { GeneralService } from 'src/app/shared/services/new/general.service';
import { AnnouncementService } from 'src/app/shared/services/new/announcement.service';
import { InterviewService } from 'src/app/shared/services/new/interview.service';
import { LeaderService } from 'src/app/shared/services/new/leader.service';
import { NoteService } from 'src/app/shared/services/new/note.service';
import { PresentationService } from 'src/app/shared/services/new/presentation.service';
import { TraineeAttendanceService } from 'src/app/shared/services/new/trainee-attendance.service';
import { TraineeService } from 'src/app/shared/services/new/trainee.service';
import { VoteService } from 'src/app/shared/services/new/vote.service';
import { IAppState } from 'src/app/app.reducer';

import { ClientTrainee } from 'src/app/shared/models';

@Injectable({
	providedIn: 'root',
})
export class MasterStateEffects {
	constructor(
		private actions$: Actions,
		private store: Store<IAppState>,
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
		mergeMap(({ phaseId, res }) =>
			of(MasterStateAction.FetchSubjectsSuccess({ payload: res, phaseId }))
		)
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
		switchMap((phaseId) =>
			this.leaderService.GetTraineesByPhase({ phaseId }).pipe(map((res) => ({ phaseId, res })))
		),
		mergeMap(({ phaseId, res }) =>
			of(MasterStateAction.FetchTraineeInPhaseSuccess({ payload: res, phaseId }))
		)
	);

	@Effect()
	getSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchSchedules),
		pluck('subjectId'),
		switchMap((subjectId) =>
			this.leaderService.GetSchedules({ subjectId }).pipe(map((res) => ({ subjectId, res })))
		),
		mergeMap(({ subjectId, res }) =>
			of(MasterStateAction.FetchSchedulesSuccess({ payload: res, subjectId }))
		)
	);

	@Effect()
	getTraineeInSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchTraineeInSchedule),
		pluck('scheduleId'),
		switchMap((scheduleId) =>
			this.leaderService
				.GetTraineesBySchedule({ scheduleId })
				.pipe(map((res) => ({ scheduleId, res })))
		),
		mergeMap(({ scheduleId, res }) =>
			of(MasterStateAction.FetchTraineeInScheduleSuccess({ payload: res, scheduleId }))
		)
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
		switchMap((data) =>
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
		switchMap((data) => this.leaderService.SaveGeneration(data)),
		mergeMap((res) =>
			res === true
				? of(
						MainStateAction.CreateSuccess(),
						MainStateAction.SuccessfullyMessage('created generation')
				  )
				: of(MainStateAction.FailMessage('creating generation'))
		)
	);
	@Effect()
	createPhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreatePhase),
		switchMap((data) => this.leaderService.SavePhase({ ...data, type: data.phaseType })),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.CreateSuccess(), MainStateAction.SuccessfullyMessage('created phase'))
				: of(MainStateAction.FailMessage('creating phase'))
		)
	);
	@Effect()
	createTraineeInPhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateTraineeInPhase),
		switchMap((data) =>
			this.leaderService.SaveTraineesToPhase(data).pipe(map((res) => ({ res, data })))
		),
		mergeMap(({ res, data }) =>
			res != null
				? of(
						MainStateAction.CreateSuccess(),
						MainStateAction.SuccessfullyMessage('created trainee in phase')
				  )
				: of(MainStateAction.FailMessage('Creating Trainee in Phase'))
		)
	);
	@Effect()
	createSubject$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateSubject),
		switchMap((data) => this.leaderService.SaveSubject(data).pipe(map((res) => ({ res, data })))),
		mergeMap(({ res, data }) => {
			// Nested Observable BAD? Do something?
			if (res)
				return this.leaderService
					.SaveMaximumFileSize({
						fileSize: data.maxFileSize + '',
						subjectId: '',
					})
					.pipe(
						mergeMap((result) =>
							result
								? of(
										MainStateAction.CreateSuccess(),
										MainStateAction.SuccessfullyMessage('created subject')
								  )
								: of(MainStateAction.FailMessage('creating subject limit size'))
						)
					);
			else return of(MainStateAction.FailMessage('creating subject'));
		})
	);
	@Effect()
	createSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateSchedule),
		switchMap((data) => of(MainStateAction.NotImplementedMessage('creating Schedule')))
	);

	@Effect()
	createTraineeInSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateTraineeInSchedule),
		withLatestFrom(this.store.pipe(select(fromBinusianState.getTrainees))),
		switchMap(([data, trainees]) => {
			// If there's a trainee who can't be found in trainee list, toast error message
			const invalidTrainees = data.binusianNumbers.filter(
				(b) => trainees.find((t: ClientTrainee) => t.TraineeNumber === b) == null
			);
			if (invalidTrainees.length > 0)
				return from(
					invalidTrainees.map((num) =>
						MainStateAction.ToastMessage({
							messageType: 'danger',
							message: `Trainee(s) ${num} doesn't exist`,
						})
					)
				);
			else
				return this.leaderService
					.SaveTraineesToSchedule(data)
					.pipe(
						map((res) =>
							res === true
								? MainStateAction.SuccessfullyMessage('created trainees in schedule')
								: MainStateAction.FailMessage('Saving trainee to schedule')
						)
					);
		})
	);

	@Effect()
	createInterviewQuestion$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateInterviewQuestion),
		switchMap((data) => this.leaderService.SaveInterviewQuestions(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('created interview questions'))
				: of(MainStateAction.FailMessage('Saving interview questions'))
		)
	);
	@Effect()
	createInterviewQuestionDetail$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateInterviewQuestionDetail),
		switchMap((data) =>
			of(MainStateAction.NotImplementedMessage('creating InterviewQuestionDetail'))
		)
	);
	@Effect()
	createInterviewSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateInterviewSchedule),
		switchMap((data) => of(MainStateAction.NotImplementedMessage('creating InterviewSchedule')))
	);
	//#endregion

	//#region update
	@Effect()
	updateGeneration$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.UpdateGeneration),
		switchMap((data) => this.leaderService.UpdateGeneration(data)),
		mergeMap((res) =>
			res != null
				? of(
						MainStateAction.UpdateSuccess(),
						MainStateAction.SuccessfullyMessage('updating generation')
				  )
				: of(MainStateAction.FailMessage('updating generation'))
		)
	);
	@Effect()
	updatePhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.UpdatePhase),
		switchMap((data) => this.leaderService.UpdatePhase(data)),
		mergeMap((res) =>
			res != null
				? of(MainStateAction.UpdateSuccess(), MainStateAction.SuccessfullyMessage('updating phase'))
				: of(MainStateAction.FailMessage('updating phase'))
		)
	);
	// @Effect()
	// updateSubject$: Observable<Action> = this.actions$.pipe(
	// 	ofType(MasterStateAction.UpdateSubject),
	// 	switchMap((data) => this.leaderService.UpdateSubject(data)),
	// 	mergeMap((res) =>
	// 		res != null
	// 			? of(MainStateAction.SuccessfullyMessage('updating phase'))
	// 			: of(MainStateAction.FailMessage('updating phase'))
	// 	)
	// );

	//#endregion

	//#region delete
	@Effect()
	deletePhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeletePhase),
		switchMap((data) => this.leaderService.DeletePhase(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.DeleteSuccess(), MainStateAction.SuccessfullyMessage('deleted phase'))
				: of(MainStateAction.FailMessage('deleted phase'))
		)
	);

	@Effect()
	deleteTraineeInPhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeleteTraineeInPhase),
		switchMap((data) => this.leaderService.DeleteTraineeInPhase(data)),
		mergeMap((res) =>
			res != null
				? of(
						MainStateAction.DeleteSuccess(),
						MainStateAction.SuccessfullyMessage('deleted trainee in phase')
				  )
				: of(MainStateAction.FailMessage('delete trainee in phase'))
		)
	);

	@Effect()
	deleteSubject$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeleteSubject),
		switchMap((data) => of(MainStateAction.NotImplementedMessage('deleting phase')))
	);

	@Effect()
	deleteSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeleteSchedule),
		switchMap((data) => this.leaderService.DeleteSchedule(data)),
		mergeMap((res) =>
			res != null
				? of(
						MainStateAction.DeleteSuccess(),
						MainStateAction.SuccessfullyMessage('deleted schedule')
				  )
				: of(MainStateAction.FailMessage('delete schedule'))
		)
	);

	@Effect()
	deleteTraineeInSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeleteTraineeInSchedule),
		switchMap((data) => this.leaderService.DeleteTraineeInSchedule(data)),
		mergeMap((res) =>
			res != null
				? of(
						MainStateAction.DeleteSuccess(),
						MainStateAction.SuccessfullyMessage('deleted trainee in schedule')
				  )
				: of(MainStateAction.FailMessage('delete trainee in schedule'))
		)
	);
	//#endregion
}
