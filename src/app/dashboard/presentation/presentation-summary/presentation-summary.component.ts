import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	startWith,
	takeUntil,
	tap,
} from 'rxjs/operators';
import { IAppState } from 'src/app/app.reducer';
import { ClientPhase, ClientSubject, SimpleTraineeData, TraineePresentation } from 'src/app/shared/models';
import {
	BinusianStateAction,
	fromBinusianState,
	fromMasterState,
	fromPresentationState,
	MainStateAction,
	MasterStateAction,
	PresentationStateAction,
} from 'src/app/shared/store-modules';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { isEmpty as _isEmpty, sortBy as _sortBy } from 'lodash';
import { TryGetCoreTrainingPhase } from 'src/app/shared/methods';
import { DateHelper } from 'src/app/shared/utilities/date-helper';

@Component({
	selector: 'rd-presentation-summary',
	templateUrl: './presentation-summary.component.html',
	styleUrls: ['./presentation-summary.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationSummaryComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy
{
	viewDateFormat = DateHelper.WEEKDAY_DATE_FORMAT + ' ' + DateHelper.FULL_TIME_FORMAT;
	filterForm = this.fb.control('');

	phases$: Observable<ClientPhase[]>;
	viewSubjectList$: Observable<ClientSubject[]>;
	viewCurrentSubject$ = new BehaviorSubject<ClientSubject>(null);
	viewCurrentPhase$ = new BehaviorSubject<ClientPhase>(null);

	summaryNumbers$: Observable<{ done; notYet; notPassed; passed }>;
	presentationScoringsSummary$: Observable<TraineePresentation[]>;
	presentationScorings$: Observable<TraineePresentation[]>;
	selectedTraineePresentationScorings$: Observable<TraineePresentation[]>;
	deactivatedTraineesIds$: Observable<string[]>;

	selectedTraineeSummary$ = new BehaviorSubject<TraineePresentation>(null);
	selectedPresentation$ = new BehaviorSubject<TraineePresentation>(null);

	loadingPresentationSummary$ = new BehaviorSubject(false);

	constructor(protected store: Store<IAppState>, private fb: FormBuilder) {
		super(store);
	}

	ngOnInit(): void {
		this.phases$ = this.store.pipe(
			select(fromMasterState.getPhases),
			filter((res) => !_isEmpty(res)),
			tap((res) => this.viewCurrentPhase$.next(res[0])) // Auto first in select
		);
		// get subjects by phase
		this.viewSubjectList$ = fromMasterState.getSubjectsFromEntity(
			this.store,
			this.viewCurrentPhase$,
			this.loadingPresentationSummary$
		).pipe(
			tap(res => this.viewCurrentSubject$.next(res[0]))
		);
		this.presentationScorings$ = this.store.pipe(
			select(fromPresentationState.getPresentationScorings)
		);
		this.deactivatedTraineesIds$ = this.store.pipe(
			select(fromBinusianState.getTraineesSimpleData),
			map((trainees : SimpleTraineeData[]) => 
				trainees.filter(t => t.DeactivateReason != null).map(t => t.TraineeId)
			),
		);

		this.presentationScoringsSummary$ = combineLatest([
			this.store.pipe(select(fromPresentationState.getPresentationScoringsSummary)),
			this.filterForm.valueChanges.pipe(startWith(''), debounceTime(350), distinctUntilChanged()),
			this.deactivatedTraineesIds$
		]).pipe(
			map(([summary, search, inactiveTrainees]) =>
				summary.filter((p: TraineePresentation) =>
					inactiveTrainees.includes(p.traineeId) === false && 
					`${p.traineeCode} ${p.traineeName} ${p.status} ${p.presentationNo} `
						.toLowerCase()
						.includes(search)
				)
			)
		);
		this.summaryNumbers$ = combineLatest([
			this.store.pipe(select(fromPresentationState.getPresentationScoringsSummary)),
			this.deactivatedTraineesIds$
		]).pipe(
			map(([summary, traineeIds]) => {
				const numbers = { done: 0, notYet: 0, notPassed: 0, passed: 0 };
				summary.forEach((p: TraineePresentation) => {
					if(traineeIds.includes(p.traineeId)) return;
					
					if (p.presentationNo > 0) numbers.done++;
					else numbers.notYet++;
					if (p.isPassed) numbers.passed++;
					else numbers.notPassed++;
				});
				return numbers;
			})
		);

		this.selectedTraineePresentationScorings$ = combineLatest([
			this.presentationScorings$,
			this.selectedTraineeSummary$,
		]).pipe(
			filter(([scorings, selectedTrainee]) => !_isEmpty(selectedTrainee?.traineeCode)),
			map(([scorings, selectedTrainee]) =>
				scorings.filter((p) => p.traineeCode === selectedTrainee.traineeCode)
			),
			tap(() => this.selectedPresentation$.next(null))
		);

		this.viewCurrentSubject$
			.pipe(
				takeUntil(this.destroyed$),
				filter((v) => !_isEmpty(v))
			)
			.subscribe((s) => {
				this.store.dispatch(
					PresentationStateAction.FetchPresentationScoringsSummary({ subjectId: s.SubjectId })
				);
				this.store.dispatch(
					PresentationStateAction.FetchPresentationScoringsBy({ subjectId: s.SubjectId })
				);
			});

		this.phases$
			.pipe(
				filter((res) => !_isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((phases) => {
				const corePhase = TryGetCoreTrainingPhase(phases);
				this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: corePhase.PhaseId }));
			});

		this.store.dispatch(MasterStateAction.FetchPhases());
		
		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: BinusianStateAction.FetchTraineesSimpleData(),
				selectorToBeChecked: fromBinusianState.getTraineesSimpleData,
			})
		);
	}

	selectTraineeSummary(p: TraineePresentation) {
		this.selectedTraineeSummary$.next(p);
	}

	selectPresentation(p: TraineePresentation) {
		this.selectedPresentation$.next(p);
	}

	exportPresentationPhaseSummaryIntoExcel(){
		this.store.dispatch(
			PresentationStateAction.ExportPresentationPhaseSummary()
		)
	}
}
