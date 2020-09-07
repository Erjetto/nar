import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import {
	ClientPhase,
	InterviewMaterial,
	ClientTrainee,
	Binusian,
	InterviewMaterialDetail,
} from 'src/app/shared/models';
import {
	MainStateEffects,
	fromMasterState,
	MasterStateAction,
	InterviewStateAction,
	fromBinusianState,
	BinusianStateAction,
	fromVoteState,
	fromInterviewState,
} from 'src/app/shared/store-modules';
import { takeUntil, withLatestFrom, filter, map } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'rd-modify-interview-material',
	templateUrl: './modify-interview-material.component.html',
	styleUrls: ['./modify-interview-material.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyInterviewMaterialComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
    
	public phaseTypes$: Observable<any[]>;
	public phases$: Observable<ClientPhase[]>;
	// public traineesEntity$: Observable<{ [id: string]: ClientTrainee }>;
	public trainees$: Observable<ClientTrainee[]>;

	public interviewMaterials$: Observable<InterviewMaterial[]>;

	public loadingFormInterviewMaterial$ = new BehaviorSubject<boolean>(false);
	public loadingViewInterviewMaterial$ = new BehaviorSubject<boolean>(false);
	public loadingSelectInterviewMaterial$ = new BehaviorSubject<boolean>(false);

	public currentPhase$ = new BehaviorSubject<ClientPhase>(null);

	public isFileUploading$ = new BehaviorSubject<boolean>(false);
	public uploadingFiles: string[] = ['T999_asdfasdfasdfasdf.pdf', 'T999_asdf.pdf', 'T999_asdf.pdf'];
	public editForm = new InterviewMaterialDetail();

	constructor(protected store: Store<IAppState>, private mainEffects: MainStateEffects) {
		super(store);
	}

	ngOnInit(): void {
		this.phaseTypes$ = this.store.pipe(select(fromMasterState.getPhaseTypes));
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.interviewMaterials$ = this.store.pipe(select(fromInterviewState.getInterviewMaterials));
		// this.traineesEntity$ = this.store.pipe(select(fromBinusianState.getTraineesEntity));
		this.trainees$ = this.store.pipe(
			select(fromBinusianState.getTrainees),
			map((trainees: ClientTrainee[]) => [
				new ClientTrainee('0', 'T000', 'All', '', false), // Add for all trainee
				...trainees,
			])
		);
		// this.interviewMaterials$ = this.store.pipe(select());

		this.phases$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((phases) => this.currentPhase$.next(phases[0]));

		this.currentPhase$
			.pipe(
				filter((v) => !isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((currPhase) =>
				this.store.dispatch(
					InterviewStateAction.FetchInterviewMaterials({ phaseId: currPhase.PhaseId })
				)
			);

		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.currentPhase$))
			.subscribe(([action, currPhase]) => {
				this.store.dispatch(
					InterviewStateAction.FetchInterviewMaterials({ phaseId: currPhase.PhaseId })
				);
			});
		this.store.dispatch(MasterStateAction.FetchPhases());
		this.store.dispatch(BinusianStateAction.FetchTrainees());
		// this.store.dispatch(InterviewStateAction.FetchInterviewMaterials());
	}

	submitInsertPerTraineeForm(form: NgForm) {}
	submitMassInsertForm(form: NgForm) {}

	// getTraineeFromEntity(phaseObservable: Observable<ClientPhase>) {
	// 	return combineLatest([this.traineeInPhaseEntity$, phaseObservable]).pipe(
	// 		map(([entity, currPhase]) => {
	// 			if (!currPhase) return [];
	// 			if (!!entity[currPhase.PhaseId]) return entity[currPhase.PhaseId];
	// 			else {
	// 				this.store.dispatch(
	// 					MasterStateAction.FetchTraineeInPhase({ phaseId: currPhase.PhaseId })
	// 				);
	// 				return [];
	// 			}
	// 		})
	// 	);
	// }
}
