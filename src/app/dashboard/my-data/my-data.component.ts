import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { isEmpty as _isEmpty } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IAppState } from 'src/app/app.reducer';
import { AdditionalTraineeData, ClientTraineeData } from 'src/app/shared/models';
import {
	BinusianStateAction,
	fromBinusianState,
	MainStateEffects,
} from 'src/app/shared/store-modules';
import { DashboardContentBase } from '../dashboard-content-base.component';

@Component({
	selector: 'rd-my-data',
	templateUrl: './my-data.component.html',
	styleUrls: ['./my-data.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyDataComponent extends DashboardContentBase implements OnInit, OnDestroy {
	permAddressPlaceholder = `e.g.:
Jl. Pahlawan No. 8 RT. 008/RW. 009
Kelurahan Darat Sekip Kecamatan Samarinda Kota
Kota Samarinda Kalimatan Timur`;

	currentAddressTypes = [
		'My permanent address',
		'Boarding house(kos)',
		'New family house (move to new house)',
		'Sibling\'s house',
		'Relative\'s house',
		'Renting house',
	];
	ktpOrPassTypes = [
		'I am below 17 years old',
		'On progress of Identity Card registeration',
		'I fill it with my passport ID',
		'I fill it with my Identity Card number',
	];

	myData$ = new BehaviorSubject<ClientTraineeData>(null);
	loadingMyData$ = new BehaviorSubject<boolean>(false);

	myDataForm = this.fb.group({
		NameBasedOnIDCard: [''],
		KPTOrPassport: [''],
		KPTOrPassportDescrption: ['I fill it with my Identity Card number'],
		NPWP: [''],
		PemanentAddress: [''],
		CurrentAddress: [''],
		CurrentAddressType: ['My permanent address'],
		PhoneNumberList: this.fb.array([this.fb.control(''), this.fb.control('')]),
		BankAccount: [''],
		BankBranch: [''],
	});

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.store
			.pipe(select(fromBinusianState.getMyData), takeUntil(this.destroyed$))
			.subscribe(this.myData$);
		this.store
			.pipe(select(fromBinusianState.isMyDataLoading), takeUntil(this.destroyed$))
			.subscribe(this.loadingMyData$);

		this.myData$
			.pipe(
				takeUntil(this.destroyed$),
				filter((v) => !_isEmpty(v?.AdditionalTraineeData))
			)
			.subscribe((data) => {
				this.myDataForm.patchValue(data.AdditionalTraineeData);
			});

		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
			this.loadingMyData$.next(false);
		});

		this.store.dispatch(BinusianStateAction.FetchMyData());
	}

	save() {
		this.store.dispatch(
			BinusianStateAction.UpdateMyData({
				traineeData: this.myDataForm.value,
			})
		);
		this.loadingMyData$.next(true);
	}

	cancel() {
		this.myDataForm.reset(this.myData$.value);
	}
}
