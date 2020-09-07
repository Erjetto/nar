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
import { Observable, of, Subject, BehaviorSubject, combineLatest } from 'rxjs';
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
	public viewDateFormat = 'dd MMM yyyy';

	public voteSchedules$: Observable<TopBottomVoteSchedule[]>;
	public traineeVotes$: Observable<TopBottomVote[]>;
	public trainerVotes$: Observable<TrainerTopBottomVote[]>;

	public searchText = '';
	public currentVote: 'trainer' | 'trainee' = 'trainee';

	public loadingViewVoteSchedule$: Observable<boolean>;
	public loadingViewVoteResult$: Observable<boolean>;
	public loadingFormVoteSchedule$ = new BehaviorSubject<boolean>(false);

	public traineesEntity: { [id: string]: ClientTrainee }; // for get trainee name by id
	public trainees$ = new BehaviorSubject<ClientTrainee[]>([]); // for get trainee name by id
	public editForm$ = new BehaviorSubject<TopBottomVoteSchedule>(null);

	constructor(protected store: Store<IAppState>, private mainEffects: MainStateEffects) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		// Get trainee list once
		this.store
			.pipe(
				select(fromBinusianState.getTraineesEntity),
				filter((v) => !isEmpty(v)),
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
    
    combineLatest([])

		this.store.dispatch(BinusianStateAction.FetchTrainees());
		this.store.dispatch(VoteStateAction.FetchTopBottomVoteSchedules());
	}

	// Arrow function because normal function refer 'this' as null because
	// onTypeSearch is bound to the input
	onTypeSearch = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			tap((text) => this.store.dispatch(VoteStateAction.SetFilterText({ filterText: text })))
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
