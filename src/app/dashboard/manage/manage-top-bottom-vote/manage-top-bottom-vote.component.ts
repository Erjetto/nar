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
import { Observable, of, Subject } from 'rxjs';
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

@Component({
	selector: 'rd-manage-top-bottom-vote',
	templateUrl: './manage-top-bottom-vote.component.html',
	styleUrls: ['./manage-top-bottom-vote.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageTopBottomVoteComponent extends DashboardContentBase implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('insertVoteCard') insertScheduleCard: CardComponent;

	public viewDateFormat = 'dd MMM yyyy';

	public trainees: ClientTrainee[];
	public traineeVotes: TopBottomVote[];

	// Use Subject to manually stream new data and automatically markForChanges()
	public traineeVotesFiltered$ = new Subject<TopBottomVote[]>();
	public searchText = '';

	public currentVote: 'trainer' | 'trainee' = 'trainee';

	public voteSchedules$: Observable<TopBottomVoteSchedule[]>;
	public trainerVotes$: Observable<TopBottomVote[]>;

	public voteScheduleLoading$: Observable<boolean>;
	public voteResultLoading$: Observable<boolean>;

	public isEditing = false;
	public editForm = new TopBottomVoteSchedule();

	constructor(private store: Store<IAppState>) {super(store);}

	ngOnInit(): void {
		this.voteSchedules$ = of([
			new TopBottomVoteSchedule(
				'ScheduleId1',
				'Best Trainee',
				3,
				new Date(),
				new Date()
			),
			new TopBottomVoteSchedule(
				'ScheduleId2',
				'Best Trainee 2',
				2,
				new Date(),
				new Date()
			),
			new TopBottomVoteSchedule(
				'ScheduleId3',
				'Best Trainee 3',
				3,
				new Date(),
				new Date()
			),
		]).pipe(delay(500));

		this.trainees = [
			new ClientTrainee('T1', 'T099', 'Rheza', '124123124', true),
			new ClientTrainee('T2', 'T098', 'asdfasdf', '124123124', true),
			new ClientTrainee('T3', 'T097', 'asdfasdfasdf', '124123124', true),
		];

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
  }
  
  ngAfterViewInit(): void {
    this.traineeVotesFiltered$.next(this.traineeVotes);    
  }

	// Arrow function because normal function refer 'this' as null because
	// onTypeSearch is bound to the input
	onTypeSearch = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(500),
			distinctUntilChanged(),
			map((text) => {
        this.searchText = text;
				// TODO: call action like SetSearch({payload: 'text'}) instead
				// Moved to vote.reducer
        let filteredVotes = cloneDeep(this.traineeVotes);
        text = text.toLowerCase();
				if (text !== '') {
					filteredVotes = filteredVotes.filter((vote) => {
						if (
							this.getTrainee(vote.TraineeId)
								.codeAndName.toLowerCase()
								.indexOf(text) !== -1
						)
							return true;

						vote.TopVotes = vote.TopVotes.filter(
							(voteItem) =>
								(voteItem.Reason + ' ' + voteItem.TraineeId)
									.toLowerCase()
									.indexOf(text) !== -1
						);
						vote.BottomVotes = vote.BottomVotes.filter(
							(voteItem) =>
								(voteItem.Reason + ' ' + voteItem.TraineeId)
									.toLowerCase()
									.indexOf(text) !== -1
						);
						return vote.TopVotes.length + vote.BottomVotes.length > 0;
					});
					this.traineeVotesFiltered$.next(filteredVotes);
				}
			})
		);

	onSelectSchedule(row: TopBottomVoteSchedule) {
		this.isEditing = true;
		this.editForm = row;
		this.insertScheduleCard.cardTitle = 'Edit/View Vote Schedule';
		this.insertScheduleCard.toggleMinimized(false);
	}

	onCancelEdit() {
		this.insertScheduleCard.toggleMinimized(true);
		this.insertScheduleCard.cardTitle = 'Insert New Vote Schedule';
		this.isEditing = false;
		this.editForm = new TopBottomVoteSchedule();

		// interval(300).pipe(first()).subscribe(() => {
		// })
		// setTimeout(() => {
		//   this.isEditing = false;
		//   this.caseForm = new Case();
		// },600)
	}

	getTrainee(traineeId: string) {
		return this.trainees.find((t) => t.TraineeId === traineeId);
	}

	onClick() {}
}
