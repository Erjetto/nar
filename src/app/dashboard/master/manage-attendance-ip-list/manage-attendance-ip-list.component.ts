import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import {
	MainStateEffects,
	MasterStateEffects,
	fromMasterState,
	MasterStateAction,
	MainStateAction,
} from 'src/app/shared/store-modules';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isEmpty as _isEmpty } from 'lodash';

@Component({
	selector: 'rd-manage-attendance-ip-list',
	templateUrl: './manage-attendance-ip-list.component.html',
	styleUrls: ['./manage-attendance-ip-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageAttendanceIpListComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
	ipFormat = /\d{1-3}.\d{1-3}.\d{1-3}.\d{1-3}/;
	ipListText = new FormControl('', [Validators.required, this.ipFormatValid]);
	ipList$: Observable<string[]>;
	loadingForm$ = new BehaviorSubject(false);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects	) {
		super(store);
	}

	ngOnInit(): void {
		this.ipList$ = this.store.pipe(select(fromMasterState.getIpList));
		this.ipList$.pipe(takeUntil(this.destroyed$)).subscribe((list) => {
			this.ipListText.setValue(list.join('\n'));
		});

		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.loadingForm$.next(false));

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchIPList(),
				selectorToBeChecked: fromMasterState.getIpList,
			})
		);
	}

	updateIPList() {
		this.loadingForm$.next(true);
		this.store.dispatch(
			MasterStateAction.UpdateIPList({ ipList: this.ipListText.value.split('\n') })
		);
	}

	ipFormatValid({ value }: AbstractControl) {
		if (_isEmpty(value)) return null;
		const ipRegex = /^((\d{1,2}|1\d{2}|2[0-4][0-9]|25[0-5])\.){3}(\d{1,2}|1\d{2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
		const ipList = (value + '').split('\n');

		if (!ipList.every((ip) => ipRegex.test(ip))) return { ipFormatError: true };
		else return null;
	}
}
