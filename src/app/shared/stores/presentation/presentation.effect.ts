import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as PresentationStateAction from './presentation.action';
import * as fromPresentationState from './presentation.reducer';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, pluck, tap, share, map } from 'rxjs/operators';
import { PresentationService } from '../../services/new/presentation.service';
import { isEmpty as _isEmpty} from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class PresentationStateEffects {
	constructor(private actions$: Actions, private presentationService: PresentationService) {}

	@Effect()
	getPresentationsByDate$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.FetchPresentationsByDate),
		switchMap((data) => this.presentationService.GetPresentationReportDetailByDate(data)),
		mergeMap((res) =>
			of(PresentationStateAction.FetchPresentationsByDateSuccess({ payload: res }))
		),
		share()
	);

	@Effect()
	getPresentationsBy$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.FetchPresentationsBy),
		switchMap(
			({ generationId, traineeId, subjectId }) =>
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
		mergeMap(({ traineeId, subjectId, res }) =>
			!_isEmpty(traineeId)
				? of(
						PresentationStateAction.FetchPresentationsByTraineeSuccess({ payload: res, traineeId })
				  )
				: !_isEmpty(subjectId)
				? of(
						PresentationStateAction.FetchPresentationsBySubjectSuccess({ payload: res, subjectId })
				  )
				: of(PresentationStateAction.FetchPresentationsByGenerationSuccess({ payload: res }))
		),
		share()
	);

	@Effect()
	getPresentationStatus$: Observable<Action> = this.actions$.pipe(
		ofType(PresentationStateAction.FetchPresentationStatus),
		switchMap((data) => this.presentationService.GetPresentationStatus(data)),
		mergeMap((res) => of(PresentationStateAction.FetchPresentationStatusSuccess({ payload: res }))),
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
	//#endregion

	//#region Update
	@Effect()
	saveTraineePresentation$: Observable<Action> = this.actions$.pipe(
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
				? of(MainStateAction.SuccessfullyMessage('updateed answer'))
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
