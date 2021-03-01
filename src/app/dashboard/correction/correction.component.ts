import { Component, OnInit, OnDestroy } from '@angular/core';
import {
	ClientPhase,
	ClientSubject,
	ClientCaseTrainer,
	ClientUploadAnswer,
} from 'src/app/shared/models';
import { takeUntil, filter, map, withLatestFrom } from 'rxjs/operators';
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
	CaseStateEffects,
} from 'src/app/shared/store-modules';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { isEmpty as _isEmpty, sortBy as _sortBy } from 'lodash';
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
	zeroingReasons = this.fb.array([]);
	traineeIds = this.fb.array([]);
	scores = this.fb.array([]);

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
		private caseEffects: CaseStateEffects,
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
			.pipe(
				select(fromCaseState.getTraineeAnswers),
				takeUntil(this.destroyed$),
				map((answers) => _sortBy(answers, 'TraineeCode'))
			)
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
				this.scores.clear();
				this.zeroingReasons.clear();

				adjustControlsInFormArray(this.zeroingReasons, answers.length);
				adjustControlsInFormArray(this.traineeIds, answers.length);
				adjustControlsInFormArray(this.scores, answers.length);

				this.scores.controls.forEach((c, idx) => {
					this.traineeIds.controls[idx].setValue(answers[idx].TraineeId);
					this.scores.controls[idx].setValue(answers[idx].Score);
					this.zeroingReasons.controls[idx].setValue(answers[idx].ZeroingReason);
				});
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
		this.caseEffects.saveTraineeScores$
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.viewCurrentSubject$))
			.subscribe(([act, sub]) => {
				this.store.dispatch(CaseStateAction.FetchCorrectionListBy({ subjectId: sub.SubjectId }));
			});
		//#endregion

		this.store.dispatch(MasterStateAction.FetchPhases());
	}

	showScoringForCase(c: ClientCaseTrainer) {
		this.viewCurrentCase$.next(c);
		this.phaseId.setValue(this.viewCurrentPhase$.value.PhaseId);
		this.caseId.setValue(c.CaseId);
	}

	saveScore() {
		// Exclude scoring that is not touched at all
		const zeroingReason: any[] = [...this.zeroingReasons.value];
		const traineeId: any[] = [...this.traineeIds.value];
		const score: any[] = [...this.scores.value];
		// tslint:disable-next-line: prefer-for-of
		for (let i = this.scores.controls.length - 1; i >= 0; i--) {
			if (this.scores.controls[i].pristine) {
				zeroingReason.splice(i, 1);
				traineeId.splice(i, 1);
				score.splice(i, 1);
			}
		}

		this.store.dispatch(
			CaseStateAction.SaveTraineeScores({
				phaseId: this.phaseId.value,
				caseId: this.caseId.value,
				zeroingReason,
				traineeId,
				score,
				subjectId: this.viewCurrentSubject$.value.SubjectId,
			})
		);
	}

	downloadAllCases() {
		this.viewCaseList$.value.forEach((c) => window.open(c.downloadLink));
	}
	downloadAllAnswers() {
		this.answerList$.value.forEach((a) => window.open(a.answerDownloadLink));
	}

	exportIntoExcel() {
		this.store.dispatch(
			CaseStateAction.ExportScoreBySubject({ subjectId: this.viewCurrentSubject$.value.SubjectId })
		);
	}

	getExcelTemplate() {
		this.store.dispatch(
			CaseStateAction.GenerateExcelTemplateForScoring({
				caseId: this.caseId.value,
			})
		);
	}

	uploadScoreFromExcel(scoreForm: AbstractControl) {
		this.store.dispatch(MainStateAction.InfoMessage('Saving Scores...'));
		this.store.dispatch(
			CaseStateAction.ImportScoreFromExcel({
				fileId: scoreForm.value.fileId,
				caseId: this.caseId.value,
				phaseId: this.phaseId.value,
				subjectId: this.viewCurrentSubject$.value.SubjectId,
			})
		);
	}
}
