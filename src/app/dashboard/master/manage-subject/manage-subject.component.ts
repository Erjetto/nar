import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { max } from 'lodash';
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
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { NgModel, NgForm } from '@angular/forms';

@Component({
	selector: 'rd-manage-subject',
	templateUrl: './manage-subject.component.html',
	styleUrls: ['./manage-subject.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageSubjectComponent extends DashboardContentBase implements OnInit, OnDestroy {
	public subjectsEntity$: Observable<{ [phaseId: string]: ClientSubject[] }>;
	public currentSubjects$: Observable<ClientSubject[]>;
	public phases$: Observable<ClientPhase[]>;

	public loadingViewSubject$: Observable<boolean>;
	public loadingFormSubject$ = new BehaviorSubject<boolean>(false);

	public currentPhase$ = new BehaviorSubject<ClientPhase>(null);
	public editForm$ = new BehaviorSubject<ClientSubject>(null);

	public size = [
		{ key: 'byte', val: 1 },
		{ key: 'kB', val: 1024 },
		{ key: 'MB', val: 1024 * 1024 },
		{ key: 'GB', val: 1024 * 1024 * 1024 },
	];
	public currentSize = this.size[0];

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
		merge(this.masterEffects.createSubject$) // delete & update(?)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.loadingFormSubject$.next(false));

		// Auto reload data
		this.mainEffects.crudSuccess$
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.currentPhase$))
			.subscribe(([action, phase]) =>
				this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: phase.PhaseId }))
			);

		//#endregion

	}

	convertFileSize(size, currentInput: NgModel) {
		currentInput.control.setValue(max([(currentInput.value * this.currentSize.val) / size.val, 1]));
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
		else
			this.store.dispatch(
				MasterStateAction.CreateSubject({
					name: subjectName,
					phaseId: selectPhase,
					value: hasPresentation,
					maxFileSize: maxFileSize * selectFileSize.val,
				})
			);
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
