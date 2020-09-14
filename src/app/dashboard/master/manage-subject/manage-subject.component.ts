import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { IAppState } from 'src/app/app.reducer';
import { ClientSubject, ClientPhase } from 'src/app/shared/models';
import {
	MasterStateAction,
	fromMasterState,
	MasterStateEffects,
	MainStateEffects,
} from 'src/app/shared/store-modules';
import { map, takeUntil, withLatestFrom, tap } from 'rxjs/operators';
import { NgModel, NgForm } from '@angular/forms';

@Component({
	selector: 'rd-manage-subject',
	templateUrl: './manage-subject.component.html',
	styleUrls: ['./manage-subject.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageSubjectComponent extends DashboardContentBase implements OnInit, OnDestroy {
	subjectsEntity$: Observable<{ [phaseId: string]: ClientSubject[] }>;
	currentSubjects$: Observable<ClientSubject[]>;
	phases$: Observable<ClientPhase[]>;

	loadingViewSubject$: Observable<boolean>;
	loadingFormSubject$ = new BehaviorSubject<boolean>(false);

	currentPhase$ = new BehaviorSubject<ClientPhase>(null);
	editForm$ = new BehaviorSubject<ClientSubject>(null);

	size = [
		{ key: 'byte', val: 1 },
		{ key: 'kB', val: 1024 },
		{ key: 'MB', val: 1024 * 1024 },
		{ key: 'GB', val: 1024 * 1024 * 1024 },
	];
	currentSize = this.size[0];

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private masterEffects: MasterStateEffects
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.subjectsEntity$ = this.store.pipe(select(fromMasterState.getSubjectsEntity));
		this.loadingViewSubject$ = this.store.pipe(
			select(fromMasterState.getMasterState),
			map((v) => v.loadingPhases || v.loadingSubjects)
		);
		//#endregion

		//#region Get from entity
		this.currentSubjects$ = combineLatest([this.subjectsEntity$, this.currentPhase$]).pipe(
			map(([entity, currPhase]) => {
				if (!currPhase) return [];
				if (!!entity[currPhase.PhaseId]) return entity[currPhase.PhaseId];
				else {
					this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: currPhase.PhaseId }));
					return [];
				}
			})
		);
		//#endregion

		//#region Auto select first in array
		this.phases$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((phases) => this.currentPhase$.next(phases[0]));
		//#endregion

		//#region Subscribe to effects
		// Auto reload data
		this.mainEffects.changeGen$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.store.dispatch(MasterStateAction.FetchPhases()));

		merge(
			this.masterEffects.createSubject$,
			this.masterEffects.deleteSubject$,
			this.masterEffects.updateSubject$
		)
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.currentPhase$))
			.subscribe(([action, phase]) => {
				if (!!phase)
					this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: phase.PhaseId }));
			});

		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingFormSubject$.next(false);
		});
		//#endregion
		this.store.dispatch(MasterStateAction.FetchPhases());
	}

	convertFileSize(size, currentInput: NgModel) {
		currentInput.control.setValue(_.max([(currentInput.value * this.currentSize.val) / size.val, 1]));
		this.currentSize = size;
	}

	selectSubject(subject) {
		this.editForm$.next(subject);
		this.currentSize = this.size[0];
	}

	submitSubjectForm(form: NgForm) {
		const { subjectName, maxFileSize, selectFileSize, selectPhase, hasPresentation } = form.value;

		if (!this.editForm$.value)
			this.store.dispatch(
				MasterStateAction.CreateSubject({
					name: subjectName,
					phaseId: selectPhase,
					value: hasPresentation,
					maxFileSize: maxFileSize * selectFileSize.val,
				})
			);
		else {
			const currSubj = this.editForm$.value;
			const hasPresentationChanged = currSubj.HasPresentation !== hasPresentation;
			const maxFileSizeChanged = currSubj.MaxFileSize !== maxFileSize * selectFileSize.val;

			this.store.dispatch(
				MasterStateAction.UpdateSubject({
					subjectId: this.editForm$.value.SubjectId,
					value: hasPresentationChanged ? hasPresentation : null,
					maxFileSize: maxFileSizeChanged ? maxFileSize * selectFileSize.val : null,
				})
			);
		}
		this.loadingFormSubject$.next(true);
	}

	cancelEdit() {
		this.editForm$.next(null);
	}

	deleteSubject() {
		this.store.dispatch(
			MasterStateAction.DeleteSubject({ subjectId: this.editForm$.value.SubjectId })
		);
		this.loadingFormSubject$.next(true);
	}
}
