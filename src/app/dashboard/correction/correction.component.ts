import { Component, OnInit, OnDestroy } from '@angular/core';
import {
	ClientPhase,
	ClientSubject,
	ClientCaseTrainer,
	ClientUploadAnswer,
} from 'src/app/shared/models';
import { takeUntil, filter } from 'rxjs/operators';
import { DashboardContentBase } from '../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import {
	fromMasterState,
	MasterStateAction,
	MainStateEffects,
	fromCaseState,
	CaseStateAction,
	MainStateAction,
} from 'src/app/shared/store-modules';
import { FormBuilder, Validators } from '@angular/forms';
import { isEmpty as _isEmpty } from 'lodash';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { adjustControlsInFormArray } from 'src/app/shared/methods';

@Component({
	selector: 'rd-correction',
	templateUrl: './correction.component.html',
	styleUrls: ['./correction.component.scss'],
})
export class CorrectionComponent extends DashboardContentBase implements OnInit, OnDestroy {
	scheduleDateFormat = DateHelper.WEEKDAY_DATE_FORMAT;
	uploadDateFormat = DateHelper.TIME_DATE_FORMAT;

	phaseId = this.fb.control('');
	caseId = this.fb.control('');
	zeroingReason = this.fb.array([]);
	traineeId = this.fb.array([]);
	score = this.fb.array([], Validators.required);

	// Select
	viewCurrentPhase$ = new BehaviorSubject<ClientPhase>(null);
	viewCurrentSubject$ = new BehaviorSubject<ClientSubject>(null);
	viewCurrentCase$ = new BehaviorSubject<ClientCaseTrainer>(null);

	// List
	phases$: Observable<ClientPhase[]>;
	viewSubjectList$: Observable<ClientSubject[]>;
	viewCaseList$ = new BehaviorSubject<ClientCaseTrainer[]>([]);
	answerList$ = new BehaviorSubject<ClientUploadAnswer[]>([]);

	// Loading
	loadingPhases$: Observable<boolean>;
	loadingSubject$: Observable<boolean>;
	loadingCases$: Observable<boolean>;

	loadingViewCases$ = new BehaviorSubject<boolean>(false);
	loadingScoreList$ = new BehaviorSubject<boolean>(false);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.store
			.pipe(select(fromCaseState.getClientCaseTrainers), takeUntil(this.destroyed$))
			.subscribe(this.viewCaseList$);
		this.store
			.pipe(select(fromCaseState.getTraineeAnswers), takeUntil(this.destroyed$))
      .subscribe(this.answerList$);

		this.loadingPhases$ = this.store.pipe(select(fromMasterState.isPhasesLoading));
		this.loadingSubject$ = this.store.pipe(select(fromMasterState.isSubjectsLoading));
		this.loadingCases$ = this.store.pipe(select(fromCaseState.isCasesLoading));
		// Gabung ketiga loading jadi satu
		merge(this.loadingPhases$, this.loadingSubject$, this.loadingCases$).subscribe(
			this.loadingViewCases$
		);
		this.store
			.pipe(select(fromCaseState.isAnswersLoading), takeUntil(this.destroyed$))
			.subscribe(this.loadingScoreList$);
		//#endregion

		// get subjects by phase
		this.viewSubjectList$ = fromMasterState.getSubjectsFromEntity(
			this.store,
			this.viewCurrentPhase$,
			this.loadingViewCases$
		);

		// get cases by subject
		this.viewCurrentSubject$
			.pipe(
				takeUntil(this.destroyed$),
				filter((v) => !_isEmpty(v))
			)
			.subscribe((s) =>
				this.store.dispatch(CaseStateAction.FetchCorrectionListBy({ subjectId: s.SubjectId }))
			);

		// Get trainees answer when clicked
		this.viewCurrentCase$
			.pipe(
				takeUntil(this.destroyed$),
				filter((v) => !_isEmpty(v))
			)
			.subscribe((c) =>
				this.store.dispatch(CaseStateAction.FetchCorrectionScoring({ caseId: c.CaseId }))
			);

		// Isi form traineeId
		this.answerList$
			.pipe(
				takeUntil(this.destroyed$),
				filter((v) => !_isEmpty(v))
			)
			.subscribe((answers) => {
        adjustControlsInFormArray(this.zeroingReason, answers.length);
        adjustControlsInFormArray(this.traineeId, answers.length);
        adjustControlsInFormArray(this.score, answers.length, undefined, Validators.required);
        this.traineeId.setValue(answers.map((a) => a.TraineeId))
      });

		//#region auto select first in array
		this.phases$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
			this.viewCurrentPhase$.next(res[0]);
		});
		// this.viewSubjectList$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
		// 	this.viewCurrentSubject$.next(res[0]);
		// });
		//#endregion

		//#region Subscribe to effects
		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.loadingScoreList$.next(false));

		this.mainEffects.changeGen$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.store.dispatch(MasterStateAction.FetchPhases()));

		// Reload case list when doing CRUD
		// merge(
		// 	this.viewCurrentSchedule$,
		// )
		// 	.pipe(takeUntil(this.destroyed$))
		// 	.subscribe(() => {
		// 		if (this.viewCurrentSchedule$.value)
		// 			this.store.dispatch(
		// 				CaseStateAction.FetchCases({ scheduleId: this.viewCurrentSchedule$.value.ScheduleId })
		// 			);
		// 	});
		//#endregion

		this.store.dispatch(MasterStateAction.FetchPhases());
	}

	showScoringForCase(c: ClientCaseTrainer) {
		this.viewCurrentCase$.next(c);
		this.phaseId.setValue(this.viewCurrentPhase$.value);
		this.caseId.setValue(c.CaseId);
	}

	saveScore() {
		this.store.dispatch(
			CaseStateAction.SaveTraineeScores({
				phaseId: this.phaseId.value,
				caseId: this.caseId.value,
				zeroingReason: this.zeroingReason.value,
				traineeId: this.traineeId.value,
				score: this.score.value,
			})
		);
	}

	downloadAllCases() {
		this.viewCaseList$.value.forEach((c) => window.open(c.downloadLink));
	}
	downloadAllAnswers() {
		this.answerList$.value.forEach((a) => window.open(a.answerDownloadLink));
  }
  
}
