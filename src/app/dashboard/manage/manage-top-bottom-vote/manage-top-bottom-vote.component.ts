import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import {
	ClientTrainee,
	TopBottomVoteSchedule,
	TopBottomVote,
	TrainerTopBottomVote,
} from 'src/app/shared/models';
import { takeUntil, filter, debounceTime, map } from 'rxjs/operators';
import { isEmpty as _isEmpty, sortBy as _sortBy } from 'lodash';
import {
	VoteStateAction,
	fromVoteState,
	BinusianStateAction,
	fromBinusianState,
	MainStateEffects,
	VoteStateEffects,
	MainStateAction,
} from 'src/app/shared/store-modules';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DateHelper } from 'src/app/shared/utilities/date-helper';

@Component({
	selector: 'rd-manage-top-bottom-vote',
	templateUrl: './manage-top-bottom-vote.component.html',
	styleUrls: ['./manage-top-bottom-vote.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageTopBottomVoteComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
	viewDateFormat = DateHelper.DMY_FORMAT;

	voteSchedules$: Observable<TopBottomVoteSchedule[]>;
	traineeVoteSchedules$: Observable<TopBottomVoteSchedule[]>;
	trainerVoteSchedules$: Observable<TopBottomVoteSchedule[]>;
	traineeVotesFiltered$: Observable<TopBottomVote[]>;
	trainerVotesFiltered$: Observable<TrainerTopBottomVote[]>;

	searchTextControl = new FormControl('', { updateOn: 'blur' });
	currentVote: 'trainer' | 'trainee' = 'trainee';

	loadingViewVoteSchedule$: Observable<boolean>;
	loadingViewVoteResult$: Observable<boolean>;
	loadingFormVoteSchedule$ = new BehaviorSubject<boolean>(false);

	traineesEntity: { [id: string]: ClientTrainee } = {}; // for get trainee name by id
	traineeIfNotFound = new ClientTrainee('000', 'T???', 'Unkown Trainee', '0000', false);

	trainees$ = new BehaviorSubject<ClientTrainee[]>([]); // for get trainee name by id
	voteForm = this.fb.group({
		scheduleId: [''], // For Update

		scheduleName: ['', Validators.required],
		voteCount: [1, Validators.required],
		startDate: ['', Validators.required],
		endDate: ['', Validators.required],
		isForTrainer: [false],
	});

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private voteEffects: VoteStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		// Get trainee list once
		this.store
			.pipe(
				select(fromBinusianState.getTraineesEntity),
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((res) => (this.traineesEntity = res));

		this.voteSchedules$ = this.store.pipe(select(fromVoteState.getVoteSchedules));
		this.traineeVoteSchedules$ = this.voteSchedules$.pipe(
			map((arr) => arr.filter((v) => !v.isForTrainer))
		);
		this.trainerVoteSchedules$ = this.voteSchedules$.pipe(
			map((arr) => arr.filter((v) => v.isForTrainer))
		);

		this.traineeVotesFiltered$ = this.store.pipe(select(fromVoteState.getTraineeVotesFiltered));
		this.trainerVotesFiltered$ = this.store.pipe(select(fromVoteState.getTrainerVotesFiltered));

		this.loadingViewVoteResult$ = this.store.pipe(select(fromVoteState.isVoteResultLoading));
		this.loadingViewVoteSchedule$ = this.store.pipe(select(fromVoteState.isVoteScheduleLoading));
		//#endregion

		//#region Subscribe to effects
		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.loadingFormVoteSchedule$.next(false));

		this.mainEffects.changeGen$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(BinusianStateAction.FetchAllTraineesInCurrentGen());
			this.store.dispatch(VoteStateAction.FetchTopBottomVoteSchedules());
		});

		merge(
			this.voteEffects.createTopBottomVoteSchedules$,
			this.voteEffects.updateTopBottomVoteSchedules$,
			this.voteEffects.deleteTopBottomVoteSchedules$
		)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.cancelEdit();
				this.store.dispatch(VoteStateAction.FetchTopBottomVoteSchedules());
			});
		//#endregion

		this.searchTextControl.valueChanges
			.pipe(takeUntil(this.destroyed$))
			.subscribe((text) =>
				this.store.dispatch(VoteStateAction.SetFilterText({ filterText: text }))
			);

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: BinusianStateAction.FetchAllTraineesInCurrentGen(),
				selectorToBeChecked: fromBinusianState.getAllTrainees,
			})
		);
		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: VoteStateAction.FetchTopBottomVoteSchedules(),
				selectorToBeChecked: fromVoteState.getVoteSchedules,
			})
		);
	}

	get isEditing() {
		return !_isEmpty(this.voteForm.get('scheduleId').value);
	}

	selectSchedule(row: TopBottomVoteSchedule) {
		this.voteForm.patchValue({
			scheduleId: row.ScheduleId,
			scheduleName: row.ScheduleName,
			voteCount: row.VoteCount,
			startDate: DateHelper.dateToFormat(row.StartDate),
			endDate: DateHelper.dateToFormat(row.EndDate),
			isForTrainer: row.isForTrainer,
		});

		this.currentVote = row.isForTrainer ? 'trainer' : 'trainee';

		this.store.dispatch(
			row.isForTrainer
				? VoteStateAction.FetchTrainerTopBottomVotesForSchedule({ scheduleId: row.ScheduleId })
				: VoteStateAction.FetchTopBottomVotesForSchedule({ scheduleId: row.ScheduleId })
		);
	}

	cancelEdit() {
		this.voteForm.reset({
			isForTrainer: false,
			voteCount: 1,
		});
	}

	submitForm() {
		this.loadingFormVoteSchedule$.next(true);
		const values = this.voteForm.value;
		values.startDate = new Date(values.startDate);
		values.endDate = new Date(values.endDate);

		if (!this.isEditing) this.store.dispatch(VoteStateAction.CreateTopBottomVoteSchedule(values));
		else this.store.dispatch(VoteStateAction.UpdateTopBottomVoteSchedule(values));
	}

	getTrainee(traineeId: string): ClientTrainee {
		return this.traineesEntity[traineeId] ?? this.traineeIfNotFound;
	}

	deleteVoteSchedule() {
		this.loadingFormVoteSchedule$.next(true);
		this.store.dispatch(
			VoteStateAction.DeleteTopBottomVoteSchedule({
				scheduleId: this.voteForm.get('scheduleId').value,
			})
		);
	}
}
