import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable } from 'rxjs';
import {
	ClientPhase,
	ClientSubject,
	ClientSchedule,
	Case,
} from 'src/app/shared/models';
import * as MainStateAction from 'src/app/shared/stores/main/main.action';
import * as fromMainState from 'src/app/shared/stores/main/main.reducer';
import * as CaseStateAction from 'src/app/shared/stores/case/case.action';
import * as fromCaseState from 'src/app/shared/stores/case/case.reducer';
import { take, filter, tap, first, switchMap } from 'rxjs/operators';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { isEmpty } from 'lodash';
import { ObservableHelper } from 'src/app/shared/utilities/observable-helper';
import { ofType } from '@ngrx/effects';

@Component({
	selector: 'rd-manage-case',
	templateUrl: './manage-case.component.html',
	styleUrls: ['./manage-case.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageCaseComponent extends DashboardContentBase
	implements OnInit {
	public phases$: Observable<ClientPhase[]>;
	public subjects$: Observable<ClientSubject[]>;
	public schedules$: Observable<ClientSchedule[]>;

	public selectedPhase: string;
	public selectedSubject: string;
	public selectedSchedule: string;

	public caseList$: Observable<Case[]>;

	public manageCaseLoading$: Observable<boolean>;

	constructor(private store: Store<IAppState>, action: ActionsSubject) {
		super(action);
	}

	ngOnInit(): void {
		this.phases$ = this.store.pipe(select(fromMainState.getPhases));
		this.subjects$ = this.store.pipe(select(fromMainState.getSubjects));
		this.schedules$ = this.store.pipe(select(fromMainState.getSchedules));
		this.caseList$ = this.store.pipe(select(fromCaseState.getCases));
		this.manageCaseLoading$ = this.store.pipe(
			select(fromMainState.getManageCaseLoading)
		);

		ObservableHelper.tapFirstUnEmpty(this.phases$, (res: ClientPhase[]) => {
			this.selectedPhase = res[0].PhaseId;
			this.onChangePhase(this.selectedPhase);
		}).subscribe();

		ObservableHelper.tapFirstUnEmpty(this.subjects$, (res: ClientSubject[]) => {
			this.selectedSchedule = res[0].SubjectId;
			this.onChangePhase(this.selectedPhase);
		}).subscribe();

		ObservableHelper.tapFirstUnEmpty(this.phases$, (res: ClientSchedule[]) => {
			this.selectedSchedule = res[0].ScheduleId;
			this.onChangePhase(this.selectedPhase);
			console.log(this.selectedPhase);
		}).subscribe();

		this.reloadView();
	}

	reloadView() {
		this.store.dispatch(MainStateAction.FetchPhases());
	}

	onChangePhase($event) {
		// $event -> selected value
		this.store.dispatch(MainStateAction.FetchSubjects({ phaseId: $event }));
	}
	onChangeSubject($event) {
		this.store.dispatch(MainStateAction.FetchSchedules({ subjectId: $event }));
	}
	onChangeSchedule($event) {
		this.store.dispatch(CaseStateAction.FetchCases({ scheduleId: $event }));
	}
}
