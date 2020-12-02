import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import {
	tap,
	switchMap,
	takeUntil,
	mergeAll,
	take,
	first,
	filter,
	map,
	mergeMap,
} from 'rxjs/operators';

import {
	ClientPhase,
	ClientStatistic,
	ClientTraineeDailyAttendance,
	Message,
	TraineeComment,
	TraineeCommentHistory,
} from 'src/app/shared/models';
import {
	MasterStateAction,
	fromMasterState,
	fromMainState,
	MainStateAction,
	MainStateEffects,
	fromBinusianState,
	BinusianStateAction,
	NoteStateAction,
	fromNoteState,
} from 'src/app/shared/store-modules';

import { Observable, of, Subject, interval, BehaviorSubject } from 'rxjs';
import { DashboardContentBase } from '../dashboard-content-base.component';
import { isEmpty as _isEmpty } from 'lodash';
import { GeneralService } from 'src/app/shared/services/new/general.service';
import { FormControl } from '@angular/forms';
import { RoleFlags } from 'src/app/shared/constants/role.constant';
import { NoteService } from 'src/app/shared/services/new/note.service';

@Component({
	selector: 'rd-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends DashboardContentBase implements OnInit, OnDestroy {
	phases$: Observable<ClientPhase[]>;
	announcements$: Observable<Message[]>;

	traineeDailyAttendance$: Observable<ClientTraineeDailyAttendance>;

	currentPhase = new FormControl();
	statistics$ = new Subject<ClientStatistic[]>();
	commentHistory$ = new Subject<TraineeCommentHistory[]>();

	loadingTraineeStatistic$ = new BehaviorSubject<boolean>(false);
	loadingAnnouncements$: Observable<boolean>;

	destroyed$: Subject<any> = new Subject();

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
		this.traineeDailyAttendance$ = this.store.pipe(select(fromBinusianState.getDailyAttendance));
		this.announcements$ = this.store.pipe(select(fromMainState.getAnnouncements));
		this.loadingAnnouncements$ = this.store.pipe(select(fromMainState.isAnnouncementsLoading));

		if (this.currentUser$.value.Role.is(RoleFlags.Trainee) === false) {
			// NOTE: Urutan subscription penting, karena currentPhase akan ambil initial value
			//       dari phase kalau phases di Master state sudah ada value, jadi
			//       kalau phases$ di-subscribe duluan nanti sub dari currentPhase$ ngga ke-trigger
			//       ketika currentPhase ambil initial value
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

			this.noteService
				.GetTraineeCommentHistory()
				.subscribe((res) => this.commentHistory$.next(res));
		} else {
			this.store.dispatch(BinusianStateAction.FetchDailyAttendance());
		}

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
	}
}
