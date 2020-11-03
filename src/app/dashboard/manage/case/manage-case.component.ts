import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, BehaviorSubject, merge, combineLatest, Subject } from 'rxjs';
import { ClientPhase, ClientSubject, ClientSchedule, Case } from 'src/app/shared/models';

import {
	MasterStateAction,
	fromMasterState,
	CaseStateAction,
	fromCaseState,
	MainStateEffects,
	CaseStateEffects,
	MainStateAction,
	fromMainState,
} from 'src/app/shared/store-modules';

import { filter, tap, takeUntil, map, distinctUntilChanged } from 'rxjs/operators';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { isEmpty as _isEmpty} from 'lodash';
import { FormBuilder, Validators } from '@angular/forms';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { adjustControlsInFormArray } from 'src/app/shared/methods';

@Component({
	selector: 'rd-manage-case',
	templateUrl: './manage-case.component.html',
	styleUrls: ['./manage-case.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageCaseComponent extends DashboardContentBase implements OnInit, OnDestroy {
	viewDateFormat = DateHelper.TIME_DATE_FORMAT;
	editDateFormat = DateHelper.DATETIME_LOCAL_FORMAT;
	todayEditDate = DateHelper.dateToInputFormat(new Date(), this.editDateFormat);

	currentViewPhase$ = new BehaviorSubject<ClientPhase>(null);
	currentViewSubject$ = new BehaviorSubject<ClientSubject>(null);
	currentViewSchedule$ = new BehaviorSubject<ClientSchedule>(null);

  schedulesEntity$: Observable<{ [subjectId: string]: ClientSchedule[] }>;
  subjectsEntity$: Observable<{ [phaseId: string]: ClientSubject[] }>;
  
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
    fileName: [null], // View uploaded file
    
    fileForm: this.fb.group({fileId: [''], fileName: ['']}),

		fileId: [null],
		subject: [null, Validators.required], // Value is object so we can use it for entity
		scheduleId: [null, Validators.required],
		caseName: ['', Validators.required],
		correctorNames: ['', Validators.required],
		traineeDays: [this.todayEditDate, Validators.required],
		trainerDays: [this.todayEditDate, Validators.required],
		scheduleDate: [this.todayEditDate, Validators.required],
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
		this.subjectsEntity$ = this.store.pipe(select(fromMasterState.getSubjectsEntity));
    this.schedulesEntity$ = this.store.pipe(select(fromMasterState.getSchedulesEntity));
    
		this.subjectList$ = this.getSubjectsFromEntity(this.currentViewPhase$);
		this.viewScheduleList$ = this.getSchedulesFromEntity(this.currentViewSubject$);
		this.formScheduleList$ = this.getSchedulesFromEntity(
			this.caseForm.get('subject').valueChanges,
			this.formCaseLoading$
    );
    
		this.viewCaseLoading$ = this.store.pipe(
			select(fromMasterState.getMasterState),
			map((v) => v.loadingPhases || v.loadingSubjects || v.loadingSchedules)
		);

		this.caseList$ = this.store.pipe(select(fromCaseState.getCases));
    this.caseListLoading$ = this.store.pipe(select(fromCaseState.getCasesLoading));
    
		//#endregion

		//#region auto select first in array
		this.phases$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
      this.currentViewPhase$.next(res[0]);
		});
		this.subjectList$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
			this.currentViewSubject$.next(res[0]);
      this.caseForm.get('subject').setValue(res[0]);
		});
		this.viewScheduleList$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
			this.currentViewSchedule$.next(res[0]);
      this.caseForm.get('scheduleId').setValue(res[0]?.ScheduleId);
		});
		//#endregion

		//#region Subscribe to effects
		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.formCaseLoading$.next(false));

		this.mainEffects.changeGen$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.store.dispatch(MasterStateAction.FetchPhases()));

		merge(
			this.currentViewSchedule$,
			this.caseEffects.createCase$,
			this.caseEffects.deleteCase$,
			this.caseEffects.updateCase$
		)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
        this.cancelEdit(); // Reset form
				if (this.currentViewSchedule$.value)
					this.store.dispatch(
						CaseStateAction.FetchCases({ scheduleId: this.currentViewSchedule$.value.ScheduleId })
					);
			});
		//#endregion
		this.store.dispatch(MainStateAction.DispatchIfEmpty({
      action: MasterStateAction.FetchPhases(),
      selectorToBeChecked: fromMasterState.getPhases
    }));
	}

	get isEditing() {
		return !_isEmpty(this.caseForm.value.caseId);
	}
	get hasFile() {
		return !_isEmpty(this.caseForm.value.fileId);
	}

	onSelectCase(row: Case) {
    this.caseForm.patchValue(
			{
        fileForm: {fileId: row.FileId, fileName: row.FileName},
				changedFile: false,
				caseId: row.CaseId,
				fileId: row.FileId,
				fileName: row.FileName,
				caseName: row.CaseName,
				correctorNames: row.correctorList,
				traineeDays: DateHelper.dateToInputFormat(row.TraineeDeadline, this.editDateFormat),
				trainerDays: DateHelper.dateToInputFormat(row.TrainerDeadline, this.editDateFormat),
				scheduleDate: DateHelper.dateToInputFormat(row.ScheduleDate, this.editDateFormat),
				scheduleId: ' ',
				subject: ' ',
			},
			{ emitEvent: false } // Prevent loading subject or schedule when changing value
		);
	}

	cancelEdit() {
		this.caseForm.reset({
			traineeDays: DateHelper.dateToInputFormat(new Date(), this.editDateFormat),
			trainerDays: DateHelper.dateToInputFormat(new Date(), this.editDateFormat),
			scheduleDate: DateHelper.dateToInputFormat(new Date(), this.editDateFormat),
		});
	}

	removeFile(element) {
		element.target.value = '';
		this.caseForm.patchValue({
			fileId: null,
			fileName: null,
		});
	}

	downloadFile() {
		this.store.dispatch(MainStateAction.DownloadFile({ fileId: this.caseForm.value.fileId }));
	}

	createCase() {
		this.formCaseLoading$.next(true);
		const { subject, correctorNames } = this.caseForm.value;
		this.store.dispatch(
			CaseStateAction.CreateCase({
				...this.caseForm.value,
				subjectId: subject.SubjectId,
				correctorNames: correctorNames.split('\n'),
			})
		);
	}

	updateCase() {
		this.formCaseLoading$.next(true);
		const { changedFile, correctorNames, fileId } = this.caseForm.value;
		this.store.dispatch(
			CaseStateAction.UpdateCase({
				...this.caseForm.value,
				fileId: changedFile ? fileId : null,
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

	getSubjectsFromEntity(phaseObservable: Observable<ClientPhase>, loader?: Subject<boolean>) {
		return combineLatest([this.subjectsEntity$, phaseObservable]).pipe(
			map(([entity, currPhase]) => {
				if (!currPhase) return [];
				if (!!currPhase && !!entity[currPhase.PhaseId]) {
					loader?.next(false);
					return entity[currPhase.PhaseId];
				} else {
					loader?.next(true);
					this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: currPhase.PhaseId }));
					return [];
				}
			})
		);
	}

	getSchedulesFromEntity(subjectObservable: Observable<ClientSubject>, loader?: Subject<boolean>) {
		return combineLatest([this.schedulesEntity$, subjectObservable]).pipe(
			map(([entity, currSubj]) => {
				if (!currSubj) return [];
				if (!!currSubj && !!entity[currSubj.SubjectId]) {
					loader?.next(false);
					return entity[currSubj.SubjectId];
				} else {
					loader?.next(true);
					this.store.dispatch(MasterStateAction.FetchSchedules({ subjectId: currSubj.SubjectId }));
					return [];
				}
			})
		);
	}
}
