import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardContentBase } from '../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	MainStateEffects,
	VoteStateEffects,
	fromMasterState,
	BinusianStateAction,
	fromBinusianState,
	VoteStateAction,
	fromVoteState,
	MainStateAction,
} from 'src/app/shared/store-modules';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import {
	TopBottomVoteSchedule,
	ClientTrainee,
	ClientPhase,
	TrainerTopBottomVote,
	TopBottomVote,
} from 'src/app/shared/models';
import { takeUntil, filter, map } from 'rxjs/operators';
import { RoleFlags } from 'src/app/shared/constants/role.constant';
import { isEmpty as _isEmpty } from 'lodash';
import { adjustControlsInFormArray, arrayOfValue } from 'src/app/shared/methods';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
	selector: 'rd-top-bottom-vote',
	templateUrl: './top-bottom-vote.component.html',
	styleUrls: ['./top-bottom-vote.component.scss'],
})
export class TopBottomVoteComponent extends DashboardContentBase implements OnInit, OnDestroy {
	viewDateFormat = 'dd MMM';

	loadingViewVote$: Observable<boolean>;
	loadingFormVote$ = new BehaviorSubject<boolean>(false);
	isVoting$: Observable<boolean>;

	phases$: Observable<ClientPhase>;

	voteInScheduleEntity$: Observable<{ [scheduleId: string]: TopBottomVote[] }>;
	voteSchedules$: Observable<TopBottomVoteSchedule[]>;
	traineeVote$: TopBottomVote;
	trainerVote$: TrainerTopBottomVote;

	trainees$: Observable<ClientTrainee>;

	voteForm = this.fb.group({
		voteScheduleId: [''],
		voteScheduleName: [''],
		top: this.fb.array([]),
		bottom: this.fb.array([]),
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
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.trainees$ = this.store.pipe(select(fromBinusianState.getTrainees));
		this.voteSchedules$ = this.store.pipe(select(fromVoteState.getVoteSchedules));
		this.voteInScheduleEntity$ = this.store.pipe(select(fromVoteState.getVoteInScheduleEntity));
		this.loadingViewVote$ = this.store.pipe(select(fromVoteState.isVoteScheduleLoading));
		this.store
			.pipe(select(fromVoteState.isVoteScheduleLoading), takeUntil(this.destroyed$))
			.subscribe(this.loadingFormVote$);

		this.phases$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((phases) => {
				this.store.dispatch(
					BinusianStateAction.FetchTraineesBy({
						phaseId: phases[0].PhaseId,
					})
				);
			});

		this.voteInScheduleEntity$
			.pipe(filter((v) => !_isEmpty(v), takeUntil(this.destroyed$)))
			.subscribe((en) => {
				const voteResult = en[this.voteForm.get('voteScheduleId').value];
				if (_isEmpty(voteResult)) return;
				const currUser = this.currentUser$.value;
				const currUserKey = currUser.Role.is(RoleFlags.Trainee)
					? currUser.TraineeId
					: currUser.UserName;
				const currUserVote = voteResult.find(
					(v: any) => v.TraineeId === currUserKey || v.TrainerName === currUserKey
				);

				if (!_isEmpty(currUserVote)) {
					this.voteForm.disable();
					this.voteForm.patchValue({
						top: currUserVote.TopVotes,
						bottom: currUserVote.BottomVotes,
					});
				}
			});
		this.isVoting$ = this.voteForm
			.get('voteScheduleId')
			.valueChanges //.pipe(map((id) => !_isEmpty(id) && this.voteForm.enabled));

		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingFormVote$.next(false);
		});

		this.store.dispatch(VoteStateAction.FetchTopBottomVoteSchedules());
	}

	get topArray() {
		return this.voteForm.get('top') as FormArray;
	}
	get bottomArray() {
		return this.voteForm.get('bottom') as FormArray;
	}

	selectVoteSchedule(s: TopBottomVoteSchedule) {
		const voteGroupFactory = () => ({
			TraineeId: this.fb.control(null, Validators.required),
			Reason: this.fb.control(null, Validators.required),
		});
		adjustControlsInFormArray(this.topArray, s.VoteCount, voteGroupFactory);
		adjustControlsInFormArray(this.bottomArray, s.VoteCount, voteGroupFactory);

		this.voteForm.enable();
		this.voteForm.reset();
		this.voteForm.patchValue({
			voteScheduleId: s.ScheduleId,
			voteScheduleName: s.ScheduleName,
		});
		this.store.dispatch(
			this.currentUser$.value.Role.is(RoleFlags.Trainee)
				? VoteStateAction.FetchTopBottomVotesForSchedule({ scheduleId: s.ScheduleId })
				: VoteStateAction.FetchTrainerTopBottomVotesForSchedule({ scheduleId: s.ScheduleId })
		);
	}

	cancelVote() {
		this.voteForm.reset();
	}

	saveVote() {
		const { voteScheduleId, voteScheduleName, top, bottom } = this.voteForm.value;

		this.loadingFormVote$.next(true);
		this.store.dispatch(
			VoteStateAction.SubmitTopBottomVote({
				scheduleId: voteScheduleId,
				bottomJson: JSON.stringify(bottom),
				topJson: JSON.stringify(top),
			})
		);
	}
}
