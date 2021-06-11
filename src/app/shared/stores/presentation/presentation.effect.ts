import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as PresentationStateAction from './presentation.action';
import * as fromMainState from '../main/main.reducer';
import * as fromPresentationState from './presentation.reducer';

import { forkJoin, Observable, of } from 'rxjs';
import { switchMap, mergeMap, share, map, withLatestFrom, filter, first } from 'rxjs/operators';
import { PresentationService } from '../../services/new/presentation.service';
import { isEmpty as _isEmpty } from 'lodash';
import { IAppState } from 'src/app/app.reducer';
import { ClientGeneration, User } from '../../models';
import { RESTService } from '../../services/new/rest.service';

@Injectable({
	providedIn: 'root',
})
export class PresentationStateEffects {
	constructor(
		private actions$: Actions,
		private presentationService: PresentationService,
		private restService: RESTService,
		private store: Store<IAppState>
	) {}

	@Effect()
	getPresentationScoringsSummary$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.FetchPresentationScoringsSummary),
		switchMap((data) => this.presentationService.GetPresentationReportSummary(data)),
		mergeMap((res) =>
			of(PresentationStateAction.FetchPresentationScoringsSummarySuccess({ payload: res }))
		),
		share()
	);

	@Effect()
	getPresentationScorings$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.FetchPresentationScorings),
		switchMap((data) =>
			this.restService.FetchTraineePresentationBy(
				data.generationId,
				data.phaseId,
				data.subjectId,
				data.traineeId,
				data.presentationNo
			)
		),
		mergeMap((res) =>
			of(PresentationStateAction.FetchPresentationScoringsSuccess({ payload: res }))
		),
		share()
	);

	@Effect()
	getPresentationScoringsByDate$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.FetchPresentationScoringsBy),
		switchMap((data) =>
			data.subjectId !== undefined
				? this.presentationService.GetPresentationReportDetail({ subjectId: data.subjectId })
				: this.presentationService.GetPresentationReportDetailByDate({ time: data.time })
		),
		mergeMap((res) =>
			of(PresentationStateAction.FetchPresentationScoringsSuccess({ payload: res }))
		),
		share()
	);

	@Effect()
	getMyPresentations$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.FetchMyPresentations),
		switchMap((_) =>
			// Get first non-null current user & generation to fetch
			// current user presentation
			forkJoin([
				this.store.pipe(
					select(fromMainState.getCurrentUser),
					filter((v) => !_isEmpty(v)),
					first()
				),
				this.store.pipe(
					select(fromMainState.getCurrentGeneration),
					filter((v) => !_isEmpty(v)),
					first()
				),
			])
		),
		switchMap(([user, gen]: [User, ClientGeneration]) =>
			this.presentationService.FindCoreTrainingPresentationByTrainee({
				generationId: gen.GenerationId,
				traineeId: user.TraineeId,
			})
		),
		mergeMap((res) => of(PresentationStateAction.FetchMyPresentationsSuccess({ payload: res }))),
		share()
	);

	@Effect()
	getPresentationsBy$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.FetchPresentationsBy),
		withLatestFrom(this.store.pipe(select(fromPresentationState.hasFetchedAllPresentations))),
		filter(([data, hasFetchedAll]) => !hasFetchedAll),
		switchMap(
			// use merge because its possible to have multiple running request
			([{ generationId, traineeId, subjectId }]) =>
				// Gunakan antara ketiga method yg returnnya sama
				(!_isEmpty(traineeId)
					? this.presentationService.FindCoreTrainingPresentationByTrainee({
							generationId,
							traineeId,
					  })
					: !_isEmpty(subjectId)
					? this.presentationService.FindCoreTrainingPresentationBySubject({
							generationId,
							subjectId,
					  })
					: this.presentationService.FindCoreTrainingPresentationByGeneration({ generationId })
				).pipe(map((res) => ({ traineeId, subjectId, res })))
			// Di akhirannya dibawa juga 'data' supaya bisa dipisahkan spt ini
		),
		mergeMap(({ traineeId, subjectId, res }) => {
			// Bikin begini karena fetch by trainee punya 2 kemungkinan action
			const actions = [];
			if (!_isEmpty(traineeId)) {
				actions.push(
					PresentationStateAction.FetchPresentationsByTraineeSuccess({ payload: res, traineeId })
				);
			} else if (!_isEmpty(subjectId))
				actions.push(
					PresentationStateAction.FetchPresentationsBySubjectSuccess({ payload: res, subjectId })
				);
			else
				actions.push(
					PresentationStateAction.FetchPresentationsByGenerationSuccess({ payload: res })
				);

			return of(...actions);
		}),
		share()
	);

	@Effect()
	exportPresentationPhaseSummary$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.ExportPresentationPhaseSummary),
		switchMap((data) => this.presentationService.ExportPresentationReportSummaryForPresentationPhase()),
		mergeMap((filename) => of(MainStateAction.DownloadMemoryFile({filename}))),
		share()
	);

	

	//#region Create
	// NOTE: Do I need to make separate effect for adding question?
	// @Effect()
	// addCoreTrainingPresentationQuestion$: Observable<Action> = this.actions$.pipe(
	// 	ofType(PresentationStateAction.AddCoreTrainingPresentationQuestion),
	// 	switchMap((data) => this.presentationService.AddCoreTrainingPresentationQuestion(data)),
	// 	mergeMap((res) =>
	// 		res === false
	// 			? of(MainStateAction.SuccessfullyMessage('added question'))
	// 			: of(MainStateAction.FailMessage('adding question'))
	// 	),
	// 	share()
	// );

	@Effect()
	addCoreTrainingPresentationAnswer$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.AddCoreTrainingPresentationAnswer),
		switchMap((data) => this.presentationService.AddCoreTrainingPresentationAnswer(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('added answer'))
				: of(MainStateAction.FailMessage('adding answer'))
		),
		share()
	);

	@Effect()
	addCoreTrainingPresentationComment$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.AddCoreTrainingPresentationComment),
		switchMap((data) => this.presentationService.AddCoreTrainingPresentationComment(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('added comment'))
				: of(MainStateAction.FailMessage('adding comment'))
		),
		share()
	);

	@Effect()
	createTraineePresentation$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.SaveCoreTrainingPresentation),
		switchMap((data) =>
			this.presentationService.SaveCoreTrainingPresentation({ presentation: data.data })
		),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('created presentation'))
				: of(MainStateAction.FailMessage('creating presentation'))
		),
		share()
	);

	//#endregion

	//#region Update
	@Effect()
	updateTraineePresentation$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.SaveTraineePresentation),
		switchMap((data) => this.presentationService.SaveTraineePresentation(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('updated trainee presentation'))
				: of(MainStateAction.FailMessage('updating trainee presentation'))
		),
		share()
	);

	@Effect()
	updateCoreTrainingPresentationAnswer$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.UpdateCoreTrainingPresentationItem),
		switchMap((data) =>
			_isEmpty(data.text)
				? this.presentationService.UpdateCoreTrainingPresentationItemStatus({
						...data,
						status: data.status,
				  })
				: this.presentationService.UpdateCoreTrainingPresentationItem({ ...data, text: data.text })
		),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('updated answer'))
				: of(MainStateAction.FailMessage('updating answer'))
		),
		share()
	);

	@Effect()
	updateCoreTrainingPresentationComment$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.UpdateCoreTrainingPresentationComment),
		switchMap((data) => this.presentationService.UpdateCoreTrainingPresentationComment(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('updated comment'))
				: of(MainStateAction.FailMessage('updating comment'))
		),
		share()
	);
	//#endregion

	//#region Delete
	@Effect()
	deleteCoreTrainingPresentationItem$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.DeleteCoreTrainingPresentationItem),
		switchMap((data) => this.presentationService.DeleteCoreTrainingPresentationItem(data)),
		mergeMap((res) =>
			res === true
				? of(MainStateAction.SuccessfullyMessage('updated trainee presentation'))
				: of(MainStateAction.FailMessage('updating trainee presentation'))
		),
		share()
	);
	//#endregion
}
