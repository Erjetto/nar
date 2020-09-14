import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, interval, Subject, BehaviorSubject } from 'rxjs';
import {
	ClientPhase,
	ClientSubject,
	ClientSchedule,
	Case,
	Role,
	ClientGeneration,
} from 'src/app/shared/models';

import { MasterStateAction, fromMasterState, CaseStateAction, fromCaseState, MainStateEffects } from 'src/app/shared/store-modules';

import { take, filter, tap, first, switchMap, takeUntil, map } from 'rxjs/operators';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import * as _ from 'lodash';
import { ObservableHelper } from 'src/app/shared/utilities/observable-helper';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@Component({
	selector: 'rd-manage-case',
	templateUrl: './manage-case.component.html',
	styleUrls: ['./manage-case.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageCaseComponent extends DashboardContentBase implements OnInit, OnDestroy {

	viewDateFormat = 'HH:mm, dd MMM yyyy';

	currentPhase$: Subject<ClientPhase> = new Subject();
	currentSubject$: Subject<ClientSubject> = new Subject();
	currentSchedule$: Subject<ClientSchedule> = new Subject();

	phases$: Observable<ClientPhase[]>;
	subjects$: Observable<ClientSubject[]>;
	schedules$: Observable<ClientSchedule[]>;
	manageCaseLoading$: Observable<boolean>;

	caseList$: Observable<Case[]>;
	caseListLoading$: Observable<boolean>;

	caseForm$: BehaviorSubject<Case> = new BehaviorSubject(null);

	constructor(protected store: Store<IAppState>, private mainEffects: MainStateEffects) {
		super(store);
	}

	ngOnInit(): void {
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.subjects$ = this.store.pipe(select(fromMasterState.getSubjects));
		this.schedules$ = this.store.pipe(select(fromMasterState.getSchedules));
		this.manageCaseLoading$ = this.store.pipe(
			// select(fromMasterState.isManageCaseLoading),
			select(fromMasterState.getMasterState),
			map((v) => v.loadingPhases || v.loadingSubjects || v.loadingSchedules)
		);

		this.caseList$ = this.store.pipe(select(fromCaseState.getCases));
		this.caseListLoading$ = this.store.pipe(select(fromCaseState.getCasesLoading));

		//#region auto select first in array
		this.phases$
			.pipe(
				filter((res) => !_.isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((res) => this.currentPhase$.next(res[0]));

		this.subjects$
			.pipe(
				filter((res) => !_.isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((res) => this.currentSubject$.next(res[0]));

		this.schedules$
			.pipe(
				filter((res) => !_.isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((res) => this.currentSchedule$.next(res[0]));
		//#endregion

		//#region auto fetch new subject,schedule & case
		this.mainEffects.changeGen$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((res) => this.store.dispatch(MasterStateAction.FetchPhases()));

		this.currentPhase$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((phase) =>
				this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: phase.PhaseId }))
			);

		this.currentSubject$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((subject) =>
				this.store.dispatch(MasterStateAction.FetchSchedules({ subjectId: subject.SubjectId }))
			);

		this.currentSchedule$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((schedule) =>
				this.store.dispatch(CaseStateAction.FetchCases({ scheduleId: schedule.ScheduleId }))
			);
		//#endregion

	}

	onSelectCase(row: Case) {
		this.caseForm$.next(row);
	}

	cancelEdit() {
		this.caseForm$.next(null);
  }
  
  downloadFile(){
    
  }

  updateCase(){
    // this.store.dispatch(CaseStateAction)
  }

  deleteCase(){}
}
