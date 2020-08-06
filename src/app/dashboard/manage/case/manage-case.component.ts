import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	ViewChild,
	ChangeDetectorRef,
	OnDestroy,
} from '@angular/core';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, interval } from 'rxjs';
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
import { take, filter, tap, first, switchMap, takeUntil } from 'rxjs/operators';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { isEmpty } from 'lodash';
import { ObservableHelper } from 'src/app/shared/utilities/observable-helper';
import { ofType } from '@ngrx/effects';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@Component({
	selector: 'rd-manage-case',
	templateUrl: './manage-case.component.html',
	styleUrls: ['./manage-case.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageCaseComponent extends DashboardContentBase
	implements OnInit, OnDestroy {
	@ViewChild('insertCaseCard') insertCaseCard: CardComponent;

	public viewDateFormat = 'HH:mm, dd MMM yyyy';

	public phases$: Observable<ClientPhase[]>;
	public subjects$: Observable<ClientSubject[]>;
	public schedules$: Observable<ClientSchedule[]>;
	public manageCaseLoading$: Observable<boolean>;

	public caseList$: Observable<Case[]>;
	public caseListLoading$: Observable<boolean>;

	public isEditing = false;
	public caseForm: Case = new Case();

	constructor(
		private store: Store<IAppState>,
		action: ActionsSubject,
	) {
		super(action);
	}

	ngOnInit(): void {
		this.phases$ = this.store.pipe(select(fromMainState.getPhases));
		this.subjects$ = this.store.pipe(select(fromMainState.getSubjects));
		this.schedules$ = this.store.pipe(select(fromMainState.getSchedules));
		this.manageCaseLoading$ = this.store.pipe(
			select(fromMainState.getManageCaseLoading)
		);
		this.caseList$ = this.store.pipe(select(fromCaseState.getCases));
		this.caseListLoading$ = this.store.pipe(
			select(fromCaseState.getCasesLoading)
		);

		//#region auto fetch new subject,schedule & case in first fetch
		this.phases$
			.pipe(
				filter((res) => !isEmpty(res)),
				tap((res) => this.onChangePhase(res[0])),
				takeUntil(this.destroyed$)
			)
			.subscribe();

		this.subjects$
			.pipe(
				filter((res) => !isEmpty(res)),
				tap((res) => this.onChangeSubject(res[0])),
				takeUntil(this.destroyed$)
			)
			.subscribe();

		this.schedules$
			.pipe(
				filter((res) => !isEmpty(res)),
				tap((res) => this.onChangeSchedule(res[0])),
				takeUntil(this.destroyed$)
			)
			.subscribe();
		//#endregion

		this.reloadView();
	}

	reloadView() {
		this.store.dispatch(MainStateAction.FetchPhases());
	}

	onChangePhase($event: ClientPhase) {
		this.store.dispatch(
			MainStateAction.FetchSubjects({ phaseId: $event.PhaseId })
		);
	}
	onChangeSubject($event: ClientSubject) {
		this.store.dispatch(
			MainStateAction.FetchSchedules({ subjectId: $event.SubjectId })
		);
	}
	onChangeSchedule($event: ClientSchedule) {
		this.store.dispatch(
			CaseStateAction.FetchCases({ scheduleId: $event.ScheduleId })
		);
	}

	onSelectCase(row: Case) {
		this.isEditing = true;
		this.caseForm = row;
		this.insertCaseCard.cardTitle = 'Edit/View Case';
		this.insertCaseCard.toggleMinimized(false);
	}

	onCancelEdit() {
		this.insertCaseCard.toggleMinimized(true);
		this.insertCaseCard.cardTitle = 'Insert New Case';
		this.isEditing = false;
		this.caseForm = new Case();
		// interval(300).pipe(first()).subscribe(() => {
		// })
		// setTimeout(() => {
		//   this.isEditing = false;
		//   this.caseForm = new Case();
		// },600)
	}

	onClick() {}
}
