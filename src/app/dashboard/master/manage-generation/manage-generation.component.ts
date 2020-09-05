import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientGeneration } from 'src/app/shared/models';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	MasterStateAction,
	fromMasterState,
	MainStateEffects,
	MasterStateEffects,
} from 'src/app/shared/store-modules';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'rd-manage-generation',
	templateUrl: './manage-generation.component.html',
	styleUrls: ['./manage-generation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageGenerationComponent extends DashboardContentBase implements OnInit, OnDestroy {
	public generations$: Observable<ClientGeneration[]>;
	public generations: ClientGeneration[];

	public editForm$ = new BehaviorSubject<ClientGeneration>(null);

	public loadingFormGen$ = new BehaviorSubject<boolean>(false);
	public loadingViewGen$: Observable<boolean>;

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
	) {
		super(store);
	}

	ngOnInit(): void {
		this.generations$ = this.store.pipe(select(fromMasterState.getGenerations));
		this.loadingViewGen$ = this.store.pipe(select(fromMasterState.isGenerationsLoading));

		this.mainEffects.crudSuccess$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.loadingFormGen$.next(false);
      this.cancelEdit();
			this.store.dispatch(MasterStateAction.FetchGenerations());
		});
	}

	selectGeneration(gen: ClientGeneration) {
		this.editForm$.next(gen);
	}

	submitGenForm(form: NgForm) {
		const { genName, semesterRadio, lastYear } = form.value;
		if (!this.editForm$.value)
			this.store.dispatch(
				MasterStateAction.CreateGeneration({
					generationName: genName,
					semester: semesterRadio,
					year: lastYear,
				})
			);
		else
			this.store.dispatch(
				MasterStateAction.UpdateGeneration({
					GenerationId: this.editForm$.value.GenerationId,
					Description: genName,
					Semester: semesterRadio,
					Year: lastYear,
				})
			);
		this.loadingFormGen$.next(true);
	}

	cancelEdit() {
		this.editForm$.next(null);
	}
}
