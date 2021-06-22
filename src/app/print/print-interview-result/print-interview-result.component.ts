import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { isEmpty as _isEmpty } from 'lodash';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { IAppState } from 'src/app/app.reducer';
import { ClientGeneration, ClientInterviewResult } from 'src/app/shared/models';
import {
	fromInterviewState,
	fromMainState,
	fromMasterState,
	InterviewStateAction,
	MainStateAction,
	MasterStateAction,
} from 'src/app/shared/store-modules';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { ID_Dict } from 'src/app/shared/utilities/id-lang-helper';

@Component({
	selector: 'rd-print-interview-result',
	templateUrl: './print-interview-result.component.html',
	styleUrls: ['./print-interview-result.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrintInterviewResultComponent implements OnInit, OnDestroy {
	interviewDateFormat = DateHelper.WEEKDAY_DATE_FORMAT;
	today = new Date();
	idDict = ID_Dict;

	currentGeneration$ = new BehaviorSubject<ClientGeneration>(null);
	currentYear$: Observable<string>;
	currentSem$: Observable<string>;
	interviewResultData$: Observable<ClientInterviewResult>;
	total$: Observable<number>;

	destroyed$ = new Subject<void>();

	constructor(
		protected store: Store<IAppState>,
		private activatedRoute: ActivatedRoute,
		private titleService: Title
	) {}

	ngOnInit(): void {
		this.titleService.setTitle('NAR - Interview');
		this.interviewResultData$ = this.store.pipe(select(fromInterviewState.getInterviewResult));

		this.total$ = this.interviewResultData$.pipe(
			filter((v) => !_isEmpty(v)),
			map((res) => res.Questions.reduce((prev, curr, idx) => prev + curr.Value * curr.Weight, 0))
		);

		this.store
			.pipe(
				select(fromMasterState.getGenerations),
				takeUntil(this.destroyed$),
				map((gens) => gens[0])
			)
			.subscribe(this.currentGeneration$);

		this.currentYear$ = this.currentGeneration$.pipe(
			filter((v) => !_isEmpty(v)),
			map((g) => g.yearRange)
		);
		this.currentSem$ = this.currentGeneration$.pipe(
			filter((v) => !_isEmpty(v)),
			map((g) => g.Semester)
		);

		this.activatedRoute.params.subscribe(({ interviewScheduleId }) => {
			this.store.dispatch(InterviewStateAction.FetchInterviewResult({ interviewScheduleId }));
		});
		this.store.dispatch(MasterStateAction.FetchGenerations());
	}
	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}
}
