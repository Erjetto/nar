import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { isEmpty as _isEmpty } from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { IAppState } from 'src/app/app.reducer';
import { singleUploadForm } from 'src/app/shared/methods';
import { FLKNote, FLKQueue, FLKStatus } from 'src/app/shared/models';
import {
	BinusianStateAction,
	BinusianStateEffects,
	fromBinusianState,
	MainStateEffects,
} from 'src/app/shared/store-modules';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { DashboardContentBase } from '../dashboard-content-base.component';

@Component({
	selector: 'rd-trainee-upload-flk',
	templateUrl: './trainee-upload-flk.component.html',
	styleUrls: ['./trainee-upload-flk.component.scss'],
})
export class TraineeUploadFlkComponent extends DashboardContentBase implements OnInit, OnDestroy {
	FLKStatus = FLKStatus;
	viewDateFormat = DateHelper.DATE_TIME_FORMAT;
	flkNotePlaceholder =
		"Add additional notes for your FLK Submission\nex: I don't have KTP because....";

	flkNoteControl = this.fb.control('');
	uploadFLKForm = singleUploadForm(true);

	enableSubmit$: Observable<boolean>;
	flkSubmissions$: Observable<FLKQueue[]>;

	loadingFLKSubmissions$: Observable<boolean>;
	loadingFLKForm$ = new BehaviorSubject<boolean>(false);
	loadingFLKNoteForm$ = new BehaviorSubject<boolean>(false);

	constructor(
		protected store: Store<IAppState>,
		private binusianEffects: BinusianStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.flkSubmissions$ = this.store.pipe(select(fromBinusianState.getMyFLKQueues));
		this.store
			.pipe(
				select(fromBinusianState.getMyFLKNote),
				takeUntil(this.destroyed$),
				tap((note: FLKNote) => this.flkNoteControl.setValue(note.Note))
			)
			.subscribe();
		this.loadingFLKSubmissions$ = this.store.pipe(select(fromBinusianState.isMyFLKQueuesLoading));
		this.store
			.pipe(select(fromBinusianState.isMyFLKNoteLoading), takeUntil(this.destroyed$))
			.subscribe(this.loadingFLKNoteForm$);

		this.binusianEffects.createFLKQueue$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(BinusianStateAction.FetchMyFLKQueues());
			this.loadingFLKForm$.next(false);
		});
		this.binusianEffects.updateFLKNote$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingFLKForm$.next(false);
		});

		this.enableSubmit$ = this.flkSubmissions$.pipe(
			map((subs) =>
				_isEmpty(subs)
					? true
					: subs[0].Status !== FLKStatus.Accepted && subs[0].Status !== FLKStatus.OnCheck
			)
		);

		this.store.dispatch(BinusianStateAction.FetchMyFLKQueues());
		this.store.dispatch(BinusianStateAction.FetchMyFLKNote());
	}

	uploadFLK() {
		this.loadingFLKForm$.next(true);

		this.store.dispatch(
			BinusianStateAction.CreateFLKQueue({
				fileId: this.uploadFLKForm.value.fileId,
			})
		);
	}

	updateFLKNote() {
		this.loadingFLKNoteForm$.next(true);
		this.store.dispatch(
			BinusianStateAction.UpdateFLKNote({
				note: this.flkNoteControl.value,
			})
		);
	}
}
