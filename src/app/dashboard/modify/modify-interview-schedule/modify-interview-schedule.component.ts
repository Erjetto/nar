import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import {
	ClientInterviewReport,
	ClientInterviewSchedule,
	ClientInterviewQuestion,
	ClientInterviewResult,
} from 'src/app/shared/models';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import {
	MainStateEffects,
	MainStateAction,
	InterviewStateEffects,
	InterviewStateAction,
	fromInterviewState,
} from 'src/app/shared/store-modules';
import { takeUntil, filter, withLatestFrom } from 'rxjs/operators';
import { isEmpty as _isEmpty } from 'lodash';
import { adjustControlsInFormArray } from 'src/app/shared/methods';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { Router } from '@angular/router';

@Component({
	selector: 'rd-modify-interview-schedule',
	templateUrl: './modify-interview-schedule.component.html',
	styleUrls: ['./modify-interview-schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyInterviewScheduleComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
	interviewDateFormat = DateHelper.WEEKDAY_DATE_FORMAT;
	savedAtFormat = DateHelper.WEEKDAY_DATE_FORMAT + ', ' + DateHelper.FULL_TIME_FORMAT;
	statusClass = { Acc: 'acc', Rej: 'reject', Pos: 'pos' };
	grades = [
		{ grade: 'A', min: 91, max: 112 },
		{ grade: 'B', min: 70, max: 90 },
		{ grade: 'C', min: 49, max: 69 },
		{ grade: 'D', min: 28, max: 48 },
		{ grade: 'E', min: 0, max: 27 },
	];

	titleSelect = this.fb.control('', Validators.required);
	schedulesText = this.fb.control('', Validators.required);
	deleteReasonText = this.fb.control('', Validators.required);

	interviewResultForm = this.fb.group({
		Questions: this.fb.array([]),
		AttitudeNote: [],
		DevelopmentNote: [],
		Note: [],
		Decision: [],
		Summary: [],
	});
	// Perlu currentInterviewSchedule$ biar bisa auto close & expand stlh klik
	currentInterviewSchedule$ = new BehaviorSubject<ClientInterviewSchedule>(null);
	currentInterviewResult$ = new BehaviorSubject<ClientInterviewResult>(null);
	weights = [];
	total$ = new BehaviorSubject<number>(0);
	grade$ = new BehaviorSubject<string>('');

	interviewScheduleReport$: Observable<ClientInterviewReport>;
	interviewQuestions$: Observable<ClientInterviewQuestion[]>;
	loadingInterviewScheduleReport$: Observable<boolean>;

	loadingViewInterviewSchedules$ = new BehaviorSubject<boolean>(false);
	loadingFormInterviewSchedules$ = new BehaviorSubject<boolean>(false);
	loadingFormInterviewResult$ = new BehaviorSubject<boolean>(false);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private interviewEffects: InterviewStateEffects,
		private router: Router,
		private fb: FormBuilder
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

		// Add subscription to subject
		this.store
			.pipe(select(fromInterviewState.getInterviewResult), takeUntil(this.destroyed$))
			.subscribe(this.currentInterviewResult$);
		this.store
			.pipe(select(fromInterviewState.isInterviewResultLoading), takeUntil(this.destroyed$))
			.subscribe(this.loadingFormInterviewResult$);
		this.loadingInterviewScheduleReport$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(this.loadingViewInterviewSchedules$);

		// Fetch interview result when selecting a schedule
		this.currentInterviewSchedule$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((schedule) => {
				this.store.dispatch(
					InterviewStateAction.FetchInterviewResult({
						interviewScheduleId: schedule.InterviewScheduleId,
					})
				);
			});

		// Add value into form
		this.currentInterviewResult$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((res) => {
				this.weights = res.Questions.map((q) => q.Weight);
				adjustControlsInFormArray(this.QuestionsFormArr, res.Questions.length);
				this.interviewResultForm.patchValue({
					...res,
					Questions: res.Questions.map((q) => q.Value + ''),
				});
			});

		// Update total & grade
		this.QuestionsFormArr.valueChanges
			.pipe(
				filter((vals) => vals.every((v) => !_isEmpty(v))),
				takeUntil(this.destroyed$)
			)
			.subscribe((arr) => {
				const total = arr.reduce((prev, curr, idx) => prev + +curr * this.weights[idx], 0);

				this.total$.next(total);
				this.grade$.next(this.grades.filter((g) => g.min <= total && total <= g.max)[0]?.grade);
			});

		//#region Auto select first in array
		this.interviewQuestions$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((q) => this.titleSelect.setValue(q[0]));
		//#endregion

		//#region Bind to effects
		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingFormInterviewSchedules$.next(false);
			this.loadingFormInterviewResult$.next(false);
		});

		// Auto reload data when crud or change gen
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

		// Reload when update result
		this.interviewEffects.updateInterviewResult$
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.currentInterviewSchedule$))
			.subscribe(([act, schedule]) => {
				this.store.dispatch(
					InterviewStateAction.FetchInterviewResult({
						interviewScheduleId: schedule.InterviewScheduleId,
					})
				);
			});

		//#endregion

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: InterviewStateAction.FetchInterviewQuestions(),
				selectorToBeChecked: fromInterviewState.getInterviewQuestions,
			})
		);
		this.store.dispatch(InterviewStateAction.FetchInterviewSchedulesReport());
	}

	get QuestionsFormArr() {
		return this.interviewResultForm.get('Questions') as FormArray;
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
				note: this.deleteReasonText.value,
			})
		);
		this.deleteReasonText.reset();
	}

	showInterviewResult(schedule: ClientInterviewSchedule) {
		this.currentInterviewSchedule$.next(schedule);
  }
  
  refreshInterviewSchedules(){
    this.store.dispatch(InterviewStateAction.FetchInterviewSchedulesReport());
  }

	save() {
		const {
			Questions,
			AttitudeNote,
			DevelopmentNote,
			Note,
			Decision,
			Summary,
		} = this.interviewResultForm.value;
		this.store.dispatch(
			InterviewStateAction.UpdateInterviewResult({
				interviewScheduleId: this.currentInterviewResult$.value.InterviewScheduleId,
				details: this.currentInterviewResult$.value.Questions.map((q, idx) => ({
					Number: q.Number,
					Value: +Questions[idx],
				})),
				note: Note,
				decision: Decision,
				attnote: AttitudeNote,
				devnote: DevelopmentNote,
				summary: Summary,
			})
		);
		this.loadingFormInterviewResult$.next(true);
	}
	print() {
		this.router.navigate([
			'print',
			'interview-result',
			this.currentInterviewResult$.value.InterviewScheduleId,
		]);
	}
	cancel() {
		// Reset form value
		this.currentInterviewResult$.next(this.currentInterviewResult$.value);
		this.interviewResultForm.markAsPristine();
	}
}
