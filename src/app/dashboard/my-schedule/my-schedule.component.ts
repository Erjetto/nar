import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAppState } from 'src/app/app.reducer';
import { ClientTrainee, TraineeSchedule } from 'src/app/shared/models';
import {
	BinusianStateAction,
	fromBinusianState,
} from 'src/app/shared/store-modules';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { DashboardContentBase } from '../dashboard-content-base.component';
import { isEmpty as _isEmpty, sortBy as _sortBy } from 'lodash';

@Component({
	selector: 'rd-my-schedule',
	templateUrl: './my-schedule.component.html',
	styleUrls: ['./my-schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyScheduleComponent extends DashboardContentBase implements OnInit, OnDestroy {
	dateFormat = DateHelper.WEEKDAY_DATE_FORMAT;

	traineesEntity$: Observable<{ [id: string]: ClientTrainee }>;
	schedules$: Observable<TraineeSchedule[]>;
	loadingSchedules$: Observable<boolean>;

	constructor(protected store: Store<IAppState>) {
		super(store);
	}

	ngOnInit(): void {
		this.schedules$ = this.store.pipe(
			select(fromBinusianState.getMySchedules),
			map((schedules: TraineeSchedule[]) =>
				_sortBy(schedules, 'AttendanceDate').reverse()
			)
		);
		this.loadingSchedules$ = this.store.pipe(select(fromBinusianState.isMySchedulesLoading));

		this.store.dispatch(
			BinusianStateAction.FetchMySchedules({
				binusianNumber: this.currentUser$.value.UserName,
			})
		);
	}

	isRoomLink(room: string) {
		return room.includes('http');
	}
}
