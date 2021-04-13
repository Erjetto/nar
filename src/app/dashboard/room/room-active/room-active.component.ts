import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IAppState } from 'src/app/app.reducer';
import { ClientRoom, ClientRoomTransaction } from 'src/app/shared/models';
import {
	fromRoomState,
	MainStateEffects,
	RoomStateAction,
	RoomStateEffects,
} from 'src/app/shared/store-modules';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { DashboardContentBase } from '../../dashboard-content-base.component';

@Component({
	selector: 'rd-room-active',
	templateUrl: './room-active.component.html',
	styleUrls: ['./room-active.component.scss'],
})
export class RoomActiveComponent extends DashboardContentBase implements OnInit, OnDestroy {
	roomTransactionsByShift$: Observable<{
		[shift: number]: ClientRoomTransaction[];
	}>;
	rooms$: Observable<ClientRoom[]>;

	loadingForm$ = new BehaviorSubject(false);
	loadingView$ = new BehaviorSubject(false);

	roomTypes = ['Presentation', 'Room', 'Teaching'];
	roomTransactionViewControl = this.fb.control(null);
	insertRoomForm = this.fb.group({
		Date: [DateHelper.dateToFormat(new Date())], // "3-27-2021"
		Shift: [null, Validators.required],
		PIC: [null, Validators.required],
		Type: ['Presentation'],
		Zoom: [null],
		RoomId: [null],
	});

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private roomEffects: RoomStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}
	ngOnInit(): void {
		this.rooms$ = this.store.pipe(select(fromRoomState.getRooms));
		this.roomTransactionsByShift$ = this.store.pipe(
			select(fromRoomState.getRoomTransactionsByShift)
		);
		this.store
			.pipe(select(fromRoomState.isRoomTransactionsLoading), takeUntil(this.destroyed$))
			.subscribe(this.loadingView$);

		//#region Effects
		this.roomEffects.createRoomTransactions$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingForm$.next(false);
		});
		this.roomEffects.deleteRoomTransactions$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingView$.next(false);
		});
		//#endregion

		this.roomTransactionViewControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((v) => {
			this.store.dispatch(RoomStateAction.FetchRoomTransactionsByDate({ date: new Date(v) }));
		});

		this.store.dispatch(RoomStateAction.FetchRooms());
		this.roomTransactionViewControl.setValue(DateHelper.dateToFormat(new Date()));
	}

	createNewRoomTransaction() {
		this.loadingForm$.next(true);
		this.store.dispatch(
			RoomStateAction.CreateRoomTransaction({
				...this.insertRoomForm.value,
				Date: new Date(this.insertRoomForm.value.Date),
			})
		);
	}

	deleteRoomTransaction(rt: ClientRoomTransaction) {
		this.loadingView$.next(true);
		this.store.dispatch(
			RoomStateAction.DeleteRoomTransaction({
				transactionId: rt.RoomTransactionId,
			})
		);
	}

	refreshRoomTransactionView() {
		this.roomTransactionViewControl.setValue(this.roomTransactionViewControl.value)
	}
}
