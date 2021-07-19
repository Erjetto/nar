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
	User,
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

import { takeUntil, map, take, filter, tap } from 'rxjs/operators';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { isEmpty as _isEmpty } from 'lodash';
import { FormBuilder, Validators } from '@angular/forms';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { isEmptyGuid, singleUploadForm } from 'src/app/shared/methods';
import { RoleFlags } from 'src/app/shared/constants/role.constant';

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

	hasCrudAccess$: Observable<boolean>;
	caseListLoading$: Observable<boolean>;
	viewCaseLoading$: Observable<boolean>;
	formCaseLoading$ = new BehaviorSubject(false);

	caseForm = this.fb.group({
		caseId: [''], // Update
		changedFile: [false], // Check if 'edit case' uploads new file

		fileForm: singleUploadForm(true),

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
		this.hasCrudAccess$ = this.currentUser$.pipe(
			map((u) => u.Role.is(RoleFlags.AssistantSupervisor | RoleFlags.SubjectCoordinator)),
			tap(canAccess => canAccess ? this.caseForm.enable() : this.caseForm.disable())
		);
		this.phases$ = this.store.pipe(
			select(fromMasterState.getPhases),
			filter((res) => !_isEmpty(res)),
			tap((res) => this.viewCurrentPhase$.next(res[0])) // Auto first in ng-select
		);

		this.subjectList$ = fromMasterState
			.getSubjectsFromEntity(this.store, this.viewCurrentPhase$)
			.pipe(
				filter((res) => !_isEmpty(res)),
				tap((res) => this.viewCurrentSubject$.next(res[0])) // Auto first in ng-select
			);
		this.viewScheduleList$ = fromMasterState
			.getSchedulesFromEntity(this.store, this.viewCurrentSubject$)
			.pipe(
				filter((res) => !_isEmpty(res)),
				tap((res) => this.viewCurrentSchedule$.next(res[0])) // Auto first in ng-select
			);

		this.viewCaseLoading$ = this.store.pipe(
			select(fromMasterState.getMasterState),
			map((v) => v.loadingPhases || v.loadingSubjects || v.loadingSchedules)
		);

		this.caseList$ = this.store.pipe(select(fromCaseState.getCases));
		this.caseListLoading$ = this.store.pipe(select(fromCaseState.isCasesLoading));

		//#endregion

		//#region Subscribe to effects
		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.formCaseLoading$.next(false));

		this.mainEffects.changeGen$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.store.dispatch(MasterStateAction.FetchPhases()));

		// Reload cases when doing CRUD
		this.viewCurrentSchedule$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe(() => {
				this.store.dispatch(
					CaseStateAction.FetchCases({ scheduleId: this.viewCurrentSchedule$.value.ScheduleId })
				);
			});
		merge(this.caseEffects.createCase$, this.caseEffects.deleteCase$, this.caseEffects.updateCase$)
			.pipe(takeUntil(this.destroyed$))
			.subscribe((act) => {
				if (act['messageType'].includes('success') === false) return;
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

	onUpload() {
		this.caseForm.get('changedFile').setValue(true);
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
			trainerDays: DateHelper.dateToFormat(row.TrainerDeadline, this.editDateFormat),
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
			changedFile: false,
		});
	}

	downloadFile(fileId: string) {
		this.store.dispatch(MainStateAction.DownloadFile({ fileId }));
	}

	createCase() {
		this.formCaseLoading$.next(true);
		const { correctorNames, fileForm } = this.caseForm.value;
		this.store.dispatch(
			CaseStateAction.CreateCase({
				...this.caseForm.value,
				fileId: !_isEmpty(fileForm.fileId) ? fileForm.fileId : EMPTY_GUID,
				subjectId: this.viewCurrentSubject$.value.SubjectId,
				scheduleId: this.viewCurrentSchedule$.value.ScheduleId,
				correctorNames: correctorNames.split(',').map((c: string) => c.trim()),
			})
		);
	}

	updateCase() {
		this.formCaseLoading$.next(true);
		const { changedFile, correctorNames, fileForm } = this.caseForm.value;
		this.store.dispatch(
			CaseStateAction.UpdateCase({
				...this.caseForm.value,
				fileId: changedFile ? fileForm.fileId : null,
				correctorNames: correctorNames.split(',').map((c: string) => c.trim()),
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
