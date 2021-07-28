import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	PresentationStateAction,
	MasterStateAction,
	fromPresentationState,
	fromBinusianState,
	BinusianStateAction,
	fromMasterState,
} from 'src/app/shared/store-modules';
import { FormBuilder } from '@angular/forms';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import {
	CoreTrainingPresentation,
	CoreTrainingPresentationItem,
	ClientTraineeView,
	ClientUserInRoles,
} from 'src/app/shared/models';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import {
	map,
	takeUntil,
	filter,
	startWith,
	distinctUntilChanged,
	debounceTime,
} from 'rxjs/operators';
import { isEmpty as _isEmpty, flatten as _flatten, orderBy as _orderBy } from 'lodash';
import { dateInRange } from 'src/app/shared/methods';
import { DateHelper } from 'src/app/shared/utilities/date-helper';

@Component({
	selector: 'rd-presentation-report',
	templateUrl: './presentation-report.component.html',
	styleUrls: ['./presentation-report.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationReportComponent extends DashboardContentBase implements OnInit, OnDestroy {
	today = DateHelper.dateToFormat(new Date());

	allAnswers$: Observable<CoreTrainingPresentationItem[]>;
	allAnswersFiltered$: Observable<CoreTrainingPresentationItem[]>;
	traineesInPhase$: Observable<ClientTraineeView[]>;
	allTrainer$: Observable<ClientUserInRoles[]>;

	loadingTrainees$: Observable<boolean>;
	loadingTrainers$: Observable<boolean>;
	loadingPresentations$: Observable<boolean>;

	loadingViewTraineeAnswerCount$ = new BehaviorSubject(false);

	// percent => 0-100
	traineeAnswerCount$: Observable<{ number; name; count; percent; isActive }[]>;
	traineeAnswerCountFiltered$: Observable<{ number; name; count; percent; isActive }[]>;
	trainerAnswerCount$: Observable<{ initial; count; percent }[]>;
	trainerAnswerCountFiltered$: Observable<{ initial; count; percent }[]>;

	dateFilterForm = this.fb.group({
		start: [this.today],
		end: [this.today],
	});
	nameFilterForm = this.fb.control('');
	nameFilter$: Observable<string>;

	constructor(protected store: Store<IAppState>, private fb: FormBuilder) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind from store
		this.loadingPresentations$ = this.store.pipe(
			select(fromPresentationState.isPresentationsLoading)
		);
		this.loadingTrainees$ = this.store.pipe(select(fromBinusianState.isTraineesLoading));
		this.traineesInPhase$ = this.store.pipe(select(fromBinusianState.getTrainees));
		this.allTrainer$ = this.store.pipe(select(fromMasterState.getUserInRoles));
		// this.allTrainer$ = this.store.pipe(select(fromMasterState.getUserInRoles));

		this.allAnswers$ = this.store.pipe(
			select(fromPresentationState.getPresentations),
			// Ambil answer dari questions dari presentations
			map((presentations: CoreTrainingPresentation[]) =>
				_flatten(_flatten(presentations.map((p) => p.Questions)).map((q) => q.Answers))
			)
		);
		//#endregion
		this.nameFilter$ = this.nameFilterForm.valueChanges.pipe(
			// Kasih jeda 250 ms delay buat ketik sebelum trigger, harus uniq, lalu tolowercase
			debounceTime(250),
			distinctUntilChanged(),
			map((v: string) => v.toLowerCase()),
			startWith('')
		);

		// Filter jawaban by history date
		this.allAnswersFiltered$ = combineLatest([
			this.allAnswers$,
			this.dateFilterForm.valueChanges.pipe(startWith({ start: this.today, end: this.today })),
		]).pipe(
			map(([answers, filterForm]) => {
				const start = new Date(filterForm.start);
				const end = new Date(filterForm.end);
				return answers.filter((a) => dateInRange(start, end, a.Histories[0].SavedDate));
			})
		);

		this.traineeAnswerCount$ = combineLatest([
			this.allAnswersFiltered$,
			this.traineesInPhase$.pipe(
				map((trainees) =>
					// Ubah ClientTrainee jadi data yg dibutuhkan
					trainees.map((curr) => ({
						number: curr.TraineeCode,
						name: curr.TraineeName,
						count: 0,
						isActive: curr.IsActive,
						percent: 0,
					}))
				)
			),
		]).pipe(
			takeUntil(this.destroyed$),
			map(([answers, trainees]) => {
				// Hitung jawaban tiap user berdasarkan nama
				const answerCounters: { [name: string]: number } = {};
				answers.forEach(
					(a) => (answerCounters[a.UserName] = (answerCounters[a.UserName] || 0) + 1)
				);
				const max = Math.max(...Object.values(answerCounters));
				return trainees.map((t) => ({
					...t,
					count: answerCounters[t.name] || 0,
					percent: (((answerCounters[t.name] || 0) / max) * 100).toFixed(0),
				}));
			})
		);

		this.traineeAnswerCountFiltered$ = combineLatest([
			this.traineeAnswerCount$,
			this.nameFilter$,
		]).pipe(
			takeUntil(this.destroyed$),
			map(([trainees, name]) =>
				// Filter lalu sort by count desc
				_orderBy(
					Object.values(trainees).filter((t) => t.name.toLowerCase().includes(name)),
					'count',
					'desc'
				)
			)
		);

		this.trainerAnswerCount$ = combineLatest([
			this.allTrainer$.pipe(
				// Ubah User jadi data yg dibutuhkan
				map((users) =>
					users.reduce<{ initial; count }[]>(
						(acc, curr) => [...acc, { initial: curr.UserName, count: 0 }],
						[]
					)
				)
			),
			this.allAnswersFiltered$,
		]).pipe(
			map(([trainers, answers]) => {
				// answers.forEach((a) => trainers[a.UserId].count++);
				// 	return trainers;
				const answerCounters: { [name: string]: number } = {};
				answers.forEach((a) => {
					if (!_isEmpty(a.StatusBy))
						answerCounters[a.StatusBy] = (answerCounters[a.StatusBy] || 0) + 1;
				});
				const max = Math.max(...Object.values(answerCounters));
				return trainers.map((t) => ({
					...t,
					count: answerCounters[t.initial] || 0,
					percent: (((answerCounters[t.initial] || 0) / max) * 100).toFixed(0),
				}));
			})
		);

		this.trainerAnswerCountFiltered$ = combineLatest([
			this.trainerAnswerCount$,
			this.nameFilter$,
		]).pipe(
			map(([trainers, name]) =>
				_orderBy(
					Object.values(trainers).filter((t) => t.initial.toLowerCase().includes(name)),
					'count',
					'desc'
				)
			)
		);

		this.currentGeneration$
			.pipe(
				takeUntil(this.destroyed$),
				filter((v) => !_isEmpty(v))
			)
			.subscribe((gen) => {
				this.store.dispatch(MasterStateAction.FetchUserInRoles());
				this.store.dispatch(
					PresentationStateAction.FetchPresentationsBy({
						generationId: gen.GenerationId,
					})
				);
			});

		this.store.dispatch(BinusianStateAction.FetchAllTraineesInLatestPhase());
	}
}
