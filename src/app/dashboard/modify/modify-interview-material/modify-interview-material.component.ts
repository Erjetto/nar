import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, BehaviorSubject, combineLatest, merge } from 'rxjs';
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
	InterviewStateEffects,
	fromMainState,
	MainStateAction,
} from 'src/app/shared/store-modules';
import { takeUntil, withLatestFrom, filter, map, tap } from 'rxjs/operators';
import { NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { isEmpty as _isEmpty, map as _map } from 'lodash';

@Component({
	selector: 'rd-modify-interview-material',
	templateUrl: './modify-interview-material.component.html',
	styleUrls: ['./modify-interview-material.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyInterviewMaterialComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
	singleUploadForm = this.fb.group({
		fileForm: this.fb.group({ fileId: '', fileName: '' }),
		materialName: ['', Validators.required],
		trainee_Id: ['', Validators.required],
	});
	// massUploadFiles: { fileIds: string[]; fileNames: string[] }; // for dispatch massupload
	massUploadFileForm = this.fb.array([], Validators.required);
	deleteReasonText = new FormControl('', Validators.required);

	phaseTypes$: Observable<any[]>;
	phases$: Observable<ClientPhase[]>;
	allTrainees$: Observable<ClientTrainee[]>;

	interviewMaterials$: Observable<InterviewMaterial[]>;

	loadingViewInterviewMaterial$: Observable<boolean>;
	loadingFormInterviewMaterial$ = new BehaviorSubject<boolean>(false);

	currentPhase$ = new BehaviorSubject<ClientPhase>(null);

	editForm = new InterviewMaterialDetail();

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private interviewEffects: InterviewStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.phaseTypes$ = this.store.pipe(select(fromMasterState.getPhaseTypes));
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.interviewMaterials$ = this.store.pipe(select(fromInterviewState.getInterviewMaterials));
		this.loadingViewInterviewMaterial$ = this.store.pipe(
			select(fromInterviewState.isInterviewMaterialsLoading)
		);
		this.allTrainees$ = this.store.pipe(
			select(fromBinusianState.getAllTrainees),
			map((trainees: ClientTrainee[]) => [
				new ClientTrainee('T000', 'All'), // Add for all trainee
				...trainees,
			])
		);

		//#region Auto select first in array
		this.phases$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((phases) => this.currentPhase$.next(phases[0]));

		this.allTrainees$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((trainees) =>
				this.singleUploadForm.get('trainee_Id').setValue(trainees[0].TraineeId)
			);
		//#endregion

		//#region Auto fetch
		this.currentPhase$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((currPhase) =>
				this.store.dispatch(
					InterviewStateAction.FetchInterviewMaterials({ phaseId: currPhase.PhaseId })
				)
			);
		merge(
			this.interviewEffects.createInterviewMaterials$,
      this.interviewEffects.massCreateInterviewMaterials$,
      this.interviewEffects.deleteInterviewMaterial$
		)
			.pipe(takeUntil(this.destroyed$), withLatestFrom(this.currentPhase$))
			.subscribe(([action, currPhase]) => {
				this.store.dispatch(
					InterviewStateAction.FetchInterviewMaterials({ phaseId: currPhase.PhaseId })
				);
			});
		//#endregion

		//#region Subscribe to effects
		// Remove loading
		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.loadingFormInterviewMaterial$.next(false));

		this.mainEffects.changeGen$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(MasterStateAction.FetchPhases());
			this.store.dispatch(BinusianStateAction.FetchAllTraineesInCurrentGen());
		});
		//#endregion

		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
		this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: BinusianStateAction.FetchAllTraineesInCurrentGen(),
				selectorToBeChecked: fromBinusianState.getAllTrainees,
			})
		);
	}

	get hasSingleFile() {
		return !_isEmpty(this.singleUploadForm.get('fileId').value);
	}
	removeSingleUploadFile() {
		this.singleUploadForm.get('fileId').setValue(null);
	}
	submitInsertPerTraineeForm() {
		const { fileForm, materialName, trainee_Id } = this.singleUploadForm.value;
		this.store.dispatch(
			InterviewStateAction.CreateInterviewMaterial({
				trainee_Id,
				materialName,
				fileId: fileForm.fileId,
			})
		);
	}
	submitMassInsertForm() {
		// Split jadi 2 array
		const { fileIds, fileNames } = this.massUploadFileForm.value.reduce(
			(prev, curr) => {
				prev.fileIds.push(curr.fileId);
				prev.fileNames.push(curr.fileName);
			},
			{ fileId: [], fileName: [] }
		);
		this.store.dispatch(InterviewStateAction.MassCreateInterviewMaterial({ fileIds, fileNames }));
	}

	deleteTraineeFile(m: InterviewMaterial, d: InterviewMaterialDetail) {
		this.store.dispatch(
			InterviewStateAction.DeleteInterviewMaterial({
				fileid: d.FileId,
				materialId: m.MaterialId,
				traineeid: m.Trainee.TraineeId,
				reason: this.deleteReasonText.value,
			})
		);
		this.deleteReasonText.reset();
	}
}
