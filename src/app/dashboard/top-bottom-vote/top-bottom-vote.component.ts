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
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import {
	TopBottomVoteSchedule,
	ClientTrainee,
	ClientPhase,
	TrainerTopBottomVote,
	TopBottomVote,
	User,
} from 'src/app/shared/models';
import { takeUntil, filter, map, withLatestFrom } from 'rxjs/operators';
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
		// Only get active trainee
		this.trainees$ = this.store.pipe(
			select(fromBinusianState.getTrainees),
			withLatestFrom(this.currentUser$),
			map(([trainees, currUser]) =>
				// Kecualikan diri sendiri
				trainees.filter((t) => t.IsActive && t.TraineeId !== currUser.TraineeId)
			)
		);
		this.voteSchedules$ = combineLatest([
			this.store.pipe(select(fromVoteState.getVoteSchedules)),
			this.currentUser$,
		]).pipe(
			map(([schedules, user]: [TopBottomVoteSchedule[], User]) =>
				// isForTrainer berlaku utk role senior lain ex: interviewer, spv, etc
				schedules.filter((s) => !s.isForTrainer === user.Role.is(RoleFlags.Trainee))
			)
		);
		this.voteInScheduleEntity$ = this.store.pipe(select(fromVoteState.getVoteInScheduleEntity));
		
		this.loadingViewVote$ = this.store.pipe(select(fromVoteState.isVoteScheduleLoading));
		this.store
			.pipe(select(fromVoteState.isVoteScheduleLoading), takeUntil(this.destroyed$))
			.subscribe(this.loadingFormVote$);

		this.voteInScheduleEntity$
			.pipe(
				filter((v) => !_isEmpty(v), takeUntil(this.destroyed$)),
				withLatestFrom(this.currentUser$)
			)
			.subscribe(([en, currUser]) => {
				const voteResult = en[this.voteForm.get('voteScheduleId').value];
				if (_isEmpty(voteResult)) return;

				// Agak ribet nyari vote, karena trainee pake Id & trainer pake Name
				const currUserKey = currUser?.Role.is(RoleFlags.Trainee)
					? currUser.TraineeId
					: currUser.UserName;
				const currUserVote = voteResult.find(
					(v: any) => v.TraineeId === currUserKey || v.TrainerName === currUserKey
				);
				
				// Kalo udah vote, disable & munculkan data
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
			.valueChanges.pipe(map((v) => !_isEmpty(v)));

		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingFormVote$.next(false);
		});

		// Disable setelah vote
		this.voteEffects.trainerSubmitVote$.pipe(takeUntil(this.destroyed$)).subscribe((act) => {
			// NOTE: Masih bar-bar, harus bikin tempat khusus utk tahu apakah resultnya success
			// tslint:disable-next-line: no-string-literal
			if (act['messageType'].includes('success')) {
				this.voteForm.disable();
			}
		});

		this.store.dispatch(VoteStateAction.FetchTopBottomVoteSchedules());
		this.store.dispatch(BinusianStateAction.FetchAllTraineesInLatestPhase());
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

	searchByTraineeCodeAndName(term: string, item: ClientTrainee) {
		return item.codeAndName.toLowerCase().includes(term.toLowerCase());
	}
}
