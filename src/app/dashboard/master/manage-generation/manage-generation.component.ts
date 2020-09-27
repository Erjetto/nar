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
} from 'src/app/shared/store-modules';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { takeUntil, tap, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
	selector: 'rd-manage-generation',
	templateUrl: './manage-generation.component.html',
	styleUrls: ['./manage-generation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageGenerationComponent extends DashboardContentBase implements OnInit, OnDestroy {
	// tslint:disable-next-line: max-line-length
	traineeInputExample = `Computer Science, Assistant, 3, 1500123456, 3, Male, 081254654213, John@yahoo.com, 2012-12-14 12:35, 127.0.0.1, 1234567890, T001, 1 
Computer Science, Friends, 4, 1500123456, 5, Male, , , Now, 192.168.2.10, , ,1`;

	generations$: Observable<ClientGeneration[]>;
	currentGenTrainees$: Observable<SimpleTraineeData[]>;
	currentGenTraineesFiltered$: Observable<SimpleTraineeData[]>;

	generationForm = this.fb.group({
		generationId: [''], // For update

		generationName: ['', Validators.required],
		semester: ['', Validators.required],
		year: [new Date().getFullYear(), Validators.required],
	});
	traineeText = this.fb.control(this.traineeInputExample, Validators.required);
	searchTextControl = this.fb.control('');

	loadingFormGen$ = new BehaviorSubject<boolean>(false);
	loadingFormTrainee$ = new BehaviorSubject<boolean>(false);
	loadingViewGen$: Observable<boolean>;
	loadingViewTrainee$ = new BehaviorSubject<boolean>(false);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private masterEffects: MasterStateEffects,
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

		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
			this.loadingFormGen$.next(false);
			this.loadingViewTrainee$.next(false);
		});

		merge(this.masterEffects.createGeneration$, this.masterEffects.updateGeneration$)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.cancelEdit();
				this.store.dispatch(MasterStateAction.FetchGenerations());
			});

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

		this.mainEffects.changeGen$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.store.dispatch(BinusianStateAction.FetchTraineesSimpleData()));

		this.store.dispatch(BinusianStateAction.FetchTraineesSimpleData());
	}

	get isEditing() {
		return !_.isEmpty(this.generationForm.get('generationId').value);
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
    
  }

	deleteTrainee(trainee: SimpleTraineeData) {
    this.loadingViewTrainee$.next(true);
		this.store.dispatch(
			BinusianStateAction.DeleteTrainee({ binusianNumber: trainee.TraineeNumber })
		);
	}
}
