import {
	Component,
	OnInit,
	ViewChild,
	ChangeDetectionStrategy,
	AfterViewInit,
	OnDestroy,
} from '@angular/core';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import {
	ClientTrainee,
	TopBottomVoteSchedule,
	TopBottomVote,
	VoteItem,
	TrainerTopBottomVote,
} from 'src/app/shared/models';
import {
	delay,
	distinctUntilChanged,
	debounceTime,
	map,
	take,
	takeUntil,
	tap,
  filter,
} from 'rxjs/operators';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { clone, cloneDeep, isEmpty } from 'lodash';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import * as VoteStateAction from 'src/app/shared/stores/vote/vote.action';
import * as fromVoteState from 'src/app/shared/stores/vote/vote.reducer';
import * as BinusianStateAction from 'src/app/shared/stores/binusian/binusian.action';
import * as fromBinusianState from 'src/app/shared/stores/binusian/binusian.reducer';

@Component({
	selector: 'rd-manage-top-bottom-vote',
	templateUrl: './manage-top-bottom-vote.component.html',
	styleUrls: ['./manage-top-bottom-vote.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageTopBottomVoteComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
	public viewDateFormat = 'dd MMM yyyy';

	public voteSchedules$: Observable<TopBottomVoteSchedule[]>;
	public traineeVotes$: Observable<TopBottomVote[]>;
	public trainerVotes$: Observable<TrainerTopBottomVote[]>;

	public searchText = '';
	public currentVote: 'trainer' | 'trainee' = 'trainee';

	public voteScheduleLoading$: Observable<boolean>;
	public voteResultLoading$: Observable<boolean>;

	public traineesEntity: {[id:string]: ClientTrainee}; // for get trainee name by id
	public trainees$ = new BehaviorSubject<ClientTrainee[]>([]); // for get trainee name by id
	public editForm$ = new BehaviorSubject<TopBottomVoteSchedule>(null);

	constructor(protected store: Store<IAppState>) {
		super(store);
	}

	ngOnInit(): void {
		// Get trainee list once
		this.store
			.pipe(
				select(fromBinusianState.getTraineesEntity),
				filter((v) => !isEmpty(v)),
				takeUntil(this.destroyed$),
			)
			.subscribe((res) => (this.traineesEntity = res));

		this.voteSchedules$ = this.store.pipe(select(fromVoteState.getVoteSchedules));
		this.traineeVotes$ = this.store.pipe(select(fromVoteState.getTraineeVotesFiltered));
		this.trainerVotes$ = this.store.pipe(select(fromVoteState.getTrainerVotesFiltered));

		this.voteResultLoading$ = this.store.pipe(select(fromVoteState.isVoteResultLoading));
		this.voteScheduleLoading$ = this.store.pipe(select(fromVoteState.isVoteScheduleLoading));

		this.store.dispatch(BinusianStateAction.FetchTrainees());
		this.store.dispatch(VoteStateAction.FetchTopBottomVoteSchedules());
	}

	// Arrow function because normal function refer 'this' as null because
	// onTypeSearch is bound to the input
	onTypeSearch = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			map((text) => this.store.dispatch(VoteStateAction.SetFilterText({ filterText: text })))
		);

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

	getTrainee(traineeId: string): ClientTrainee {
		return this.traineesEntity[traineeId];
	}

	onClick() {}
}
