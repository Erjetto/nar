import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store, select } from '@ngrx/store';

import { map } from 'rxjs/operators';

import {
	ClientTraineeDailyAttendance,
	CoreTrainingPresentation,
	CoreTrainingPresentationQuestion,
	Message,
	TraineeSchedule,
} from 'src/app/shared/models';
import {
	fromMainState,
	MainStateAction,
	fromBinusianState,
	BinusianStateAction,
	fromPresentationState,
	PresentationStateAction,
} from 'src/app/shared/store-modules';

import { Observable, Subject } from 'rxjs';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { isEmpty as _isEmpty, sortBy as _sortBy } from 'lodash';

@Component({
	selector: 'rd-trainee-home',
	templateUrl: './trainee-home.component.html',
	styleUrls: ['./trainee-home.component.scss'],
})
export class TraineeHomeComponent extends DashboardContentBase implements OnInit, OnDestroy {
	dateFormat = DateHelper.WEEKDAY_DATE_FORMAT;

	traineeDailyAttendance$: Observable<ClientTraineeDailyAttendance>;
	announcements$: Observable<Message[]>;

	schedules$: Observable<TraineeSchedule[]>;
	incorrectPresentationQuestions$: Observable<CoreTrainingPresentationQuestion[]>;

	loadingMyPresentations$: Observable<boolean>;
	loadingDailyAttendance$: Observable<boolean>;
	loadingAnnouncements$: Observable<boolean>;
	loadingSchedules$: Observable<boolean>;

	constructor(protected store: Store<IAppState>) {
		super(store);
	}

	ngOnInit(): void {
		this.traineeDailyAttendance$ = this.store.pipe(select(fromBinusianState.getDailyAttendance));
		this.announcements$ = this.store.pipe(select(fromMainState.getAnnouncements));
		this.schedules$ = this.store.pipe(
			select(fromBinusianState.getMySchedules),
			map((schedules: TraineeSchedule[]) => _sortBy(schedules, 'AttendanceDate').reverse())
		);
		
		// Ambil semua pertanyaan dari semua presentasi
		this.incorrectPresentationQuestions$ = this.store.pipe(
			select(fromPresentationState.getMyPresentations),
			map((presentations: CoreTrainingPresentation[]) =>
				presentations
					.reduce((prev, curr) => [...prev, ...curr.Questions], [])
					.filter((q:CoreTrainingPresentationQuestion) => q.Status !== 'correct')
			)
		);

		this.loadingDailyAttendance$ = this.store.pipe(
			select(fromBinusianState.isDailyAttendanceLoading)
		);
		this.loadingAnnouncements$ = this.store.pipe(select(fromMainState.isAnnouncementsLoading));
		this.loadingSchedules$ = this.store.pipe(select(fromBinusianState.isMySchedulesLoading));
		this.loadingSchedules$ = this.store.pipe(select(fromPresentationState.isPresentationsLoading));

		this.store.dispatch(BinusianStateAction.FetchDailyAttendance());
		this.store.dispatch(
			BinusianStateAction.FetchMySchedules({
				binusianNumber: this.currentUser$.value.UserName,
			})
		);
		this.store.dispatch(MainStateAction.FetchAnnouncements());
		this.store.dispatch(PresentationStateAction.FetchMyPresentations());
	}

	isRoomLink(room: string) {
		return room.includes('http');
	}
}
