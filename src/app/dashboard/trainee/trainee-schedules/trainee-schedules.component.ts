import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	BinusianStateAction,
	fromBinusianState,
	fromMasterState,
	MainStateAction,
	MainStateEffects,
	MasterStateAction,
} from 'src/app/shared/store-modules';
import { takeUntil, map, tap, filter } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientPhase, ClientTrainee, SimpleTraineeData } from 'src/app/shared/models';
import { arrayOfValue } from 'src/app/shared/methods';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { isEmpty as _isEmpty } from 'lodash';

@Component({
	selector: 'rd-trainee-schedules',
	templateUrl: './trainee-schedules.component.html',
	styleUrls: ['./trainee-schedules.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TraineeSchedulesComponent extends DashboardContentBase implements OnInit, OnDestroy {
	// phases$: Observable<ClientPhase[]>;
	trainees$: Observable<SimpleTraineeData[]>;
	currYear = new Date().getFullYear();

	// {key: 'Odd 2021', value: '2110'}, {key: 'Event 2021', value: '2120'}
	period = arrayOfValue((idx) => this.currYear - idx, 4).reduce((prev, curr) => {
		const sub = curr % 100;
		return [
			...prev,
			{ key: 'Odd ' + curr, value: sub + '10' },
			{ key: 'Even ' + curr, value: sub + '20' },
			{ key: 'Short ' + curr, value: sub + '30' },
		];
	}, []);

	loadingTraineeSchedule$ = new BehaviorSubject(false);

	form = this.fb.group({
		binusianNumber: [null],
		period: [this.period[0].value],
		startDate: [DateHelper.dateToFormat(new Date())],
		endDate: [DateHelper.dateToFormat(new Date())],
	});

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.trainees$ = this.store.pipe(
			select(fromBinusianState.getTraineesSimpleData),
			tap((res: SimpleTraineeData[]) =>
				!_isEmpty(res) ? this.form.get('binusianNumber').setValue(res[0].TraineeNumber) : ''
			)
		);
		this.store
			.pipe(select(fromBinusianState.isTraineesSimpleDataLoading), takeUntil(this.destroyed$))
			.subscribe(this.loadingTraineeSchedule$);

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: BinusianStateAction.FetchTraineesSimpleData(),
				// observableToBeChecked: this.trainees$,
				selectorToBeChecked: fromBinusianState.getTraineesSimpleData,
			})
		);
	}

	exportSchedule() {
		this.store.dispatch(BinusianStateAction.ExportTraineesSchedule(this.form.value));
	}
}
