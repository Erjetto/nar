import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	PresentationStateAction,
	MasterStateAction,
	fromPresentationState,
	fromBinusianState,
	BinusianStateAction,
  fromAttendanceState,
  AttendanceStateAction,
} from 'src/app/shared/store-modules';
import { FormBuilder } from '@angular/forms';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import {
	CoreTrainingPresentation,
	CoreTrainingPresentationItem,
	ClientTraineeView,
	ClientUserInRoles,
  ClientPeriodicTraineeAttendance,
} from 'src/app/shared/models';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import {
	map,
	takeUntil,
	filter,
	startWith,
	distinctUntilChanged,
	debounceTime,
} from 'rxjs/operators';
import { isEmpty as _isEmpty, flatten as _flatten, sortBy as _sortBy } from 'lodash';
import { dateInRange } from 'src/app/shared/methods';
import { DateHelper } from 'src/app/shared/utilities/date-helper';

@Component({
  selector: 'rd-trainee-attendance-report',
  templateUrl: './trainee-attendance-report.component.html',
  styleUrls: ['./trainee-attendance-report.component.scss']
})
export class TraineeAttendanceReportComponent extends DashboardContentBase implements OnInit, OnDestroy {
	today = DateHelper.dateToFormat(new Date());

  report$: Observable<ClientPeriodicTraineeAttendance[]>;
  loadingReport$: Observable<boolean>;
  
	filterForm = this.fb.group({
		startDate: [this.today],
    endDate: [this.today],
    includeUnfinalized: [false],
	});
	

	constructor(protected store: Store<IAppState>, private fb: FormBuilder) {
		super(store);
  }
  
	ngOnInit(): void {
    this.report$ = this.store.pipe(select(fromAttendanceState.getPeriodicAttendance));
    this.loadingReport$ = this.store.pipe(select(fromAttendanceState.isPeriodicAttendanceLoading));

    this.filterForm.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(data => 
      this.store.dispatch(AttendanceStateAction.FetchPeriodicAttendance(data)))
  }
}
