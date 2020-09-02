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
} from 'src/app/shared/models';
import { delay, distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { clone, cloneDeep } from 'lodash';
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
	implements OnInit, AfterViewInit, OnDestroy {
	public viewDateFormat = 'dd MMM yyyy';

	public voteSchedules$: Observable<TopBottomVoteSchedule[]>;
	public trainerVotes$: Observable<TopBottomVote[]>;
	public trainees$: Observable<ClientTrainee[]>;
	public traineeVotes$: Observable<TopBottomVote[]>;

	public trainees: ClientTrainee[];
	public traineeVotes: TopBottomVote[];

	// Use Subject to manually stream new data and automatically markForChanges()
	public traineeVotesFiltered$: Observable<TopBottomVote[]>;
	public searchText = '';

	public currentVote: 'trainer' | 'trainee' = 'trainee';

	public voteScheduleLoading$: Observable<boolean>;
	public voteResultLoading$: Observable<boolean>;

	public editForm$: BehaviorSubject<TopBottomVoteSchedule> = new BehaviorSubject(null);

	constructor(protected store: Store<IAppState>) {
		super(store);
	}

	ngOnInit(): void {
		this.voteSchedules$ = this.store.pipe(select(fromVoteState.getVoteSchedules));
		this.traineeVotesFiltered$ = this.store.pipe(select(fromVoteState.getTraineeVotesFiltered));
		this.trainees$ = this.store.pipe(select(fromBinusianState.getTrainees));
		this.voteResultLoading$ = this.store.pipe(select(fromVoteState.isVoteResultLoading));
		this.voteScheduleLoading$ = this.store.pipe(select(fromVoteState.isVoteScheduleLoading));

		this.traineeVotes = [
			new TopBottomVote(
				'T1',
				'v2',
				'ScheduleId1',
				[
					new VoteItem(
						'T2',
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat sapiente, temporibus voluptates non vero itaque! Dolorum commodi accusamus sit, non consequuntur nostrum omnis quibusdam voluptates quo consectetur ut eum voluptatibus!'
					),
					new VoteItem('T2', 'Pintar'),
				],
				[new VoteItem('T3', 'Jelek')]
			),
			new TopBottomVote(
				'T2',
				'v3',
				'ScheduleId1',
				[new VoteItem('T2', 'Pintar')],
				[new VoteItem('T3', 'Sombong')]
			),
			new TopBottomVote(
				'T2',
				'v3',
				'ScheduleId1',
				[new VoteItem('T2', 'Tampan')],
				[new VoteItem('T3', 'Jelek')]
			),
			new TopBottomVote(
				'T2',
				'v3',
				'ScheduleId1',
				[new VoteItem('T2', 'Sombong')],
				[new VoteItem('T3', 'Jelek')]
			),
			new TopBottomVote(
				'T2',
				'v3',
				'ScheduleId1',
				[new VoteItem('T2', 'Tampan')],
				[new VoteItem('T3', 'Jelek')]
			),
		];
		this.store.dispatch(VoteStateAction.FetchTopBottomVoteSchedules());
	}

	ngAfterViewInit(): void {
		// this.traineeVotesFiltered$.next(this.traineeVotes);
	}

	// Arrow function because normal function refer 'this' as null because
	// onTypeSearch is bound to the input
	onTypeSearch = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(500),
			distinctUntilChanged(),
			map((text) => {
				this.store.dispatch(VoteStateAction.SetFilterText({ filterText: text }));
				// this.searchText = text;
				// TODO: call action like SetSearch({payload: 'text'}) instead
				// Moved to vote.reducer
				// let filteredVotes = cloneDeep(this.traineeVotes);
				// text = text.toLowerCase();
				// if (text !== '') {
				// 	filteredVotes = filteredVotes.filter((vote) => {
				// 		if (this.getTrainee(vote.TraineeId).codeAndName.toLowerCase().indexOf(text) !== -1)
				// 			return true;

				// 		vote.TopVotes = vote.TopVotes.filter(
				// 			(voteItem) =>
				// 				(voteItem.Reason + ' ' + voteItem.TraineeId).toLowerCase().indexOf(text) !== -1
				// 		);
				// 		vote.BottomVotes = vote.BottomVotes.filter(
				// 			(voteItem) =>
				// 				(voteItem.Reason + ' ' + voteItem.TraineeId).toLowerCase().indexOf(text) !== -1
				// 		);
				// 		return vote.TopVotes.length + vote.BottomVotes.length > 0;
				// 	});
				// 	this.traineeVotesFiltered$.next(filteredVotes);
				// }
			})
		);

	selectSchedule(row: TopBottomVoteSchedule) {
		this.editForm$.next(row);
		this.store.dispatch(
			VoteStateAction.FetchTopBottomVotesForSchedule({ scheduleId: row.ScheduleId })
		);
	}

	cancelEdit() {
		this.editForm$.next(null);
	}

	getTrainee(traineeId: string) {
		return this.trainees.find((t) => t.TraineeId === traineeId);
	}

	onClick() {}
}
