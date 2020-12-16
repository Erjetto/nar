import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IAppState } from 'src/app/app.reducer';
import { ClientInterviewResult } from 'src/app/shared/models';
import { fromInterviewState, InterviewStateAction } from 'src/app/shared/store-modules';
import { DateHelper } from 'src/app/shared/utilities/date-helper';

@Component({
	selector: 'rd-print-interview-result',
	templateUrl: './print-interview-result.component.html',
	styleUrls: ['./print-interview-result.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrintInterviewResultComponent implements OnInit, OnDestroy {
  interviewDateFormat = DateHelper.WEEKDAY_DATE_FORMAT;
  today = new Date()

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
			map((res) => res.Questions.reduce((prev, curr, idx) => prev + curr.Value * curr.Weight, 0))
		);

		this.activatedRoute.params.subscribe(({ interviewScheduleId }) => {
			this.store.dispatch(InterviewStateAction.FetchInterviewResult({ interviewScheduleId }));
		});
	}
	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}
}
