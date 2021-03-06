import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, merge, BehaviorSubject } from 'rxjs';

import {
	EMPTY_GUID,
	SubcoCandidateAnswerModel,
	SubcoCandidateQuestionModel,
} from 'src/app/shared/models';
import {
	CandidateStateAction,
	fromCandidateState,
	MainStateAction,
	MainStateEffects,
	CandidateStateEffects,
	fromMasterState,
} from 'src/app/shared/store-modules';
import { takeUntil, map, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { sortBy as _sortBy } from 'lodash';

@Component({
	selector: 'rd-answer-schedule',
	templateUrl: './answer-schedule.component.html',
	styleUrls: ['./answer-schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerScheduleComponent extends DashboardContentBase implements OnInit, OnDestroy {
	currentYear = new Date().getFullYear();

	addSchedulePlaceholder = '';
	addScheduleDateFormat = DateHelper.FULL_DATE_FORMAT + ' ' + DateHelper.NORMAL_TIME_FORMAT;
	scheduleDetailDateFormat = DateHelper.DATETIME_LOCAL_FORMAT;

	questions: SubcoCandidateQuestionModel;

	trainerSchedule$: Observable<SubcoCandidateAnswerModel[]>;
	selectedSchedule$: Observable<SubcoCandidateAnswerModel>;
	questionModel$: Observable<SubcoCandidateQuestionModel>;

	loadingViewSchedule$: Observable<boolean>;
	loadingViewScheduleDetail$ = new BehaviorSubject(false);
	loadingFormSchedule$ = new BehaviorSubject(false);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private candidateEffects: CandidateStateEffects
	) {
		super(store);
		const today = DateHelper.dateToFormat(Date.now(), this.addScheduleDateFormat);
		this.addSchedulePlaceholder = `${today}, ${today}, XX99-9`;
	}

	ngOnInit(): void {
		this.trainerSchedule$ = this.store.pipe(
			select(fromCandidateState.getAnswerModels),
			map((schedules) => _sortBy(schedules, 'TrainerName')) // Temporary until table have sort feature
		);
		this.selectedSchedule$ = this.store.pipe(select(fromCandidateState.getSelectedAnswer));
		this.questionModel$ = this.store.pipe(select(fromCandidateState.getQuestionModel));
		this.loadingViewSchedule$ = this.store.pipe(select(fromCandidateState.isLoadingAnswersModel));
		this.questionModel$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
			this.questions = res;
		});

		// When change gen, reload question & answers
		this.mainEffects.changeGen$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(CandidateStateAction.FetchQuestionsForCurrentGen());
			this.store.dispatch(CandidateStateAction.FetchAnswers());
		});
		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingViewScheduleDetail$.next(false);
			this.loadingFormSchedule$.next(false);
		});

		// Reload schedule when do crud
		merge(
			this.candidateEffects.createAnswerSchedule$,
			this.candidateEffects.deleteAnswerSchedule$,
			this.candidateEffects.updateAnswerSchedule$
		)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.store.dispatch(CandidateStateAction.FetchAnswers());
			});

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: CandidateStateAction.FetchQuestionsForCurrentGen(),
				selectorToBeChecked: fromCandidateState.getQuestionModel,
			})
		);
		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: CandidateStateAction.FetchAnswers(),
				selectorToBeChecked: fromCandidateState.getAnswerModels,
			})
		);
	}

	selectSchedule(row: SubcoCandidateAnswerModel) {
		this.store.dispatch(CandidateStateAction.ViewSchedule({ payload: row }));
	}

	closeViewSchedule() {
		this.store.dispatch(CandidateStateAction.ViewSchedule({ payload: null }));
	}

	deleteSchedule(form: NgForm) {
		this.loadingViewScheduleDetail$.next(true);
		this.store.dispatch(CandidateStateAction.DeleteSchedule({ answerId: form.value.answerId }));
	}

	saveSchedule(form: NgForm) {
		this.loadingViewScheduleDetail$.next(true);
		const { answerId, startTime, endTime } = form.value;
		this.store.dispatch(
			CandidateStateAction.UpdateSchedule({
				answerId,
				endDate: endTime,
				startDate: startTime,
			})
		);
	}

	createSchedule(csvString: string) {
		this.loadingFormSchedule$.next(true);
		const regex = /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}), (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}), (....-.)/i;
		const errorIdx = [];
		const schedules = csvString.split('\n').map((line, idx) => {
			const arr = regex.exec(line); // if fails regex returns null
			if (!!arr)
				return new SubcoCandidateAnswerModel(
					EMPTY_GUID,
					EMPTY_GUID,
					'',
					arr[5],
					[],
					new Date(arr[1] + ' ' + arr[2]),
					new Date(arr[3] + ' ' + arr[4])
				);
			else errorIdx.push(idx + 1);
			return null;
		});

		if (errorIdx.length === 0)
			this.store.dispatch(CandidateStateAction.CreateSchedule({ schedules }));
		else {
			this.loadingFormSchedule$.next(false);
			this.store.dispatch(
				MainStateAction.ToastMessage({
					messageType: 'danger',
					message: 'Wrong format in row : ' + errorIdx.join(', '),
				})
			);
		}
	}

	exportToExcel() {
		this.store.dispatch(CandidateStateAction.ExportAnswersToExcel());
	}

	trackScheduleById(idx: number, s: SubcoCandidateAnswerModel) {
		return s.Id;
	}

	formatForStartDate(s: SubcoCandidateAnswerModel) {
		return s.StartDate.getFullYear() !== this.currentYear ? 'yyyy MMM dd, HH:mm' : 'MMM dd, HH:mm';
	}

	formatForEndDate(s: SubcoCandidateAnswerModel) {
		const sameYear = s.StartDate.getFullYear() === s.EndDate.getFullYear();
		const sameMonth = s.StartDate.getMonth() === s.EndDate.getMonth();
		const sameDay =  s.StartDate.getDate() === s.EndDate.getDate();
		return `${!sameYear ? 'yyyy ' : ''}${!sameMonth ? 'MMM ' : ''}${!sameDay ? 'dd, ' : ''} HH:mm`;
	}
}
