import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { isEmpty as _isEmpty, orderBy as _orderBy } from 'lodash';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { delayWhen, filter, map, takeUntil, tap } from 'rxjs/operators';
import { IAppState } from 'src/app/app.reducer';
import { arrayToListObject, arrayToObject } from 'src/app/shared/methods';
import {
	ClientTrainee,
	ClientUserInRoles,
	EMPTY_GUID,
	FLKNote,
	FLKQueue,
	FLKStatus,
	Role,
	User,
} from 'src/app/shared/models';
import {
	MainStateEffects,
	InterviewStateEffects,
	MainStateAction,
	fromBinusianState,
	MasterStateAction,
	BinusianStateAction,
	fromMasterState,
	MasterStateEffects,
} from 'src/app/shared/store-modules';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { DashboardContentBase } from '../../dashboard-content-base.component';

@Component({
	selector: 'rd-trainee-flk',
	templateUrl: './trainee-flk.component.html',
	styleUrls: ['./trainee-flk.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TraineeFlkComponent extends DashboardContentBase implements OnInit, OnDestroy {
	FLKStatus = FLKStatus;
	viewDateFormat = DateHelper.DATE_TIME_FORMAT;
	queueFilter$ = new BehaviorSubject<FLKStatus[]>([FLKStatus.None, FLKStatus.OnCheck]);

	statusNoteControl = this.fb.control('', Validators.required);
	checkerControl = this.fb.control('', Validators.required);

	flkQueues$: Observable<FLKQueue[]>;
	flkNotes$: Observable<FLKNote[]>;
	trainees$: Observable<ClientTrainee[]>;
	spvUsers$: Observable<ClientUserInRoles[]>;

	filteredFLKQueues$: Observable<FLKQueue[]>;
	// Filtered to the latest submission per trainee
	latestFLKSubmissionsPerTrainee$: Observable<{ trainee: ClientTrainee; submission: FLKQueue }[]>;
	defaultSubmission = new FLKQueue('', '', '', '', EMPTY_GUID, 0, '', '-', new Date(), new Date());

	loadingFLKQueue$ = new BehaviorSubject<boolean>(false);
	loadingFLKSubmissionsPerTrainee$ = new BehaviorSubject<boolean>(false);

	currentTrainee$ = new BehaviorSubject<ClientTrainee>(null);

	traineeDict: { [traineeId: string]: ClientTrainee } = {};
	flkNotesPerTraineeId: { [traineeId: string]: string } = {};
	flkQueuePerTraineeId: { [traineeId: string]: FLKQueue[] } = {};

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private masterEffects: MasterStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.spvUsers$ = this.store.pipe(
			select(fromMasterState.getUserInRoles),
			map((users: ClientUserInRoles[]) => users.filter((u) => Role.from(u.Role).isAstSpv))
		);
		this.trainees$ = this.store.pipe(
			select(fromBinusianState.getAllTrainees),
			tap((res: ClientTrainee[]) => (this.traineeDict = arrayToObject(res, (t) => t.TraineeId)))
		);
		this.flkNotes$ = this.store.pipe(
			select(fromMasterState.getFLKNotes),
			filter((v) => !_isEmpty(v)),
			tap(
				(res: FLKNote[]) =>
					(this.flkNotesPerTraineeId = arrayToObject(
						res,
						(t) => t.TraineeId,
						(t) => t.Note
					))
			)
		);
		this.flkQueues$ = this.store.pipe(
			select(fromMasterState.getFLKQueues),
			delayWhen(() => this.trainees$), // Wait until trainee gets into traineeDict
			delayWhen(() => this.flkNotes$), // For note is fetched
			delayWhen(() => this.currentUser$), // For checking availability
			map((res) => _orderBy(res, 'SavedDate', 'desc')),
			tap(
				(res: FLKQueue[]) =>
					(this.flkQueuePerTraineeId = arrayToListObject(res, (t) => t.TraineeId))
			),
			map((res) => res.filter((r) => r.Status !== FLKStatus.Rejected))
		);
		this.filteredFLKQueues$ = combineLatest([this.flkQueues$, this.queueFilter$]).pipe(
			map(([flks, filters]) => flks.filter((f) => filters.includes(f.Status)))
		);
		this.store
			.pipe(
				select(fromMasterState.getMasterState),
				map((v) => v.loadingFLKNotes || v.loadingFLKQueues),
				takeUntil(this.destroyed$)
			)
			.subscribe(this.loadingFLKSubmissionsPerTrainee$);
		this.store
			.pipe(select(fromMasterState.isFLKQueuesLoading), takeUntil(this.destroyed$))
			.subscribe(this.loadingFLKQueue$);

		this.latestFLKSubmissionsPerTrainee$ = combineLatest([this.trainees$, this.flkQueues$]).pipe(
			map(([trainees, submissions]) =>
				trainees.map((t) => ({
					trainee: t,
					submission: this.flkQueuePerTraineeId[t.TraineeId]
						? this.flkQueuePerTraineeId[t.TraineeId][0]
						: this.defaultSubmission,
				}))
			)
		);

		this.masterEffects.setFLKQueue$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(MasterStateAction.FetchFLKQueues());
		});
		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingFLKQueue$.next(false);
		});
		this.mainEffects.changeGen$.pipe(takeUntil(this.destroyed$)).subscribe(this.refreshData);

		this.refreshData();
	}

	refreshData() {
		this.store.dispatch(BinusianStateAction.FetchAllTraineesInCurrentGen());
		this.store.dispatch(MasterStateAction.FetchUserInRoles());
		this.store.dispatch(MasterStateAction.FetchFLKQueues());
		this.store.dispatch(MasterStateAction.FetchFLKNotes());
	}

	refreshFLKQueue() {
		this.store.dispatch(MasterStateAction.FetchFLKQueues());
	}

	downloadFLK(fileId: string) {
		this.store.dispatch(MainStateAction.DownloadFile({ fileId }));
	}

	setFLKQueue(flk: FLKQueue, into: boolean) {
		this.loadingFLKQueue$.next(true);
		this.store.dispatch(
			MasterStateAction.UpdateFLKQueue({
				flkQueueId: flk.FLKQueueId,
				into: into ? FLKStatus.Accepted : FLKStatus.Rejected,
				checker: '',
				note: this.statusNoteControl.value,
			})
		);
	}

	assignChecker(flk: FLKQueue) {
		this.loadingFLKQueue$.next(true);
		this.store.dispatch(
			MasterStateAction.UpdateFLKQueue({
				flkQueueId: flk.FLKQueueId,
				into: FLKStatus.OnCheck,
				checker: this.checkerControl.value,
				note: '',
			})
		);
	}
}
