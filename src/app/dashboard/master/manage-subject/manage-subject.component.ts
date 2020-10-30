import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isEmpty as _isEmpty, max as _max } from 'lodash';
import { Observable, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { IAppState } from 'src/app/app.reducer';
import { ClientSubject, ClientPhase } from 'src/app/shared/models';
import {
	MasterStateAction,
	fromMasterState,
	MasterStateEffects,
	MainStateEffects,
	MainStateAction,
} from 'src/app/shared/store-modules';
import { map, takeUntil, withLatestFrom, tap } from 'rxjs/operators';
import { NgModel, NgForm, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'rd-manage-subject',
	templateUrl: './manage-subject.component.html',
	styleUrls: ['./manage-subject.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageSubjectComponent extends DashboardContentBase implements OnInit, OnDestroy {
	subjectsEntity$: Observable<{ [phaseId: string]: ClientSubject[] }>;
	viewSubjectList$: Observable<ClientSubject[]>;
	phases$: Observable<ClientPhase[]>;

	loadingViewSubject$: Observable<boolean>;
	loadingFormSubject$ = new BehaviorSubject<boolean>(false);

	viewCurrentPhase$ = new BehaviorSubject<ClientPhase>(null);

	size = [
		{ key: 'byte', val: 1 },
		{ key: 'kB', val: 1024 },
		{ key: 'MB', val: 1024 * 1024 },
		{ key: 'GB', val: 1024 * 1024 * 1024 },
	];
	currentUnit = this.size[0];

	subjectForm = this.fb.group({
		subjectId: [''], // For update

		phaseId: ['', Validators.required],
		name: ['', Validators.required],
		value: [false, Validators.required],
		sizeValue: [0, Validators.required],
		sizeUnit: [this.size[0]],
	});

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private masterEffects: MasterStateEffects,
		private fb: FormBuilder
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
		this.viewSubjectList$ = combineLatest([this.subjectsEntity$, this.viewCurrentPhase$]).pipe(
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
		this.phases$.pipe(takeUntil(this.destroyed$)).subscribe((phases) => {
			this.viewCurrentPhase$.next(phases[0]);
			this.subjectForm.get('phaseId').setValue(phases[0]?.PhaseId);
		});
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
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.viewCurrentPhase$))
			.subscribe(([action, phase]) => {
				this.subjectForm.reset({ value: false });
				if (!!phase)
					this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: phase.PhaseId }));
			});

		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingFormSubject$.next(false);
		});
		//#endregion

		// Adjust file size when size unit changes (byte, kB, MB, GB)
		this.subjectForm
			.get('sizeUnit')
			.valueChanges.pipe(takeUntil(this.destroyed$))
			.subscribe((unit) => {
				this.sizeControl.setValue(
					_max([(this.sizeControl.value * this.currentUnit.val) / unit.val, 1])
				);
				this.currentUnit = unit;
			});

		// Disable name edit when it's edit mode
		this.subjectForm
			.get('subjectId')
			.valueChanges.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				if (!this.isEditing) this.subjectForm.get('name').enable();
				else this.subjectForm.get('name').disable();
			});

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
	}

	get isEditing() {
		return !_isEmpty(this.subjectForm.get('subjectId').value);
	}

	get sizeControl() {
		return this.subjectForm.get('sizeValue');
	}

	selectSubject(subject: ClientSubject) {
		this.subjectForm.patchValue({
			subjectId: subject.SubjectId,
			name: subject.Name,
			value: subject.HasPresentation,
			sizeValue: subject.MaxFileSize,
			sizeUnit: this.size[0],
		});
		this.subjectForm.markAsPristine(); // Useful for Update
	}

	submitSubjectForm() {
		const { subjectId, phaseId, name, value, sizeValue, sizeUnit } = this.subjectForm.value;

		if (!subjectId)
			this.store.dispatch(
				MasterStateAction.CreateSubject({
					name,
					phaseId,
					value,
					maxFileSize: sizeValue * sizeUnit.val,
				})
			);
		else {
			const hasPresentationChanged = this.subjectForm.get('value').dirty;
			const maxFileSizeChanged = this.subjectForm.get('sizeValue').dirty;

			this.store.dispatch(
				MasterStateAction.UpdateSubject({
					subjectId,
					value: hasPresentationChanged ? value : null,
					maxFileSize: maxFileSizeChanged ? sizeValue * sizeUnit.val : null,
				})
			);
		}
		this.loadingFormSubject$.next(true);
	}

	cancelEdit() {
		this.subjectForm.reset({
			phaseId: this.viewCurrentPhase$.value.PhaseId,
			value: false,
			sizeUnit: this.size[0],
		});
	}

	deleteSubject() {
		this.store.dispatch(
			MasterStateAction.DeleteSubject({ subjectId: this.subjectForm.get('subjectId').value })
		);
		this.loadingFormSubject$.next(true);
	}
}
