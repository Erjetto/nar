import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, from, of, forkJoin } from 'rxjs';
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
	catchError,
	exhaustMap,
	defaultIfEmpty,
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
import { isEmpty as _isEmpty } from 'lodash';
import { RESTService } from '../../services/new/rest.service';
import { TrainerAttendanceService } from '../../services/new/trainer-attendance.service';

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
		private trainerAttendanceService: TrainerAttendanceService,
		private traineeService: TraineeService,
		private voteService: VoteService,
		private restService: RESTService
	) {}

	//#region get
	@Effect()
	getRoles$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchRoles),
		switchMapTo(this.leaderService.GetRoles()),
		mergeMap((res) => of(MasterStateAction.FetchRolesSuccess({ payload: res }))),
		share()
	);

	@Effect()
	getUserInRoles$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchUserInRoles),
		switchMapTo(this.leaderService.GetUserInRoles()),
		mergeMap((res) => of(MasterStateAction.FetchUserInRolesSuccess({ payload: res }))),
		share()
	);

	@Effect()
	getGenerations$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchGenerations),
		switchMapTo(this.leaderService.GetGenerations()),
		mergeMap((res) => of(MasterStateAction.FetchGenerationsSuccess({ payload: res }))),
		share()
	);
	@Effect()
	getSubjects$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchSubjects),
		withLatestFrom(this.store.pipe(select(fromMasterState.getMaxFileSizes))),
		switchMap(([data, sizes]) =>
			this.generalService
				.GetSubjects(data)
				.pipe(map((res) => ({ phaseId: data.phaseId, res, sizes })))
		),
		switchMap(({ phaseId, res, sizes }) =>
			res.length === 0
				? of({ phaseId, res }) // Kalo ngga ada subject skip GetMaxFileSize
				: forkJoin(
						// Get maximum file size for each subject
						// Expectation: {'DB Id': 10000, 'Laravel Id': 1000000, 'C Id': 100,...}
						// Pake Object instead of array karena takut urutannya sembarangan
						// Possible Bug: Jika ada yg GetMaxFileSize nya error jadi ngga dapat semua
						res.reduce(
							(acc, sbj) => ({
								...acc,
								// Ambil dari state jika sudah ada, request jika blum ada
								[sbj.SubjectId]: sizes[sbj.SubjectId]
									? of(sizes[sbj.SubjectId])
									: this.leaderService.GetMaximumFileSize({ subjectId: sbj.SubjectId }),
							}),
							{}
						)
				  ).pipe(
						map((values: any) => {
							// if no filesize, then -1
							res.forEach((s) => (s.MaxFileSize = values[s.SubjectId] || -1));
							return { phaseId, res };
						})
				  )
		),
		mergeMap(({ phaseId, res }) =>
			of(MasterStateAction.FetchSubjectsSuccess({ payload: res, phaseId }))
		),
		share()
	);
	@Effect()
	getPhases$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchPhases),
		switchMapTo(this.generalService.GetPhasesCurrentGeneration()),
		mergeMap((res) => of(MasterStateAction.FetchPhasesSuccess({ payload: res }))),
		share()
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
		),
		share()
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
		),
		share()
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
		),
		share()
	);

	@Effect()
	getIPList$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchIPList),
		switchMap(() => this.traineeAttendanceService.getIPWhiteList()),
		mergeMap((res) => of(MasterStateAction.FetchIPListSuccess({ payload: res }))),
		share()
	);

	//#endregion

	//#region create
	@Effect()
	createUserInRole$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateUserInRole),
		switchMap((data) => this.leaderService.SaveUserInRoles(data)),
		mergeMap((res) =>
			_isEmpty(res)
				? of(MainStateAction.SuccessfullyMessage('created users'))
				: of(MainStateAction.FailMessage('creating users', res.join('\n')))
		),
		share()
	);
	@Effect()
	createGeneration$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateGeneration),
		switchMap((data) => this.leaderService.SaveGeneration(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('created generation'))
				: of(MainStateAction.FailMessage('creating generation'))
		),
		share()
	);
	@Effect()
	createPhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreatePhase),
		switchMap((data) => this.leaderService.SavePhase({ ...data, type: data.phaseType })),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('created phase'))
				: of(MainStateAction.FailMessage('creating phase'))
		),
		share()
	);
	@Effect()
	createTraineeInPhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateTraineeInPhase),
		switchMap((data) => this.leaderService.SaveTraineesToPhase(data)),
		mergeMap((res) => {
			const notTrainee = [];
			const alreadyExists = [];
			const failed = [];

			res.forEach((r) => {
				if (r.includes('not trainee')) notTrainee.push(r.substr(0, 10));
				else if (r.includes('already exists')) alreadyExists.push(r.substr(0, 10));
				else if (r.includes('failed')) failed.push(r.substr(0, 10));
			});

			let message = '';
			if (notTrainee.length > 0) message += `\nNot a trainee: ${notTrainee.join(', ')}`;
			if (alreadyExists.length > 0) message += `\nAlready exists: ${alreadyExists.join(', ')}`;
			if (failed.length > 0) message += `\nFailed: ${failed.join(', ')}`;

			return message === ''
				? of(MainStateAction.SuccessfullyMessage('created trainee in phase'))
				: of(MainStateAction.FailMessage('creating Trainee in Phase', message));
		}),
		share()
	);
	@Effect()
	createSubject$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateSubject),
		switchMap((data) => this.leaderService.SaveSubject(data).pipe(map((res) => ({ res, data })))),
		mergeMap(({ res, data }) =>
			res
				? of(MainStateAction.SuccessfullyMessage('created subject'))
				: of(MainStateAction.FailMessage('creating subject'))
		),
		share()
	);
	@Effect()
	createSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateDailySchedule, MasterStateAction.CreateSpecificSchedule),
		switchMap((data) =>
			data.type === MasterStateAction.CreateDailySchedule.type
				? this.leaderService.SaveSchedule(data)
				: this.leaderService.SaveSpecificSchedule(data)
		),
		mergeMap((res) =>
			res != null
				? of(MainStateAction.SuccessfullyMessage('created schedule'))
				: of(MainStateAction.UnexpectedResultMessage('creating schedule', res))
		),
		share()
	);

	@Effect()
	createTraineeInSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateTraineeInSchedule),
		switchMap((data) => this.leaderService.SaveTraineesToSchedule(data)),
		mergeMap((res) =>
			_isEmpty(res)
				? of(MainStateAction.SuccessfullyMessage('created trainees in schedule'))
				: of(MainStateAction.FailMessage('saving trainee to schedule', res.join('\n')))
		),
		share()
	);
	//#endregion

	//#region update
	@Effect()
	updateGeneration$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.UpdateGeneration),
		switchMap((data) =>
			// this.leaderService.UpdateGeneration(data)
			of(true)
		),
		mergeMap((res) =>
			res != null
				? of(MainStateAction.SuccessfullyMessage('updating generation'))
				: of(MainStateAction.FailMessage('updating generation'))
		),
		share()
	);
	@Effect()
	updatePhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.UpdatePhase),
		switchMap((data) => this.leaderService.UpdatePhase(data)),
		mergeMap((res) =>
			res != null
				? of(MainStateAction.SuccessfullyMessage('updating phase'))
				: of(MainStateAction.FailMessage('updating phase'))
		),
		share()
	);
	@Effect()
	updateSubject$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.UpdateSubject),
		switchMap(({ subjectId, value, maxFileSize }) =>
			// this.leaderService.SaveMaximumFileSize({ subjectId, fileSize: maxFileSize })
			forkJoin([
				// There are no normal UpdateSubject, sigh...
				value !== null ? this.leaderService.SaveSubjectDetail({ subjectId, value }) : of(true),
				maxFileSize !== null
					? this.leaderService.SaveMaximumFileSize({ subjectId, fileSize: maxFileSize })
					: of(true),
			])
		),
		mergeMap((res: any[]) =>
			res.every((v) => !!v)
				? of(MainStateAction.SuccessfullyMessage('updating phase'))
				: of(MainStateAction.FailMessage('updating phase'))
		),
		share()
	);

	@Effect()
	updateIPList$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.UpdateIPList),
		switchMap((data) => this.traineeAttendanceService.saveIPWhiteList(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('updated IP List'))
				: of(MainStateAction.FailMessage('updating IP List'))
		),
		share()
	);

	//#endregion

	//#region delete
	@Effect()
	deletePhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeletePhase),
		switchMap((data) => this.leaderService.DeletePhase(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('deleted phase'))
				: of(MainStateAction.FailMessage('deleted phase'))
		),
		share()
	);

	@Effect()
	deleteTraineeInPhase$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeleteTraineeInPhase),
		switchMap((data) => this.leaderService.DeleteTraineeInPhase(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('deleted trainee in phase'))
				: of(MainStateAction.FailMessage('delete trainee in phase'))
		),
		share()
	);

	@Effect()
	deleteSubject$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeleteSubject),
		switchMap((data) => this.leaderService.DeleteSubject(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('deleted subject'))
				: of(MainStateAction.FailMessage('delete subject'))
		),
		share()
	);

	@Effect()
	deleteSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeleteSchedule),
		switchMap((data) => this.leaderService.DeleteSchedule(data)),
		mergeMap((res) =>
			res != null
				? of(MainStateAction.SuccessfullyMessage('deleted schedule'))
				: of(MainStateAction.FailMessage('delete schedule'))
		),
		share()
	);

	@Effect()
	deleteAllSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeleteAllSchedule),
		switchMap((data) => this.leaderService.DeleteAllSchedule(data)),
		mergeMap((res) =>
			res != null
				? of(MainStateAction.SuccessfullyMessage('deleted all schedule'))
				: of(MainStateAction.FailMessage('delete all schedule'))
		),
		share()
	);

	@Effect()
	deleteTraineeInSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeleteTraineeInSchedule),
		switchMap((data) => this.leaderService.DeleteTraineeInSchedule(data)),
		mergeMap((res) =>
			res != null
				? of(MainStateAction.SuccessfullyMessage('deleted trainee in schedule'))
				: of(MainStateAction.FailMessage('delete trainee in schedule'))
		),
		share()
	);

	@Effect()
	deleteUserInRole$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeleteUserInRole),
		switchMap((data) => this.leaderService.DeleteUserInRoles(data)),
		mergeMap((res) =>
			res != null
				? of(MainStateAction.SuccessfullyMessage('deleted user'))
				: of(MainStateAction.FailMessage('delete user'))
		),
		share()
	);
	//#endregion

	//#region Modify tab
	@Effect()
	createTrainerTeachingSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.CreateTrainerTeachingSchedules),
		switchMap((data) => this.trainerAttendanceService.SaveLecturerTeachingSchedules(data)),
		mergeMap((res) => 
		res.length === 0 
			? of(MainStateAction.SuccessfullyMessage('created teaching schedule'))
			: of(MainStateAction.FailMessage('creating teaching schedule', res.join('\n')))
		),
		share()
	);
		
	@Effect()
	getTrainerTeachingSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchTrainerTeachingSchedules),
		switchMap((data) => this.trainerAttendanceService.GetTrainerTeachingSchedules(data)),
		mergeMap((res) => of(MasterStateAction.FetchTrainerTeachingSchedulesSuccess({ payload: res }))),
		share()
	);

	@Effect()
	deleteTrainerTeachingSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeleteTrainerTeachingSchedule),
		switchMap((data) => this.trainerAttendanceService.DeleteLecturerTeachingSchedule(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('deleted teaching schedule'))
				: of(MainStateAction.FailMessage('deleting teaching schedule'))
		),
		share()
	);

	@Effect()
	getTraineeSchedules$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchTraineeSchedulesBy),
		switchMap((data) =>
			this.restService.FetchTraineeScheduleBy(
				data.generationId,
				data.traineeId,
				data.scheduleType,
				data.date,
				data.traineeScheduleId
			)
		),
		mergeMap((res) => of(MasterStateAction.FetchTraineeSchedulesSuccess({ payload: res }))),
		share()
	);

	@Effect()
	getTraineeSchedulesByDate$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.FetchTraineeSchedulesByDate),
		switchMap((data) => this.traineeAttendanceService.GetTraineeSchedulesByDateRange(data)),
		mergeMap((res) => of(MasterStateAction.FetchTraineeSchedulesSuccess({ payload: res }))),
		share()
	);

	@Effect()
	deleteTraineeSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(MasterStateAction.DeleteTraineeSchedule),
		switchMap((data) => this.restService.DeleteTraineeSchedule(data.traineeScheduleId)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('deleted trainee schedule'))
				: of(MainStateAction.FailMessage('deleting trainee schedule'))
		),
		share()
	);
	//#endregion
}
