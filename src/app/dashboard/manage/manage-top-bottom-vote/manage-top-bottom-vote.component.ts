import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	OnDestroy,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, BehaviorSubject } from 'rxjs';
import {
	ClientTrainee,
	TopBottomVoteSchedule,
	TopBottomVote,
	TrainerTopBottomVote,
} from 'src/app/shared/models';
import {
	takeUntil,
	filter,
} from 'rxjs/operators';
import * as _ from 'lodash';
import {
	VoteStateAction,
	fromVoteState,
	BinusianStateAction,
	fromBinusianState,
	MainStateEffects,
} from 'src/app/shared/store-modules';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'rd-manage-top-bottom-vote',
	templateUrl: './manage-top-bottom-vote.component.html',
	styleUrls: ['./manage-top-bottom-vote.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageTopBottomVoteComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
	viewDateFormat = 'dd MMM yyyy';

	voteSchedules$: Observable<TopBottomVoteSchedule[]>;
	traineeVotes$: Observable<TopBottomVote[]>;
	trainerVotes$: Observable<TrainerTopBottomVote[]>;

	searchText$ = new BehaviorSubject<string>('');
	currentVote: 'trainer' | 'trainee' = 'trainee';

	loadingViewVoteSchedule$: Observable<boolean>;
	loadingViewVoteResult$: Observable<boolean>;
	loadingFormVoteSchedule$ = new BehaviorSubject<boolean>(false);

	traineesEntity: { [id: string]: ClientTrainee }; // for get trainee name by id
	trainees$ = new BehaviorSubject<ClientTrainee[]>([]); // for get trainee name by id
	editForm$ = new BehaviorSubject<TopBottomVoteSchedule>(null);

	constructor(protected store: Store<IAppState>, private mainEffects: MainStateEffects) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		// Get trainee list once
		this.store
			.pipe(
				select(fromBinusianState.getTraineesEntity),
				filter((v) => !_.isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((res) => (this.traineesEntity = res));

		this.voteSchedules$ = this.store.pipe(select(fromVoteState.getVoteSchedules));
		this.traineeVotes$ = this.store.pipe(select(fromVoteState.getTraineeVotesFiltered));
		this.trainerVotes$ = this.store.pipe(select(fromVoteState.getTrainerVotesFiltered));

		this.loadingViewVoteResult$ = this.store.pipe(select(fromVoteState.isVoteResultLoading));
		this.loadingViewVoteSchedule$ = this.store.pipe(select(fromVoteState.isVoteScheduleLoading));
		//#endregion

		//#region Subscribe to effects
		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.loadingFormVoteSchedule$.next(false));
		//#endregion

		this.searchText$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((text) =>
				this.store.dispatch(VoteStateAction.SetFilterText({ filterText: text }))
			);

		this.store.dispatch(BinusianStateAction.FetchTrainees());
		this.store.dispatch(VoteStateAction.FetchTopBottomVoteSchedules());
	}


	selectSchedule(row: TopBottomVoteSchedule) {
		this.editForm$.next(row);
		this.store.dispatch(
			VoteStateAction.FetchTopBottomVotesForSchedule({ scheduleId: row.ScheduleId })
		);
		this.store.dispatch(
			VoteStateAction.FetchTrainerTopBottomVotesForSchedule({ scheduleId: row.ScheduleId })
		);
	}

	cancelEdit() {
		this.editForm$.next(null);
	}

	submitForm(form: NgForm) {
		const { ScheduleName, AmountVote, StartDate, EndDate, isForTrainerCheck } = form.value;
		if (!this.editForm$.value)
			this.store.dispatch(
				VoteStateAction.CreateTopBottomVoteSchedule({
					scheduleName: ScheduleName,
					voteCount: AmountVote,
					startDate: StartDate,
					endDate: EndDate,
					isForTrainer: isForTrainerCheck.checked,
				})
			);
		else
			this.store.dispatch(
				VoteStateAction.UpdateTopBottomVoteSchedule({
					scheduleId: this.editForm$.value.ScheduleId,
					scheduleName: ScheduleName,
					voteCount: AmountVote,
					startDate: StartDate,
					endDate: EndDate,
					isForTrainer: isForTrainerCheck.checked,
				})
			);
	}

	getTrainee(traineeId: string): ClientTrainee {
		return this.traineesEntity[traineeId];
	}

	deleteVoteSchedule() {
		this.store.dispatch(
			VoteStateAction.DeleteTopBottomVoteSchedule({
				scheduleId: this.editForm$.value.ScheduleId,
			})
		);
	}
}
