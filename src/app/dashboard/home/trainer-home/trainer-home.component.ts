import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store, select } from '@ngrx/store';
import { FormControl } from '@angular/forms';

import {
	ClientPhase,
	ClientStatistic,
	Message,
	TraineeCommentHistory,
	TrainerTeachingSchedule,
} from 'src/app/shared/models';
import {
	MasterStateAction,
	fromMasterState,
	fromMainState,
	MainStateAction,
	MainStateEffects,
} from 'src/app/shared/store-modules';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators';

import { DashboardContentBase } from '../../dashboard-content-base.component';
import { isEmpty as _isEmpty } from 'lodash';
import { GeneralService } from 'src/app/shared/services/new/general.service';
import { RoleFlags } from 'src/app/shared/constants/role.constant';
import { NoteService } from 'src/app/shared/services/new/note.service';
import { DateHelper } from 'src/app/shared/utilities/date-helper';

@Component({
	selector: 'rd-trainer-home',
	templateUrl: './trainer-home.component.html',
	styleUrls: ['./trainer-home.component.scss'],
})
export class TrainerHomeComponent extends DashboardContentBase implements OnInit, OnDestroy {
	viewDateFormat = DateHelper.WEEKDAY_DATE_FORMAT;

	phases$: Observable<ClientPhase[]>;
	announcements$: Observable<Message[]>;
	trainerTeachingSchedules$: Observable<TrainerTeachingSchedule[]>;
	commentHistory$ = new Subject<TraineeCommentHistory[]>();

	currentPhase = new FormControl();
	statistics$ = new Subject<ClientStatistic[]>();
	loadingTraineeStatistic$ = new BehaviorSubject<boolean>(false);
	loadingAnnouncements$: Observable<boolean>;
	loadingTeachingSchedules$:Observable<boolean>;

	constant = {
		roles: RoleFlags,
	};

	constructor(
		protected store: Store<IAppState>,
		private generalService: GeneralService,
		private noteService: NoteService,
		private mainEffects: MainStateEffects
	) {
		super(store);
	}

	ngOnInit(): void {
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.announcements$ = this.store.pipe(select(fromMainState.getAnnouncements));
		this.loadingAnnouncements$ = this.store.pipe(select(fromMainState.isAnnouncementsLoading));
		this.trainerTeachingSchedules$ = this.store.pipe(select(fromMainState.getUserTeachingSchedules));
		this.loadingTeachingSchedules$ = this.store.pipe(select(fromMainState.isUserTeachingSchedulesLoading));

		// NOTE: Urutan subscription penting, karena currentPhase akan ambil initial value
		//       dari phase kalau phases di Master state sudah ada value, jadi
		//       kalau phases$ di-subscribe duluan nanti sub dari currentPhase$ ngga ke-trigger
		//       ketika currentPhase ambil initial value
		// Kesimpulan: currentPhase harus subscribe sebelum phases$
		this.currentPhase.valueChanges
			.pipe(
				filter((res) => !_isEmpty(res)),
				takeUntil(this.destroyed$),
				// Contoh kalau tidak menggunakan store, langsung pake service
				switchMap((phase) => this.generalService.GetStatisticTrainee({ phaseId: phase.PhaseId }))
			)
			.subscribe((statistics) => {
				this.loadingTraineeStatistic$.next(false);
				this.statistics$.next(statistics);
			});

		this.phases$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((phases) => this.currentPhase.setValue(phases[0]));

		this.noteService.GetTraineeCommentHistory().subscribe((res) => this.commentHistory$.next(res));

		this.mainEffects.changeGen$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(MasterStateAction.FetchPhases());
			this.store.dispatch(MainStateAction.FetchAnnouncements());

			this.noteService
				.GetTraineeCommentHistory()
				.subscribe((res) => this.commentHistory$.next(res));
		});

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
		this.store.dispatch(MainStateAction.FetchAnnouncements());
		this.store.dispatch(MainStateAction.FetchUserTeachingSchedules());
	}

	isRoomLink(room: string) {
		return room.includes('http');
	}
}
