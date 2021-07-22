import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientGeneration, SimpleTraineeData } from 'src/app/shared/models';
import { Observable, BehaviorSubject, merge, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	MasterStateAction,
	fromMasterState,
	MainStateEffects,
	MasterStateEffects,
	fromBinusianState,
	BinusianStateAction,
	BinusianStateEffects,
	MainStateAction,
} from 'src/app/shared/store-modules';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { isEmpty as _isEmpty } from 'lodash';

@Component({
	selector: 'rd-manage-generation',
	templateUrl: './manage-generation.component.html',
	styleUrls: ['./manage-generation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageGenerationComponent extends DashboardContentBase implements OnInit, OnDestroy {
	generations$: Observable<ClientGeneration[]>;
	currentGenTrainees$: Observable<SimpleTraineeData[]>;
	currentGenTraineesFiltered$: Observable<SimpleTraineeData[]>;

	generationForm = this.fb.group({
		generationId: [''], // For update

		generationName: ['', Validators.required],
		semester: ['', Validators.required],
		year: [new Date().getFullYear(), Validators.required],
	});
	traineeText = this.fb.control('', Validators.required);
	searchTextControl = this.fb.control('');
	deactivateReasonControl = this.fb.control('');

	loadingFormGen$ = new BehaviorSubject(false);
	loadingFormTrainee$ = new BehaviorSubject(false);
	loadingViewGen$: Observable<boolean>;
	loadingViewTrainee$ = new BehaviorSubject(false);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private masterEffects: MasterStateEffects,
		private binusianEffects: BinusianStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.generations$ = this.store.pipe(select(fromMasterState.getGenerations));
		this.loadingViewGen$ = this.store.pipe(select(fromMasterState.isGenerationsLoading));
		this.currentGenTrainees$ = this.store.pipe(select(fromBinusianState.getTraineesSimpleData));
		this.store
			.pipe(select(fromBinusianState.isTraineesSimpleDataLoading), takeUntil(this.destroyed$))
			.subscribe(this.loadingViewTrainee$);

		this.currentGenTraineesFiltered$ = combineLatest([
			this.currentGenTrainees$,
			this.searchTextControl.valueChanges.pipe(
				debounceTime(300),
				distinctUntilChanged(),
				startWith('')
			),
		]).pipe(
			takeUntil(this.destroyed$),
			map(([trainees, search]) =>
				trainees.filter((t) =>
					`${t.TraineeCode} ${t.TraineeName} ${t.TraineeNumber}`.toLowerCase().includes(search)
				)
			)
		);

		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingFormGen$.next(false);
			this.loadingViewTrainee$.next(false);
			this.loadingFormTrainee$.next(false);
		});

		// Auto refresh generation list
		merge(this.masterEffects.createGeneration$, this.masterEffects.updateGeneration$)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.cancelEdit();
				this.store.dispatch(MasterStateAction.FetchGenerations());
			});

		// Auto refresh trainee list
		merge(
			this.mainEffects.changeGen$,
			this.binusianEffects.createTrainee$,
			this.binusianEffects.deleteTrainee$,
			this.binusianEffects.updateTraineeActive$
		)
			.pipe(takeUntil(this.destroyed$))
			.subscribe((act) => {
				this.store.dispatch(BinusianStateAction.FetchTraineesSimpleData());
				if (act['messageType'].includes('success')) this.deactivateReasonControl.reset();
			});

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: BinusianStateAction.FetchTraineesSimpleData(),
				selectorToBeChecked: fromBinusianState.getTraineesSimpleData,
			})
		);
	}

	get isEditing() {
		return !_isEmpty(this.generationForm.get('generationId').value);
	}
	selectGeneration(gen: ClientGeneration) {
		this.generationForm.patchValue({
			generationId: gen.GenerationId,
			generationName: gen.Description,
			semester: gen.Semester,
			year: gen.Year,
		});
	}

	submitGenForm() {
		const { generationId, generationName, semester, year } = this.generationForm.value;

		if (!this.isEditing)
			this.store.dispatch(MasterStateAction.CreateGeneration({ generationName, semester, year }));
		else
			this.store.dispatch(
				MasterStateAction.UpdateGeneration({
					GenerationId: generationId,
					Description: generationName,
					Semester: semester,
					Year: year,
				})
			);
		this.loadingFormGen$.next(true);
	}

	cancelEdit() {
		this.generationForm.reset();
	}

	submitTraineeForm() {
		this.loadingFormTrainee$.next(true);

		this.store.dispatch(
			BinusianStateAction.CreateTrainees({ datas: this.traineeText.value.trim().split('\n') })
		);
	}

	deleteTrainee(trainee: SimpleTraineeData) {
		this.loadingViewTrainee$.next(true);
		this.store.dispatch(
			BinusianStateAction.DeleteTrainee({ binusianNumber: trainee.TraineeNumber })
		);
	}

	toggleTraineeActive(trainee: SimpleTraineeData) {
		this.loadingViewTrainee$.next(true);
		this.store.dispatch(
			BinusianStateAction.UpdateTraineeActive({
				isActive: !trainee.isActive,
				reason: this.deactivateReasonControl.value,
				traineeId: trainee.TraineeId,
			})
		);
	}
}
