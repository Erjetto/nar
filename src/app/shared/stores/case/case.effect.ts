import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as CaseStateAction from './case.action';
import * as MainStateAction from '../main/main.action';


import { forkJoin, Observable, of } from 'rxjs';
import { switchMap, mergeMap, share, catchError } from 'rxjs/operators';
import { LeaderService } from '../../services/new/leader.service';
import { isEmpty as _isEmpty } from 'lodash';
import { TraineeService } from '../../services/new/trainee.service';
import { TrainerService } from '../../services/new/trainer.service';
import { OtherService } from '../../services/new/other.service';
import { GeneralService } from '../../services/new/general.service';

@Injectable({
	providedIn: 'root',
})
export class CaseStateEffects {
	constructor(
		private actions$: Actions,
		private leaderService: LeaderService,
		private generalService: GeneralService,
		private traineeService: TraineeService,
		private trainerService: TrainerService,
		private otherService: OtherService
	) {}

	//#region Trainee Case
	@Effect()
	getCases$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.FetchCases),
		switchMap((data) => this.leaderService.GetCase(data)),
		mergeMap((results) => of(CaseStateAction.FetchCasesSuccess({ payload: results }))),
		share()
	);

	@Effect()
	getCasesForTrainee$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.FetchTraineeCasesBy),
		switchMap((data) =>
			_isEmpty(data.subjectId)
				? this.traineeService.GetCaseByPhase(data)
				: this.traineeService.GetCaseBySubject({ phaseId: data.phaseId, subjectId: data.subjectId })
		),
		mergeMap((results) => of(CaseStateAction.FetchTraineeCasesSuccess({ payload: results }))),
		share()
	);

	@Effect()
	createCase$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.CreateCase),
		switchMap((data) => this.leaderService.SaveCase(data)),
		mergeMap((res) =>
			_isEmpty(res)
				? of(MainStateAction.SuccessfullyMessage('created case'))
				: of(MainStateAction.FailMessage('creating case', res.join('\n')))
		),
		share()
	);

	@Effect()
	updateCase$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.UpdateCase),
		switchMap((data) =>
			!_isEmpty(data.fileId)
				? this.leaderService.UpdateCaseIncludingFile({ ...data, fileId: data.fileId })
				: this.leaderService.UpdateCase(data)
		),
		mergeMap((res) =>
			_isEmpty(res)
				? of(MainStateAction.SuccessfullyMessage('updated case'))
				: of(MainStateAction.FailMessage('updating case', res.join('\n')))
		),
		share()
	);

	@Effect()
	deleteCase$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.DeleteCase),
		switchMap((data) => this.leaderService.DeleteCase(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('deleted case'))
				: of(MainStateAction.FailMessage('deleting case'))
		),
		share()
	);

	@Effect()
	submitTraineeAnswer$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.SubmitTraineeAnswer),
		switchMap((data) => this.traineeService.SaveAnswer(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('submitted answer'))
				: of(MainStateAction.FailMessage('submitting answer'))
		),
		share()
	);
	//#endregion

	//#region Trainer Case
	@Effect()
	getCasesForTrainer$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.FetchCorrectionListBy),
		switchMap((data) =>
			_isEmpty(data.subjectId)
				? this.trainerService.GetAllCases({ phaseId: data.phaseId })
				: this.trainerService.GetCaseBySubject({ subjectId: data.subjectId })
		),
		mergeMap((results) => of(CaseStateAction.FetchCorrectionListSuccess({ payload: results }))),
		share()
  );
  
	@Effect()
	fetchCorrectionScoring$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.FetchCorrectionScoring),
		switchMap((data) => this.trainerService.GetTraineeAnswer(data)),
		mergeMap((results) => of(CaseStateAction.FetchCorrectionScoringSuccess({ payload: results }))),
		share()
	);
  
	@Effect()
	importScoreFromExcel$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.ImportScoreFromExcel),
		switchMap((data) => this.trainerService.ImportScoreFromExcel(data)),
		mergeMap((results) => 
			_isEmpty(results)
			? of(MainStateAction.SuccessfullyMessage('Saved all scores'))
			: of(MainStateAction.FailMessage('Saving the following trainees: ', results.join(', ')))
		),
		share()
	);
  
	@Effect()
	exportScoreBySubject$ = this.actions$.pipe(
		ofType(CaseStateAction.ExportScoreBySubject),
		switchMap((data) => this.generalService.ExportScoreBySubject(data)),
		mergeMap((results) => {
			this.otherService.DownloadMemoryFile(results)
			return of()
		}),
		share()
	);
  
	@Effect()
	generateExcelTemplateForScoring$ = this.actions$.pipe(
		ofType(CaseStateAction.GenerateExcelTemplateForScoring),
		switchMap((data) => this.trainerService.GenerateExcelTemplateForScoring(data)),
		mergeMap((results) => {
			this.otherService.DownloadMemoryFile(results)
			return of()
		}),
		share()
	);

	@Effect()
	saveTraineeScores$: Observable<Action> = this.actions$.pipe(
		ofType(CaseStateAction.SaveTraineeScores),
    switchMap((data) =>
      // Create array of saveScore request
			forkJoin(
				data.traineeId.map((t, idx) =>
					this.trainerService.SaveScore({
						phaseId: data.phaseId,
						caseId: data.caseId,
						traineeId: t,
						score: data.score[idx],
						zeroingReason: data.zeroingReason[idx],
						subjectId: data.subjectId
					}).pipe(catchError((error) => of(false)))
				)
			)
		),
		mergeMap((results) => {
      const failed = results.filter(r => !r).length;
      if(failed === 0) return of(MainStateAction.SuccessfullyMessage('saved score'))
      else return of(MainStateAction.FailMessage('saving score', failed + ' scores failed to be saved'))
    }),
		share()
	);
	//#endregion
}
