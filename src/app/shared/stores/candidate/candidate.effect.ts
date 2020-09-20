import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as CandidateStateAction from './candidate.action';
import * as fromCandidateState from './candidate.reducer';

import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, share, tap } from 'rxjs/operators';
import { SubcoCandidateService } from '../../services/new/subco-candidate.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class CandidateStateEffects {
  excelDownloadLink = `${environment.apiUrl}File.svc/GetMemoryFile/`
	constructor(
		private actions$: Actions,
		private candidateService: SubcoCandidateService
	) {}

	@Effect()
	getQuestions$: Observable<Action> = this.actions$.pipe(
		ofType(CandidateStateAction.FetchQuestions),
		switchMap(() => this.candidateService.GetQuestionsForTrainerGeneration()),
		mergeMap((res) => of(CandidateStateAction.FetchQuestionsSuccess({ payload: res }))),
		share()
	);

	@Effect()
	getAnswers$: Observable<Action> = this.actions$.pipe(
		ofType(CandidateStateAction.FetchAnswers),
		switchMap(() => this.candidateService.GetAnswersFromTrainerGeneration()),
		mergeMap((res) => of(CandidateStateAction.FetchAnswersSuccess({ payload: res }))),
		share()
	);

	@Effect()
	updateQuestions$: Observable<Action> = this.actions$.pipe(
		ofType(CandidateStateAction.SaveQuestions),
		switchMap((data) => this.candidateService.SaveQuestionsForTrainer(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('updated questions'))
				: of(MainStateAction.FailMessage('updating questions'))
		),
		share()
  );

	@Effect()
	createAnswerSchedule$: Observable<Action> = this.actions$.pipe(
    ofType(CandidateStateAction.CreateSchedule),
		switchMap((data) => this.candidateService.CreateSchedules(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('created schedule'))
				: of(MainStateAction.FailMessage('creating schedule'))
		),
		share()
  );
	@Effect()
	updateAnswerSchedule$: Observable<Action> = this.actions$.pipe(
    ofType(CandidateStateAction.UpdateSchedule),
		// switchMap((data) => this.candidateService.UpdateSchedule(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('updated schedule'))
				: of(MainStateAction.FailMessage('updating schedule'))
		),
		share()
  );

	@Effect()
	deleteAnswerSchedule$: Observable<Action> = this.actions$.pipe(
		ofType(CandidateStateAction.DeleteSchedule),
		switchMap((data) => this.candidateService.DeleteSchedule(data)),
		mergeMap((res) =>
			res
				? of(MainStateAction.SuccessfullyMessage('delete schedule'))
				: of(MainStateAction.FailMessage('deleting schedule'))
		),
		share()
  );

	@Effect()
	exportToExcel$: Observable<Action> = this.actions$.pipe(
    ofType(CandidateStateAction.ExportAnswersToExcel),
		switchMap(() => this.candidateService.ExportCurrentGenAnswersToExcel()),
		mergeMap((res) =>{
      if(res !== '') window.open(`${this.excelDownloadLink}${res}`)
			return res !== ''
				? of(MainStateAction.SuccessfullyMessage('exported the answers'))
				: of(MainStateAction.FailMessage('exporting the answers'))
		}),
		share()
  );
  
}
