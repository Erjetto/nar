import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

import {
	MasterStateAction,
	fromMasterState,
	PresentationStateAction,
	fromPresentationState,
	MainStateEffects,
	PresentationStateEffects,
  fromMainState,
  MainStateAction,
} from 'src/app/shared/store-modules';

import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import {
	ClientSubject,
	CoreTrainingPresentation,
	ClientPhase,
	TraineePresentation,
  CoreTrainingPresentationItem,
  CoreTrainingPresentationQuestion,
  User,
  ClientGeneration,
} from 'src/app/shared/models';
import { isEmpty as _isEmpty, sortBy as _sortBy } from 'lodash';
import { takeUntil, filter, withLatestFrom, map, tap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { RoleFlags } from 'src/app/shared/constants/role.constant';
import { TryGetCoreTrainingPhase } from 'src/app/shared/methods';

@Component({
	selector: 'rd-view-all-presentation',
	templateUrl: './view-all-presentation.component.html',
	styleUrls: ['./view-all-presentation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAllPresentationComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
  subjects: ClientSubject[]; // to find subject name by id

  phases$: Observable<ClientPhase[]>;
  subjects$: Observable<ClientSubject[]>;
	presentations$: Observable<CoreTrainingPresentation[]>;
	traineesInSubject$: Observable<string[]>;
	presentationsForTrainee$: Observable<CoreTrainingPresentation[]>;
	myPresentationList$: Observable<CoreTrainingPresentation[]>;
  presentationStatus$: Observable<string>;
  


	currentPresentation$: BehaviorSubject<CoreTrainingPresentation> = new BehaviorSubject(null);
	currentTraineeCode$: Subject<string> = new Subject();
	currentSubject$: Subject<ClientSubject> = new Subject();
	currentPhase$: Subject<ClientPhase> = new Subject();

	showScoringForm$ = new BehaviorSubject<boolean>(false);
	scoringForm = this.fb.group({
		phaseId: ['', Validators.required],
		subjectId: ['', Validators.required],
		traineeId: ['', Validators.required],
		notes: ['', Validators.required],
		presentationNo: ['', Validators.required],
		status: ['', Validators.required],
		classControl: ['', Validators.required],
		understanding: ['', Validators.required],
		voice: ['', Validators.required],
  });
  deleteQuestionReason = this.fb.control('');

	subjectsLoading$: Observable<boolean>;
	presentationsLoading$: Observable<boolean>;
  loadingViewPresentation$ = new BehaviorSubject<boolean>(false);
  
  constant = {
    role: RoleFlags
  }

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private presentationEffects: PresentationStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind from store
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.subjects$ = this.store.pipe(
			select(fromMasterState.getSubjects),
			map((subs: ClientSubject[]) => [...subs].reverse()) // The last subject is the first in list
		);
		this.subjectsLoading$ = this.store.pipe(select(fromMasterState.isSubjectsLoading));

		this.presentations$ = this.store.pipe(select(fromPresentationState.getPresentations));
		this.presentationStatus$ = this.store.pipe(select(fromPresentationState.getPresentationStatus));
		this.presentationsLoading$ = this.store.pipe(
			select(fromPresentationState.isPresentationsLoading)
		);
    
    this.myPresentationList$ = this.store.pipe(
      select(fromPresentationState.getMyPresentations),
      map(presentations => _sortBy(presentations, 'PresentationDate').reverse())
    )
		//#endregion

		// When one of these changed, also change filtered trainees
		// Expected list: T000 - T999
		// Get all trainee from filtered trainee code
		// Get all distinct trainee code that has presentation in a subject
		this.traineesInSubject$ = combineLatest([this.currentSubject$, this.presentations$]).pipe(
			takeUntil(this.destroyed$),
			map(([sbj, presentations]) => [
				...new Set<string>(
					presentations.filter((p) => p.SubjectId === sbj?.SubjectId).map((p) => p.TraineeCode)
				),
			])
		);

		// get current trainee's presentation numbers (1,2,...)
		this.presentationsForTrainee$ = combineLatest([
			this.currentSubject$,
			this.presentations$,
			this.currentTraineeCode$,
		]).pipe(
			takeUntil(this.destroyed$),
			map(([sbj, presentations, traineeCode]) =>
				presentations.filter((p) => p.SubjectId === sbj?.SubjectId && p.TraineeCode === traineeCode)
			)
    );

		//#region Auto get first value in array
		this.phases$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
			this.currentPhase$.next(TryGetCoreTrainingPhase(res));
		});

		this.subjects$.pipe(takeUntil(this.destroyed$)).subscribe((subjects) => {
			this.currentSubject$.next(subjects[0]);
		});

		this.traineesInSubject$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((traineeCodes) => this.currentTraineeCode$.next(traineeCodes[0]));

		this.presentationsForTrainee$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((presentations) => this.currentPresentation$.next(presentations[0]));
		//#endregion

    //#region Bind to effects
    this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.loadingViewPresentation$.next(false);
    });
		this.mainEffects.changeGen$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(MasterStateAction.FetchPhases());
		});
		this.presentationEffects.saveTraineePresentation$
			.pipe(takeUntil(this.destroyed$))
			.subscribe((act) => {
        // NOTE: Masih bar-bar, harus bikin tempat khusus utk tahu apakah resultnya success
				// tslint:disable-next-line: no-string-literal
				if (act['messageType'].includes('success')) {
					this.showScoringForm$.next(false);
					this.store.dispatch(
						PresentationStateAction.FetchPresentationStatus({
							filename: this.currentPresentation$.value.presentationFileName,
						})
					);
				}
			});
		//#endregion

		//#region Auto fetch
		this.currentPhase$
			.pipe(
				filter((res) => !_isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((p) => {
				this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: p.PhaseId }));
			});

		this.currentSubject$
			.pipe(
				filter((res) => !_isEmpty(res)),
				takeUntil(this.destroyed$),
				withLatestFrom(this.currentGeneration$)
			)
			.subscribe(([sub, gen]) => {
				this.store.dispatch(
					PresentationStateAction.FetchPresentationsBy({
						generationId: gen.GenerationId,
						subjectId: sub.SubjectId,
					})
				);
			});

		this.currentPresentation$ // Auto fetch Presentation Status
			.pipe(
				filter((res) => !_isEmpty(res)),
				takeUntil(this.destroyed$)
			)
			.subscribe((res) => {
				this.store.dispatch(
					PresentationStateAction.FetchPresentationStatus({
						filename: res.presentationFileName,
					})
				);
				this.scoringForm.patchValue({
					phaseId: res.PhaseId,
					subjectId: res.SubjectId,
					traineeId: res.TraineeId,
					presentationNo: res.PresentationNo,
				});
      });
      // Dari dashboard content base
      combineLatest([ this.currentUser$, this.currentGeneration$ ])
      .pipe(
        takeUntil(this.destroyed$), 
        filter(values => values.every(v => !_isEmpty(v))),
      )
      .subscribe(([user, gen]: [User, ClientGeneration]) => {
				this.store.dispatch(
          PresentationStateAction.FetchPresentationsBy({
            generationId: gen.GenerationId,
            traineeId: user.TraineeId
          })
        )
      })
		//#endregion

    this.store.dispatch(
			MainStateAction.DispatchIfEmpty({
				action: MasterStateAction.FetchPhases(),
				selectorToBeChecked: fromMasterState.getPhases,
			})
		);
	}

	get understandingValue() {
		return this.scoringForm.get('understanding').value;
	}

	get voiceValue() {
		return this.scoringForm.get('voice').value;
	}

	get classControlValue() {
		return this.scoringForm.get('classControl').value;
	}

	get statusValue() {
		return this.scoringForm.get('status').value;
  }
  
  getSubjectById(subId){
    return this.subjects.find(s => s.SubjectId === subId);
  }

	submitScoringForm() {
		this.loadingViewPresentation$.next(true);
		this.store.dispatch(
			PresentationStateAction.SaveTraineePresentation({
				data: TraineePresentation.fromJson(this.scoringForm.value),
			})
		);
	}

	deleteQuestion(question: CoreTrainingPresentationQuestion) {
		this.loadingViewPresentation$.next(true);
		this.store.dispatch(PresentationStateAction.DeleteCoreTrainingPresentationItem({
      filename: question.parent.presentationFileName,
      itemId: question.Question.Id,
      note: this.deleteQuestionReason.value ?? '',
    }));
	}
}
