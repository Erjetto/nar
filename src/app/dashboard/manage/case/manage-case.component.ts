import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import {
	ClientPhase,
	ClientSubject,
	ClientSchedule,
	Case,
	EMPTY_GUID,
} from 'src/app/shared/models';

import {
	MasterStateAction,
	fromMasterState,
	CaseStateAction,
	fromCaseState,
	MainStateEffects,
	CaseStateEffects,
	MainStateAction,
} from 'src/app/shared/store-modules';

import { takeUntil, map } from 'rxjs/operators';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { isEmpty as _isEmpty } from 'lodash';
import { FormBuilder, Validators } from '@angular/forms';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { isEmptyGuid } from 'src/app/shared/methods';

@Component({
	selector: 'rd-manage-case',
	templateUrl: './manage-case.component.html',
	styleUrls: ['./manage-case.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageCaseComponent extends DashboardContentBase implements OnInit, OnDestroy {
	viewDateFormat = DateHelper.TIME_DATE_FORMAT;
	editDateFormat = DateHelper.DATETIME_LOCAL_FORMAT;
	todayEditDate = DateHelper.dateToFormat(new Date(), this.editDateFormat);

	viewCurrentPhase$ = new BehaviorSubject<ClientPhase>(null);
	viewCurrentSubject$ = new BehaviorSubject<ClientSubject>(null);
	viewCurrentSchedule$ = new BehaviorSubject<ClientSchedule>(null);

	formScheduleList$: Observable<ClientSchedule[]>;
	viewScheduleList$: Observable<ClientSchedule[]>;
	subjectList$: Observable<ClientSubject[]>;

	phases$: Observable<ClientPhase[]>;
	caseList$: Observable<Case[]>;

	caseListLoading$: Observable<boolean>;
	viewCaseLoading$: Observable<boolean>;
	formCaseLoading$ = new BehaviorSubject<boolean>(false);

	caseForm = this.fb.group({
		caseId: [''], // Update
		changedFile: [false], // Check if 'edit case' uploads new file

		fileForm: this.fb.group({ fileId: [''], fileName: [''] }, Validators.required),

		caseName: ['', Validators.required],
		correctorNames: ['', Validators.required],
		traineeDays: [this.todayEditDate, Validators.required],
		trainerDays: [this.todayEditDate, Validators.required],
		scheduleDate: [this.todayEditDate, Validators.required],
		noUpload: [false],
	});
	deleteReasonText = this.fb.control('', Validators.required);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private caseEffects: CaseStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));

		this.subjectList$ = fromMasterState.getSubjectsFromEntity(this.store, this.viewCurrentPhase$);
		this.viewScheduleList$ = fromMasterState.getSchedulesFromEntity(
			this.store,
			this.viewCurrentSubject$
		);

		this.viewCaseLoading$ = this.store.pipe(
			select(fromMasterState.getMasterState),
			map((v) => v.loadingPhases || v.loadingSubjects || v.loadingSchedules)
		);

		this.caseList$ = this.store.pipe(select(fromCaseState.getCases));
		this.caseListLoading$ = this.store.pipe(select(fromCaseState.isCasesLoading));

		//#endregion

		//#region auto select first in array
		this.phases$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
			this.viewCurrentPhase$.next(res[0]);
		});
		this.subjectList$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
			this.viewCurrentSubject$.next(res[0]);
		});
		this.viewScheduleList$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
			this.viewCurrentSchedule$.next(res[0]);
		});

		//#endregion

		//#region Subscribe to effects
		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.formCaseLoading$.next(false));

		this.mainEffects.changeGen$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.store.dispatch(MasterStateAction.FetchPhases()));

		// Reload cases when doing CRUD
		merge(
			this.viewCurrentSchedule$,
			this.caseEffects.createCase$,
			this.caseEffects.deleteCase$,
			this.caseEffects.updateCase$
		)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.cancelEdit(); // Reset form
				if (this.viewCurrentSchedule$.value)
					this.store.dispatch(
						CaseStateAction.FetchCases({ scheduleId: this.viewCurrentSchedule$.value.ScheduleId })
					);
			});
		//#endregion
		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
	}

	get isEditing() {
		return !_isEmpty(this.caseForm.value.caseId);
	}
	get hasFile() {
		return !_isEmpty(this.caseForm.value.fileId);
	}

	onSelectCase(row: Case) {
		this.caseForm.patchValue({
			fileForm: isEmptyGuid(row.FileId)
				? { fileId: '', fileName: '' }
				: { fileId: row.FileId, fileName: row.FileName },
			changedFile: false,
			caseId: row.CaseId,
			fileId: row.FileId,
			caseName: row.CaseName,
			correctorNames: row.correctorList,
			traineeDays: DateHelper.dateToFormat(row.TraineeDeadline, this.editDateFormat),
			scheduleDate: DateHelper.dateToFormat(row.ScheduleDate, this.editDateFormat),
			noUpload: row.NoUpload,
		});
	}

	cancelEdit() {
		this.caseForm.reset({
			traineeDays: DateHelper.dateToFormat(new Date(), this.editDateFormat),
			trainerDays: DateHelper.dateToFormat(new Date(), this.editDateFormat),
			scheduleDate: DateHelper.dateToFormat(new Date(), this.editDateFormat),
			noUpload: false,
			changedFile: false
		});
	}

	downloadFile() {
		this.store.dispatch(MainStateAction.DownloadFile({ fileId: this.caseForm.value.fileId }));
	}

	createCase() {
		this.formCaseLoading$.next(true);
		const { correctorNames, fileForm } = this.caseForm.value;
		this.store.dispatch(
			CaseStateAction.CreateCase({
				...this.caseForm.value,
				fileId: fileForm.fileId ?? EMPTY_GUID,
				subjectId: this.viewCurrentSubject$.value.SubjectId,
				scheduleId: this.viewCurrentSchedule$.value.ScheduleId,
				correctorNames: correctorNames.split('\n'),
				noUpload:null,
			})
		);
	}

	updateCase() {
		this.formCaseLoading$.next(true);
		const { changedFile, correctorNames, fileId } = this.caseForm.value;
		this.store.dispatch(
			CaseStateAction.UpdateCase({
				...this.caseForm.value,
				fileId: changedFile ? fileId : EMPTY_GUID,
				correctorNames: correctorNames.split('\n'),
			})
		);
	}

	deleteCase() {
		this.formCaseLoading$.next(true);
		this.store.dispatch(
			CaseStateAction.DeleteCase({
				caseId: this.caseForm.value.caseId,
				reason: this.deleteReasonText.value,
			})
		);
	}
}
