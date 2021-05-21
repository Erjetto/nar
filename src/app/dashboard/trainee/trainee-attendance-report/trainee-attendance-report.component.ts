import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	fromAttendanceState,
	AttendanceStateAction,
	fromMasterState,
} from 'src/app/shared/store-modules';
import { FormBuilder, Validators } from '@angular/forms';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { ClientPeriodicTraineeAttendance, ClientPhase, ClientSubject } from 'src/app/shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { isEmpty as _isEmpty, flatten as _flatten, sortBy as _sortBy } from 'lodash';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { getSubjectsFromEntity } from 'src/app/shared/stores/master/master.reducer';

@Component({
	selector: 'rd-trainee-attendance-report',
	templateUrl: './trainee-attendance-report.component.html',
	styleUrls: ['./trainee-attendance-report.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TraineeAttendanceReportComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
	today = DateHelper.dateToFormat(new Date());

	report$: Observable<ClientPeriodicTraineeAttendance[]>;
	loadingReport$: Observable<boolean>;

	filterForm = this.fb.group({
		startDate: [this.today],
		endDate: [this.today],
		includeUnfinalized: [false],
	});

	phases$: Observable<ClientPhase[]>;
	subjects$: Observable<ClientSubject[]>;
	subjectControl = this.fb.control(null, Validators.required);
	phaseControl = this.fb.control(null);
	loadingExportView$ = new BehaviorSubject<boolean>(false);

	constructor(protected store: Store<IAppState>, private fb: FormBuilder) {
		super(store);
	}

	ngOnInit(): void {
		this.phases$ = this.store.pipe(
			select(fromMasterState.getPhases),
			tap((phases) => (!_isEmpty(phases) ? this.phaseControl.setValue(phases[0]) : ''))
		);

		this.store
			.pipe(select(fromMasterState.isPhasesLoading), takeUntil(this.destroyed$))
			.subscribe(this.loadingExportView$);

		this.subjects$ = getSubjectsFromEntity(
			this.store,
			this.phaseControl.valueChanges,
			this.loadingExportView$
		).pipe(
			tap((subjects) => (!_isEmpty(subjects) ? this.subjectControl.setValue(subjects[0].SubjectId) : ''))
		);

		this.report$ = this.store.pipe(select(fromAttendanceState.getPeriodicAttendance));
		this.loadingReport$ = this.store.pipe(select(fromAttendanceState.isPeriodicAttendanceLoading));

		this.filterForm.valueChanges
			.pipe(takeUntil(this.destroyed$))
			.subscribe((data) =>
				this.store.dispatch(AttendanceStateAction.FetchPeriodicAttendance(data))
			);
	}

	exportIntoExcel() {
		this.store.dispatch(
			AttendanceStateAction.ExportPeriodicTraineeAttendancesForSubject({
				subjectId: this.subjectControl.value,
			})
		);
	}
}
