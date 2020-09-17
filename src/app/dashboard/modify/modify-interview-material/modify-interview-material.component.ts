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
import * as _ from 'lodash';
import { NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { isEmpty } from 'lodash';

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
		fileName: [''], // Only for view purpose
		fileId: ['', Validators.required],
		materialName: ['', Validators.required],
		trainee_Id: ['', Validators.required],
	});
  massUploadFiles: { fileIds: string[]; fileNames: string[] }; // for dispatch massupload
  deleteReasonText = new FormControl('', Validators.required);

	// true if uploading per trainee, false if mass upload
	isUploadingSingle$ = new BehaviorSubject<boolean>(true);

	uploadedFiles$: Observable<{ fileid: string; filename: string }[]>;
	phaseTypes$: Observable<any[]>;
	phases$: Observable<ClientPhase[]>;
	trainees$: Observable<ClientTrainee[]>;

	interviewMaterials$: Observable<InterviewMaterial[]>;

	loadingViewInterviewMaterial$: Observable<boolean>;
	loadingFormInterviewMaterial$ = new BehaviorSubject<boolean>(false);

	currentPhase$ = new BehaviorSubject<ClientPhase>(null);

	isUploadingFiles$: Observable<boolean>;
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
		this.trainees$ = this.store.pipe(
			select(fromBinusianState.getTrainees),
			map((trainees: ClientTrainee[]) => [
				new ClientTrainee('0', 'T000', 'All', '', false), // Add for all trainee
				...trainees,
			])
		);
		this.uploadedFiles$ = this.store.pipe(select(fromMainState.getUploadedFiles));
		this.isUploadingFiles$ = this.store.pipe(select(fromMainState.isUploadingFiles));

		// If single upload, add it to form
		// If mass upload, save it into massUploadFiles
		this.uploadedFiles$
			.pipe(
				filter((v) => !isEmpty(v)),
				withLatestFrom(this.isUploadingSingle$),
				takeUntil(this.destroyed$)
			)
			.subscribe(([files, isPerTrainee]) => {
				if (isPerTrainee)
					this.singleUploadForm.patchValue({
						fileId: files[0].fileid,
						fileName: files[0].filename,
					});
				else
					this.massUploadFiles = {
						fileIds: _.map(files, 'fileid'),
						fileNames: _.map(files, 'filename'),
					};
			});
		//#endregion

		//#region Auto select first in array
		this.phases$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((phases) => this.currentPhase$.next(phases[0]));

		this.trainees$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((trainees) =>
				this.singleUploadForm.get('trainee_Id').setValue(trainees[0].TraineeId)
			);
		//#endregion

		//#region Auto fetch
		this.currentPhase$
			.pipe(
				filter((v) => !_.isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((currPhase) =>
				this.store.dispatch(
					InterviewStateAction.FetchInterviewMaterials({ phaseId: currPhase.PhaseId })
				)
			);
		merge(
			this.interviewEffects.createInterviewMaterials$,
			this.interviewEffects.massCreateInterviewMaterials$
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
			this.store.dispatch(BinusianStateAction.FetchTrainees());
		});
		//#endregion

		this.store.dispatch(MasterStateAction.FetchPhases());
		this.store.dispatch(BinusianStateAction.FetchTrainees());
	}

	get hasSingleFile() {
		return !_.isEmpty(this.singleUploadForm.get('fileId').value);
	}
	removeSingleUploadFile() {
		this.singleUploadForm.get('fileId').setValue(null);
	}
	submitInsertPerTraineeForm() {
		this.store.dispatch(InterviewStateAction.CreateInterviewMaterial(this.singleUploadForm.value));
	}
	submitMassInsertForm() {
		this.store.dispatch(InterviewStateAction.MassCreateInterviewMaterial(this.massUploadFiles));
	}

	uploadSingleFile(files: FileList) {
		this.isUploadingSingle$.next(true);
		this.store.dispatch(MainStateAction.UploadFile({ files: { ...files, length: files.length } }));
	}

	massUpload(files: FileList) {
		this.isUploadingSingle$.next(false);
		this.store.dispatch(MainStateAction.UploadFile({ files: { ...files, length: files.length } }));
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
