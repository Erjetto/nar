import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import {
	ClientInterviewReport,
	ClientInterviewSchedule,
	ClientInterviewQuestion,
} from 'src/app/shared/models';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import {
	MainStateEffects,
	MainStateAction,
	InterviewStateEffects,
	InterviewStateAction,
	fromInterviewState,
} from 'src/app/shared/store-modules';
import { takeUntil, filter, tap } from 'rxjs/operators';
import { isEmpty as _isEmpty } from 'lodash';

@Component({
	selector: 'rd-modify-interview-schedule',
	templateUrl: './modify-interview-schedule.component.html',
	styleUrls: ['./modify-interview-schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyInterviewScheduleComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
	statusClass = { Acc: 'acc', Rej: 'reject', Pos: 'pos' };

	titleSelect = new FormControl('', Validators.required);
	schedulesText = new FormControl('', Validators.required);
	deleteReasonText = new FormControl('', Validators.required);

	interviewScheduleReport$: Observable<ClientInterviewReport>;
	interviewQuestions$: Observable<ClientInterviewQuestion[]>;
	loadingInterviewScheduleReport$: Observable<boolean>;

	loadingViewInterviewSchedules$ = new BehaviorSubject<boolean>(false);
	loadingFormInterviewSchedules$ = new BehaviorSubject<boolean>(false);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private interviewEffects: InterviewStateEffects
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.interviewScheduleReport$ = this.store.pipe(
			select(fromInterviewState.getInterviewSchedulesReport)
		);
		this.loadingInterviewScheduleReport$ = this.store.pipe(
			select(fromInterviewState.isInterviewSchedulesReportLoading)
		);
		this.interviewQuestions$ = this.store.pipe(select(fromInterviewState.getInterviewQuestions));

		// Enggan pake loadingInterview buat rd-card, jadi pass value aja ke loadingView
		this.loadingInterviewScheduleReport$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((b) => this.loadingViewInterviewSchedules$.next(b));
		//#endregion

		//#region Auto select first in array
		this.interviewQuestions$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((q) => this.titleSelect.setValue(q[0]));
		//#endregion

		//#region Auto reload data when crud or change gen
		merge(
			this.interviewEffects.createInterviewSchedule$,
			this.interviewEffects.deleteInterviewSchedule$,
			this.mainEffects.changeGen$
		)
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe(() => this.store.dispatch(InterviewStateAction.FetchInterviewSchedulesReport()));
		//#endregion

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: InterviewStateAction.FetchInterviewQuestions(),
				selectorToBeChecked: fromInterviewState.getInterviewQuestions,
			})
		);
		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: InterviewStateAction.FetchInterviewSchedulesReport(),
				selectorToBeChecked: fromInterviewState.getInterviewSchedulesReport,
			})
		);
	}

	isLocationLink(str: string) {
		return str.includes('http');
	}

	insertSchedules() {
		this.loadingFormInterviewSchedules$.next(true);
		this.store.dispatch(
			InterviewStateAction.CreateInterviewSchedule({
				interviewQuestionId: this.titleSelect.value.InterviewQuestionId,
				schedules: (this.schedulesText.value + '').split('\n'),
			})
		);
	}

	deleteSchedule(s: ClientInterviewSchedule) {
		this.store.dispatch(
			InterviewStateAction.DeleteInterviewSchedule({
				interviewScheduleId: s.InterviewScheduleId,
				note: '',
			})
		);
		this.deleteReasonText.reset();
	}
}
