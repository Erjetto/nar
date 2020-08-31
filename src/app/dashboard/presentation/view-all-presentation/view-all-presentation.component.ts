import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

import * as MainStateAction from 'src/app/shared/stores/main/main.action';
import * as fromMainState from 'src/app/shared/stores/main/main.reducer';
import * as MasterStateAction from 'src/app/shared/stores/master/master.action';
import * as fromMasterState from 'src/app/shared/stores/master/master.reducer';
import * as PresentationStateAction from 'src/app/shared/stores/presentation/presentation.action';
import * as fromPresentationState from 'src/app/shared/stores/presentation/presentation.reducer';

import { Observable, Subject, merge, combineLatest } from 'rxjs';
import {
	ClientSubject,
	ClientTrainee,
	CoreTrainingPresentation,
	CoreTrainingPresentationQuestion,
	CoreTrainingPresentationItem,
	ClientPhase,
	ClientGeneration,
} from 'src/app/shared/models';
import { isEmpty } from 'lodash';
import { takeUntil, filter, tap, withLatestFrom } from 'rxjs/operators';

@Component({
	selector: 'rd-view-all-presentation',
	templateUrl: './view-all-presentation.component.html',
	styleUrls: ['./view-all-presentation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAllPresentationComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
	public presentations$: Observable<CoreTrainingPresentation[]>;
	public presentationsForTrainee$: Subject<CoreTrainingPresentation[]> = new Subject();

	public currentPresentation$: Subject<CoreTrainingPresentation> = new Subject();
	public currentSubject$: Subject<ClientSubject> = new Subject();
	public currentPhase$: Subject<ClientPhase> = new Subject();
	public currentTrainee$: Subject<ClientTrainee> = new Subject();

	public filteredTrainees$: Subject<ClientTrainee[]> = new Subject();

	public phases$: Observable<ClientPhase[]>;
	public subjects$: Observable<ClientSubject[]>;
	public trainees$: Observable<ClientTrainee[]>;
	public currentGeneration$: Observable<ClientGeneration>;

	public subjectsLoading$: Observable<boolean>;
	public presentationsLoading$: Observable<boolean>;

	constructor(protected store: Store<IAppState>) {
		super(store);
	}

	ngOnInit(): void {
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.subjects$ = this.store.pipe(select(fromMasterState.getSubjects));
		this.currentGeneration$ = this.store.pipe(select(fromMainState.getCurrentGeneration));
		this.subjectsLoading$ = this.store.pipe(select(fromMasterState.isSubjectsLoading));

		this.presentations$ = this.store.pipe(select(fromPresentationState.getPresentations));
		this.presentationsLoading$ = this.store.pipe(
			select(fromPresentationState.isPresentationsLoading)
		);

		//#region auto fetch new subject,schedule & case in first fetch
		this.phases$
			.pipe(
				filter((res) => !isEmpty(res)),
				tap((res) => {
					this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: res[0].PhaseId }));
					this.currentPhase$.next(res[0]);
				}),
				takeUntil(this.destroyed$)
			)
			.subscribe();

		this.subjects$
			.pipe(
				filter((res) => !isEmpty(res)),
				withLatestFrom(this.currentGeneration$),
				tap(([subjects, gen]) => {
          this.currentSubject$.next(subjects[0]);
					this.store.dispatch(
						PresentationStateAction.FetchPresentations({
							generationId: gen.GenerationId,
							subjectId: subjects[0].SubjectId,
						})
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
					// Get all trainee code that has presentation in a subject
					const filteredTrainees = new Set(
						presentations.filter((p) => p.SubjectId === sbj.SubjectId).map((p) => p.TraineeCode)
					);
					// Get all trainee from filtered trainee code
					this.filteredTrainees$.next(trainees.filter((t) => filteredTrainees.has(t.TraineeCode)));
				}),
				takeUntil(this.destroyed$)
			)
			.subscribe();

		combineLatest([this.currentSubject$, this.presentations$, this.currentTrainee$])
			.pipe(
				filter((values) => values.every((v) => !isEmpty(v))),
				tap(([sbj, presentations, trainee]) => {
					this.presentationsForTrainee$.next(
						presentations.filter(
							(p) => p.SubjectId === sbj.SubjectId && p.TraineeCode === trainee.TraineeCode
						)
					);
				}),
				takeUntil(this.destroyed$)
			)
			.subscribe();

		//#endregion

		this.reloadView();
	}

	reloadView() {
		this.store.dispatch(MasterStateAction.FetchPhases());
	}

	onDeleteQuestion(qstn: CoreTrainingPresentationQuestion) {}
}
