import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

import * as MasterStateAction from 'src/app/shared/stores/master/master.action';
import * as fromMasterState from 'src/app/shared/stores/master/master.reducer';
import { Observable, Subject, merge, combineLatest } from 'rxjs';
import {
	ClientSubject,
	ClientTrainee,
	CoreTrainingPresentation,
	CoreTrainingPresentationQuestion,
	CoreTrainingPresentationItem,
	ClientPhase,
} from 'src/app/shared/models';
import { isEmpty } from 'lodash';
import { takeUntil, filter, tap } from 'rxjs/operators';

@Component({
	selector: 'rd-view-all-presentation',
	templateUrl: './view-all-presentation.component.html',
	styleUrls: ['./view-all-presentation.component.scss'],
})
export class ViewAllPresentationComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
	public presentations$: Observable<CoreTrainingPresentation[]>;
	public traineesInPresentation$: Subject<
		CoreTrainingPresentation[]
	> = new Subject();
	public presentationsForTrainee$: Subject<
		CoreTrainingPresentation[]
	> = new Subject();

	public currentPresentation$: Subject<
		CoreTrainingPresentation
	> = new Subject();
	public currentSubject$: Subject<ClientSubject> = new Subject();
	public currentPhase$: Subject<ClientPhase> = new Subject();
	public currentTrainee$: Subject<ClientTrainee> = new Subject();
	public filteredTrainees$: Subject<ClientTrainee[]> = new Subject();

	public phases$: Observable<ClientPhase[]>;
	public subjects$: Observable<ClientSubject[]>;
	public trainees$: Observable<ClientTrainee[]>;
	public subjectLoading$: Observable<boolean>;

	constructor(private store: Store<IAppState>, action: ActionsSubject) {
		super(action);
	}

	ngOnInit(): void {
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.subjects$ = this.store.pipe(select(fromMasterState.getSubjects));
		this.subjectLoading$ = this.store.pipe(
			select(fromMasterState.isSubjectsLoading)
		);

		this.presentations$ = this.store.pipe(select(fromMasterState.getSubjects));

		//#region auto fetch new subject,schedule & case in first fetch
		this.phases$
			.pipe(
				filter((res) => !isEmpty(res)),
				tap((res) => {
					this.store.dispatch(
						MasterStateAction.FetchSubjects({ phaseId: res[0].PhaseId })
					);
				}),
				takeUntil(this.destroyed$)
			)
			.subscribe();

		// When one of three changed, also change filtered trainees
		combineLatest([this.currentSubject$, this.presentations$, this.trainees$])
			.pipe(
				filter((values) => values.every((v) => !isEmpty(v))),
				tap(([sbj, presentations, trainees]) => {
					// Get all trainee that has presentation in a subject
					const filteredTrainees = new Set(
						presentations
							.filter((p) => p.SubjectId === sbj.SubjectId)
							.map((p) => p.TraineeCode)
					);

					this.filteredTrainees$.next(
						trainees.filter((t) => filteredTrainees.has(t.TraineeCode))
					);
				}),
				takeUntil(this.destroyed$)
			)
			.subscribe();

		this.currentTrainee$
			.pipe(
				filter((res) => !isEmpty(res)),
				tap((res) => ),
				takeUntil(this.destroyed$)
			)
			.subscribe();

		//#endregion

		this.reloadView();
	}

	reloadView() {}

	onDeleteQuestion(qstn: CoreTrainingPresentationQuestion) {}
}
