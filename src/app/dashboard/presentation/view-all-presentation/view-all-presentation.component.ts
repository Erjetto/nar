import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

import * as BinusianStateAction from 'src/app/shared/stores/binusian/binusian.action';
import * as fromBinusianState from 'src/app/shared/stores/binusian/binusian.reducer';
import * as MainStateAction from 'src/app/shared/stores/main/main.action';
import * as fromMainState from 'src/app/shared/stores/main/main.reducer';
import * as MasterStateAction from 'src/app/shared/stores/master/master.action';
import * as fromMasterState from 'src/app/shared/stores/master/master.reducer';
import * as PresentationStateAction from 'src/app/shared/stores/presentation/presentation.action';
import * as fromPresentationState from 'src/app/shared/stores/presentation/presentation.reducer';

import { Observable, Subject, merge, combineLatest, BehaviorSubject } from 'rxjs';
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
import { takeUntil, filter, tap, withLatestFrom, switchMap } from 'rxjs/operators';

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
	public traineesInSubject$: Subject<string[]> = new Subject();
	public presentationsForTrainee$: Subject<CoreTrainingPresentation[]> = new Subject();

	public currentPresentation$: BehaviorSubject<CoreTrainingPresentation> = new BehaviorSubject(
		null
	);
	public presentationStatus$: Observable<string>;
	public currentTraineeCode$: Subject<string> = new Subject();
	public currentSubject$: Subject<ClientSubject> = new Subject();
	public currentPhase$: Subject<ClientPhase> = new Subject();

	public filteredTrainees$: Subject<CoreTrainingPresentation[]> = new Subject();

	public phases$: Observable<ClientPhase[]>;
	public subjects$: Observable<ClientSubject[]>;

	public subjectsLoading$: Observable<boolean>;
	public presentationsLoading$: Observable<boolean>;

	constructor(protected store: Store<IAppState>) {
		super(store);
	}

	ngOnInit(): void {
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.subjects$ = this.store.pipe(select(fromMasterState.getSubjects));
		this.subjectsLoading$ = this.store.pipe(select(fromMasterState.isSubjectsLoading));

		this.presentations$ = this.store.pipe(select(fromPresentationState.getPresentations));
		this.presentationStatus$ = this.store.pipe(select(fromPresentationState.getPresentationStatus));
		this.presentationsLoading$ = this.store.pipe(
			select(fromPresentationState.isPresentationsLoading)
		);

		//#region auto fetch new subject,schedule & case in first fetch
		this.phases$ // Auto fetch subject
			.pipe(
				filter((res) => !isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((res) => {
				this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: res[0].PhaseId }));
				this.currentPhase$.next(res[0]);
			});

		this.subjects$ // Auto fetch presentation
			.pipe(
				filter((res) => !isEmpty(res)),
				withLatestFrom(this.currentGeneration$),
				takeUntil(this.destroyed$)
			)
			.subscribe(([subjects, gen]) => {
				this.currentSubject$.next(subjects[0]);
				this.store.dispatch(
					PresentationStateAction.FetchPresentations({
						generationId: gen.GenerationId,
						subjectId: subjects[0].SubjectId,
					})
				);
			});

		// When one of these changed, also change filtered trainees
		combineLatest([this.currentSubject$, this.presentations$])
			.pipe(
				filter((values) => values.every((v) => !isEmpty(v))),
				takeUntil(this.destroyed$)
			)
			.subscribe(([sbj, presentations]) => {
				// Get all distinct trainee code that has presentation in a subject
				const filteredTrainees = [
					...new Set<string>(
						presentations.filter((p) => p.SubjectId === sbj.SubjectId).map((p) => p.TraineeCode)
					),
				];

				// Get all trainee from filtered trainee code
				// this.filteredTrainees$.next(trainees.filter((t) => filteredTrainees.has(t.TraineeCode)));
				this.traineesInSubject$.next(filteredTrainees);
				this.currentTraineeCode$.next(filteredTrainees[0]);
			});

		// Update presentations for trainee (number)
		combineLatest([this.currentSubject$, this.presentations$, this.currentTraineeCode$])
			.pipe(
				filter((values) => values.every((v) => !isEmpty(v))),
				takeUntil(this.destroyed$)
			)
			.subscribe(([sbj, presentations, traineeCode]) => {
				const presentationsFromTrainee = presentations.filter(
					(p) => p.SubjectId === sbj.SubjectId && p.TraineeCode === traineeCode
				);
				this.presentationsForTrainee$.next(presentationsFromTrainee);
        this.currentPresentation$.next(presentationsFromTrainee[0]);
        console.log(presentationsFromTrainee);
			});

		this.currentPresentation$ // Auto fetch Presentation Status
			.pipe(
				filter((res) => !isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((res) => {
				this.store.dispatch(
					PresentationStateAction.FetchPresentationStatus({
						filename: res.presentationStatusCode,
					})
				);
			});
		//#endregion

		this.store.dispatch(MasterStateAction.FetchPhases());
	}

	onDeleteQuestion(qstn: CoreTrainingPresentationQuestion) {}
}
