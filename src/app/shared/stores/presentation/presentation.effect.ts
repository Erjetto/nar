import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as MainStateAction from '../main/main.action';
import * as PresentationStateAction from './presentation.action';
import * as fromPresentationState from './presentation.reducer';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, pluck, tap, share, map } from 'rxjs/operators';
import { PresentationService } from '../../services/new/presentation.service';
import * as _ from 'lodash';

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
				(!_.isEmpty(traineeId)
					? this.presentationService.FindCoreTrainingPresentationByTrainee({
							generationId,
							traineeId,
					  })
					: !_.isEmpty(subjectId)
					? this.presentationService.FindCoreTrainingPresentationBySubject({
							generationId,
							subjectId,
					  })
					: this.presentationService.FindCoreTrainingPresentationByGeneration({ generationId })
				).pipe(map((res) => ({ traineeId, subjectId, res })))
			// Di akhirannya dibawa juga 'data' supaya bisa dipisahkan spt ini
		),
		mergeMap(({ traineeId, subjectId, res }) =>
			!_.isEmpty(traineeId)
				? of(PresentationStateAction.FetchPresentationsByTraineeSuccess({ payload: res, traineeId }))
				: !_.isEmpty(subjectId)
				? of(PresentationStateAction.FetchPresentationsBySubjectSuccess({ payload: res, subjectId }))
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
}
