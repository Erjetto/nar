import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	TraineePresentation,
	ClientTraineeAttendanceReport,
	ClientEvaluation,
	EvaluationNote,
	ClientEvaluationNote,
} from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Observable, BehaviorSubject, merge, combineLatest } from 'rxjs';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import {
	PresentationStateAction,
	AttendanceStateAction,
	NoteStateAction,
	fromPresentationState,
	fromAttendanceState,
	fromNoteState,
	MainStateEffects,
	NoteStateEffects,
} from 'src/app/shared/store-modules';
import { takeUntil, tap, withLatestFrom } from 'rxjs/operators';

@Component({
	selector: 'rd-view-evaluation',
	templateUrl: './view-evaluation.component.html',
	styleUrls: ['./view-evaluation.component.scss'],
})
export class ViewEvaluationComponent extends DashboardContentBase implements OnInit, OnDestroy {
	detailedViewDateFormat = 'dd-MM-yyyy HH:mm:ss';
	viewDateFormat = 'dd MMM yyyy';

	// currentDate = new FormControl(DateHelper.dateToInputFormat(new Date()));
	currentDate = new FormControl('2018-01-17');
	filterEvaluationForm = this.fb.group({
		evalType: [null],
		search: [''],
		sort: ['Date'],
		asc: [true],
	});
	insertEvaluationForm = this.fb.group({
		notes: ['', Validators.required],
		evalType: [null, Validators.required],
  });
  changeAttendanceForm = this.fb.group({
    
  })

	evalType = ['Tidiness', 'Case Making', 'Presentation', 'Book', 'Attendance', 'Others'];

	todaysPresentation$: Observable<TraineePresentation[]>;
	attendanceReport$: Observable<ClientTraineeAttendanceReport>;
	evaluations$: Observable<ClientEvaluation>;
	filteredEvalNotes$: Observable<ClientEvaluationNote[]>;
	presentationDetail$ = new BehaviorSubject<TraineePresentation>(null);

	loadingTodaysPresentation$: Observable<boolean>;
	loadingAttendanceReport$: Observable<boolean>;
	loadingEvaluations$: Observable<boolean>;

  // 
	loadingViewEvaluations$ = new BehaviorSubject<boolean>(false);
	loadingViewAttendances$ = new BehaviorSubject<boolean>(false);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private noteEffects: NoteStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.todaysPresentation$ = this.store.pipe(
			select(fromPresentationState.getPresentationsByDate)
		);
		this.attendanceReport$ = this.store.pipe(select(fromAttendanceState.getAttendanceReport));
		this.evaluations$ = this.store.pipe(select(fromNoteState.getEvaluations));
		this.filteredEvalNotes$ = this.store.pipe(select(fromNoteState.getFilteredEvaluationNotes));
		this.loadingTodaysPresentation$ = this.store.pipe(
			select(fromPresentationState.isPresentationsLoading)
		);
		this.loadingAttendanceReport$ = this.store.pipe(
			select(fromAttendanceState.isAttendanceReportLoading)
		);
		this.loadingEvaluations$ = this.store.pipe(select(fromNoteState.isEvaluationsLoading));
		this.loadingTodaysPresentation$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(this.loadingViewAttendances$);
		this.loadingEvaluations$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(this.loadingViewEvaluations$);
		//#endregion

		//#region Auto fetch
		merge(this.currentDate.valueChanges, this.mainEffects.changeGen$)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.getEvaluationDataByDate(this.currentDate.value));
		//#endregion

		this.filterEvaluationForm.valueChanges
			.pipe(takeUntil(this.destroyed$))
			.subscribe((val) => this.store.dispatch(NoteStateAction.SetEvaluationNoteFilter(val)));


		this.getEvaluationDataByDate(this.currentDate.value);
	}

	get sorter() {
		return this.filterEvaluationForm.get('sort');
	}
	toggleSort() {
		this.filterEvaluationForm.get('asc').setValue(!this.filterEvaluationForm.get('asc').value);
	}

	// Get data by date (yyyy-MM-dd)
	getEvaluationDataByDate(date: string) {
		this.store.dispatch(PresentationStateAction.FetchPresentationsByDate({ time: date }));
		this.store.dispatch(AttendanceStateAction.FetchAttendanceReport({ date }));
		this.store.dispatch(NoteStateAction.FetchEvaluation({ sdate: date }));
	}

	selectPresentation(row: TraineePresentation) {
		this.presentationDetail$.next(row);
	}

	saveEvaluationNote() {
		this.loadingViewEvaluations$.next(true);
		this.store.dispatch(
			NoteStateAction.CreateEvaluationNote({
				...this.insertEvaluationForm.value,
				sdate: new Date(this.currentDate.value),
			})
		);
	}

	deleteEvaluation(note: EvaluationNote) {
		this.loadingViewEvaluations$.next(true);
		this.store.dispatch(
			NoteStateAction.DeleteEvaluationNote({
				noteId: note.NoteId,
			})
		);
	}

	changeTraineeAttendance() {
		this.loadingViewAttendances$.next(true);
	}
}
