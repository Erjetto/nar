import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientSubject, LogBookPIC, ClientTrainee, ClientPhase } from 'src/app/shared/models';
import { takeUntil, filter, map, startWith } from 'rxjs/operators';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import {
	MainStateEffects,
	fromBinusianState,
	BinusianStateAction,
	LogStateAction,
	fromLogState,
	MasterStateAction,
	LogStateEffects,
	fromMasterState,
} from 'src/app/shared/store-modules';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { isEmpty as _isEmpty, merge } from 'lodash';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import {
	adjustControlsInFormArray,
	isEmptyGuid,
	TryGetCoreTrainingPhase,
} from 'src/app/shared/methods';
import { DispatchIfEmpty } from 'src/app/shared/stores/main/main.action';

@Component({
	selector: 'rd-log-book',
	templateUrl: './log-book.component.html',
	styleUrls: ['./log-book.component.scss'],
})
export class LogBookComponent extends DashboardContentBase implements OnInit, OnDestroy {
	logDateFormat = DateHelper.WEEKDAY_DATE_FORMAT;
	today = DateHelper.dateToFormat(Date.now());
	types = [
		'Personal Identity',
		'Softskill I',
		'Softskill II',
		'Subject Trainer',
		'Case Table',
		'Presentation',
	];

	viewLogBookForm = this.fb.group({
		start: [this.today, Validators.required],
		end: [this.today, Validators.required],
	});
	// Populate dengan LogBookPIC.Data
	logBookForm = this.fb.group({
		Data: this.fb.array([]),
		Id: [null],
		Subject: [null, Validators.required],
		PIC: [null, Validators.required],
		SavedDate: [null],
	});
	newTraineeRowControl = this.fb.control(null);

	traineeFilter = this.fb.control(null);
	trainees$: Observable<ClientTrainee[]>;
	subjects$: Observable<ClientSubject[]>;

	viewLogBookFiltered$: Observable<LogBookPIC[]>;
	viewCurrentLogBook$ = new BehaviorSubject<LogBookPIC>(null);

	loadingLogBook$: Observable<boolean>;
	loadingLogBookForm$ = new BehaviorSubject<boolean>(false);

	constructor(
		protected store: Store<IAppState>,
		private logEffects: LogStateEffects,
		private mainEffects: MainStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.subjects$ = this.store.pipe(select(fromMasterState.getSubjects));
		this.trainees$ = this.store.pipe(select(fromBinusianState.getTrainees));
		this.viewLogBookFiltered$ = combineLatest([
			this.store.pipe(select(fromLogState.getLogBooks)),
			this.traineeFilter.valueChanges.pipe(startWith('')),
		]).pipe(
			map(([res, traineeCode]: [LogBookPIC[], string]) =>
				_isEmpty(traineeCode)
					? res
					: res.filter((l) => l.Data.some((d) => d.Trainee == traineeCode))
			)
		);

		this.loadingLogBook$ = this.store.pipe(select(fromLogState.isLogBooksLoading));

		// Auto fetch log book on view change
		this.viewLogBookForm.valueChanges
			.pipe(takeUntil(this.destroyed$))
			.subscribe((data) => this.store.dispatch(LogStateAction.FetchLogBooks(data)));
    
    // Masukkan data ke form kalo klik baris
		this.viewCurrentLogBook$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((log) => {
				adjustControlsInFormArray(this.logBookDataForm, log.Data.length, this.logFormRowFactory);
				this.logBookForm.patchValue({
					...log,
					SavedDate: DateHelper.dateToFormat(log.SavedDate),
				});
			});

		// Auto Tambahkan row baru tiap kali pilih trainee di baris terakhir
		this.newTraineeRowControl.valueChanges
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((traineeCode) => {
				adjustControlsInFormArray(
					this.logBookDataForm,
					this.logBookDataForm.length + 1,
					this.logFormRowFactory
				);
				// Auto set value dari control yg paling bawah
				this.logBookDataForm
					.at(this.logBookDataForm.length - 1)
					.get('Trainee')
					.setValue(traineeCode);
				this.newTraineeRowControl.reset();
			});

    // Kalo ganti generation
		this.mainEffects.changeGen$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(BinusianStateAction.FetchAllTraineesInLatestPhase());
			this.store.dispatch(LogStateAction.FetchLogBooks(this.viewLogBookForm.value));
			this.store.dispatch(MasterStateAction.FetchPhases());
		});

		// Hilangkan loading kalo dah selesai request
		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.loadingLogBookForm$.next(false));

		// Auto refresh kalo ada CRUD
		merge(this.logEffects.saveLogBooks$)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() =>
				this.store.dispatch(LogStateAction.FetchLogBooks(this.viewLogBookForm.value))
			);

    // Ambil Subject di phase Core Training
		this.store
			.pipe(
				select(fromMasterState.getPhases),
				filter((v) => !_isEmpty(v), takeUntil(this.destroyed$))
			)
			.subscribe((phases: ClientPhase[]) => {
				const corePhase = TryGetCoreTrainingPhase(phases);
				if (corePhase)
					this.store.dispatch(MasterStateAction.FetchSubjects({ phaseId: corePhase.PhaseId }));
			});

		this.store.dispatch(
			DispatchIfEmpty({
				action: BinusianStateAction.FetchAllTraineesInLatestPhase(),
				selectorToBeChecked: fromBinusianState.getTrainees,
			})
		);
		this.store.dispatch(LogStateAction.FetchLogBooks(this.viewLogBookForm.value));
		this.store.dispatch(MasterStateAction.FetchPhases());
	}

	get logBookDataForm() {
		return this.logBookForm.get('Data') as FormArray;
	}

	get isEditing() {
		return isEmptyGuid(this.logBookForm.get('Id').value);
	}

	showLogDetail(log: LogBookPIC) {
		this.viewCurrentLogBook$.next(log);
	}

	newLogBook() {
		this.viewCurrentLogBook$.next(new LogBookPIC());
	}

	cancelEdit() {
		this.viewCurrentLogBook$.next(null);
	}

	updateLogBook() {
		const { Data, Id, Subject, PIC, SavedDate } = this.logBookForm.value;
		this.store.dispatch(
			LogStateAction.SaveLogBooks({ data: new LogBookPIC(Id, Data, Subject, PIC, SavedDate) })
		);
		this.loadingLogBookForm$.next(true);
	}

	deleteLog(log: LogBookPIC) {
		this.store.dispatch(LogStateAction.DeleteLogBook({ id: log.Id }));
	}

	deleteLogRow(idx) {
		this.logBookDataForm.removeAt(idx);
	}

	logFormRowFactory = () => ({
		Trainee: this.fb.control(null, Validators.required),
		Correct: this.fb.control([]),
		Wrong: this.fb.control([]),
		Note: this.fb.control(null),
	});

	searchByTraineeCodeAndName(term: string, item: ClientTrainee) {
		return item.codeAndName.toLowerCase().includes(term.toLowerCase());
	}
}
