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
import { ClientSubject, TraineePresentation } from 'src/app/shared/models';
import {
	fromMasterState,
	fromPresentationState,
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
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationSummaryComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
	viewDateFormat = DateHelper.WEEKDAY_DATE_FORMAT + ' ' + DateHelper.FULL_TIME_FORMAT;
	filterForm = this.fb.control('');
	currentSubject$ = new BehaviorSubject<ClientSubject>(null);

  subjects$: Observable<ClientSubject[]>;
  summaryNumbers$: Observable<{done, notYet, notPassed, passed}>;
	presentationScoringsSummary$: Observable<TraineePresentation[]>;
	presentationScorings$: Observable<TraineePresentation[]>;
	selectedTraineePresentationScorings$: Observable<TraineePresentation[]>;

	selectedTraineeSummary$ = new BehaviorSubject<TraineePresentation>(null);
	selectedPresentation$ = new BehaviorSubject<TraineePresentation>(null);

  loadingPresentationSummary$ = new BehaviorSubject(false);

	constructor(
		protected store: Store<IAppState>,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.subjects$ = this.store.pipe(select(fromMasterState.getSubjects));
		this.presentationScorings$ = this.store.pipe(
			select(fromPresentationState.getPresentationScorings)
		);
		this.presentationScoringsSummary$ = combineLatest([
			this.store.pipe(select(fromPresentationState.getPresentationScoringsSummary)),
			this.filterForm.valueChanges.pipe(startWith(''), debounceTime(350), distinctUntilChanged()),
		]).pipe(
			map(([summary, search]) =>
				summary.filter((p: TraineePresentation) =>
					`${p.traineeCode} ${p.traineeName} ${p.status} ${p.presentationNo} `
						.toLowerCase()
						.includes(search)
				)
			)
    );
    this.summaryNumbers$ = this.store.pipe(
      select(fromPresentationState.getPresentationScoringsSummary),
      map(summary => {
        const numbers = {done:0, notYet:0, notPassed:0, passed:0}
        summary.forEach((p:TraineePresentation) => {
          if(p.presentationNo > 0) numbers.done++; else numbers.notYet++;
          if(p.isPassed) numbers.passed++; else numbers.notPassed++;
        });
        return numbers
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

		this.currentSubject$
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

		this.store
			.pipe(
				select(fromMasterState.getPhases),
				filter((res) => !_isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((phases) => {
				const corePhase = TryGetCoreTrainingPhase(phases);
				this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: corePhase.PhaseId }));
			});

		this.store.dispatch(MasterStateAction.FetchPhases());
	}

	selectTraineeSummary(p: TraineePresentation) {
		this.selectedTraineeSummary$.next(p);
	}

	selectPresentation(p: TraineePresentation) {
		this.selectedPresentation$.next(p);
	}
}
