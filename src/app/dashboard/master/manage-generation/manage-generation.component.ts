import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientGeneration, SimpleTraineeData, Binusian } from 'src/app/shared/models';
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
} from 'src/app/shared/store-modules';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { takeUntil, tap, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { isEmpty as _isEmpty} from 'lodash';

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

	loadingFormGen$ = new BehaviorSubject<boolean>(false);
	loadingFormTrainee$ = new BehaviorSubject<boolean>(false);
	loadingViewGen$: Observable<boolean>;
	loadingViewTrainee$ = new BehaviorSubject<boolean>(false);

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
			this.searchTextControl.valueChanges.pipe(startWith('')),
		]).pipe(
			takeUntil(this.destroyed$),
			debounceTime(300),
			distinctUntilChanged(),
			map(([trainees, search]) =>
				trainees.filter((t) =>
					`${t.TraineeCode} ${t.TraineeName} ${t.TraineeNumber}`.toLowerCase().includes(search)
				)
			)
		);

		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
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
			this.binusianEffects.deleteTrainee$
		)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.store.dispatch(BinusianStateAction.FetchTraineesSimpleData()));

		this.store.dispatch(BinusianStateAction.FetchTraineesSimpleData());
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
}
