import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {
	ClientPhase,
	ClientSubject,
	ClientCaseTrainer,
	ClientUploadAnswer,
} from 'src/app/shared/models';
import { takeUntil, filter, map, withLatestFrom, tap } from 'rxjs/operators';
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
	fromMainState,
} from 'src/app/shared/store-modules';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { isEmpty as _isEmpty, sortBy as _sortBy } from 'lodash';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { adjustControlsInFormArray } from 'src/app/shared/methods';
import { RoleFlags } from 'src/app/shared/constants/role.constant';

@Component({
	selector: 'rd-correction',
	templateUrl: './correction.component.html',
	styleUrls: ['./correction.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrectionComponent extends DashboardContentBase implements OnInit, OnDestroy {
	startDateFormat = DateHelper.DATE_TIME_FORMAT;
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

	loadingViewCases$ = new BehaviorSubject(false);
	loadingScoreList$ = new BehaviorSubject(false);

	isTrainerOrJunior$: Observable<boolean>;

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
		this.phases$ = this.store.pipe(
			select(fromMasterState.getPhases),
			filter((res) => !_isEmpty(res)),
			tap((res) => this.viewCurrentPhase$.next(res[0])) // Auto first in select
		);
		// get subjects by phase
		this.viewSubjectList$ = fromMasterState.getSubjectsFromEntity(
			this.store,
			this.viewCurrentPhase$,
			this.loadingViewCases$
		);

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

		this.isTrainerOrJunior$ = this.currentUser$.pipe(
			map((u) => u.Role.is(RoleFlags.JuniorTrainer, RoleFlags.Trainer)),
			tap((isCorrector) => {
				if (!isCorrector) {
					// get cases by subject
					this.viewCurrentSubject$
						.pipe(
							takeUntil(this.destroyed$),
							filter((v) => !_isEmpty(v))
						)
						.subscribe((s) =>
							this.store.dispatch(CaseStateAction.FetchCorrectionListBy({ subjectId: s.SubjectId }))
						);
				} else {
					// get cases by phase
					this.viewCurrentPhase$
						.pipe(
							takeUntil(this.destroyed$),
							filter((v) => !_isEmpty(v))
						)
						.subscribe((p) =>
							this.store.dispatch(CaseStateAction.FetchCorrectionListBy({ phaseId: p.PhaseId }))
						);
				}
			})
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

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
	}

	initData(){
		
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
		// this.answerList$.value.forEach((a) => window.open(a.answerDownloadLink));
		this.store.dispatch(CaseStateAction.DownloadAllAnswers({
			caseId: this.caseId.value
		}));
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
			})
		);
	}

	getDeadlineFormat(start: Date, end: Date) {
		const sameYear = start.getFullYear() === end.getFullYear();
		return `${!sameYear ? 'yyyy ' : ''} MMM dd, HH:mm`;
	}
}
