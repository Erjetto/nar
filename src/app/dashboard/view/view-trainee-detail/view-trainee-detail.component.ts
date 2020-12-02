import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { ClientTraineeData, ClientNote, EvalTypes } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import {
	fromNoteState,
	MainStateEffects,
	NoteStateAction,
	NoteStateEffects,
} from 'src/app/shared/store-modules';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
// import { MockData } from 'src/app/shared/mock-data-old';

@Component({
	selector: 'rd-view-trainee-detail',
	templateUrl: './view-trainee-detail.component.html',
	styleUrls: ['./view-trainee-detail.component.scss'],
})
export class ViewTraineeDetailComponent extends DashboardContentBase implements OnInit, OnDestroy {
	viewDateFormat = 'dd MMM yyyy, HH:mm:ss';

	traineeId$ = new BehaviorSubject<string>('');
	traineeDetail$: Observable<ClientTraineeData>;

	reputations = [
		{ val: 1, label: '+1 (Positive)' },
		{ val: 0, label: '0 (Neutral)' },
		{ val: -1, label: '-1 (Negative)' },
	];
	noteForm = this.fb.group({
		note: [null, Validators.required],
		reputation: [this.reputations[0].val, Validators.required],
	});

	loadingViewNote$ = new BehaviorSubject<boolean>(false);
	loadingViewTrainee$ = new BehaviorSubject<boolean>(false);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private noteEffects: NoteStateEffects,
		private activatedRoute: ActivatedRoute,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.traineeDetail$ = this.store.pipe(select(fromNoteState.getCurrentTraineeDetail));
    this.store.pipe(select(fromNoteState.isLoadingCurrentTraineeDetail))
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.loadingViewTrainee$);

		this.activatedRoute.params.subscribe((params) => {
			const { traineeId } = params;
			this.traineeId$.next(traineeId);
		});

		this.traineeId$.pipe(takeUntil(this.destroyed$)).subscribe((traineeId) => {
			this.store.dispatch(NoteStateAction.FetchTraineeDataForTrainer({ traineeId }));
		});

		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingViewNote$.next(false);
		});

    // Refresh note
		merge(this.noteEffects.createTraineeNote$, this.noteEffects.deleteTraineeNote$)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.store.dispatch(
					NoteStateAction.FetchTraineeDataForTrainer({ traineeId: this.traineeId$.value })
				);
			});
	}

	saveNote() {
		this.store.dispatch(
			NoteStateAction.CreateNote({
				...this.noteForm.value,
				traineeId: this.traineeId$.value,
			})
		);
		this.loadingViewNote$.next(true);
	}

	deleteNote(note: ClientNote) {
		this.store.dispatch(
			NoteStateAction.DeleteNote({
				noteId: note.NoteId,
				traineeId: this.traineeId$.value,
			})
		);
		this.loadingViewNote$.next(true);
	}
}
