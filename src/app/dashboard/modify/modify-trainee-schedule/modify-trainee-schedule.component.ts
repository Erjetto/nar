import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
	FormControl,
	Validators,
	ValidationErrors,
	AbstractControl,
	FormBuilder,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	MainStateEffects,
	MasterStateEffects,
	MasterStateAction,
	BinusianStateAction,
	BinusianStateEffects,
	MainStateAction,
	fromMasterState,
} from 'src/app/shared/store-modules';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { TraineeSchedule } from 'src/app/shared/models';
import { HttpClient } from '@angular/common/http';
import { DateHelper } from 'src/app/shared/utilities/date-helper';
import { isEmpty as _isEmpty } from 'lodash';

@Component({
	selector: 'rd-trainee-schedule',
	templateUrl: './modify-trainee-schedule.component.html',
	styleUrls: ['./modify-trainee-schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyTraineeScheduleComponent
	extends DashboardContentBase
	implements OnInit, OnDestroy {
	viewDateFormat = DateHelper.DMY_FORMAT;

	viewTraineeTrainingSchedule$: Observable<TraineeSchedule[]>;

	loadingViewTraineeTrainingSchedule$: Observable<boolean>;

	insertTrainingScheduleText = this.fb.control('', Validators.required);
	insertTraineeAttendanceText = this.fb.control('', Validators.required);
	insertLectureScheduleText = this.fb.control('', Validators.required);

	loadingFormInsertTrainingSchedule$ = new BehaviorSubject<boolean>(false);
	loadingFormInsertTraineeAttendance$ = new BehaviorSubject<boolean>(false);
	loadingFormInsertLectureSchedule$ = new BehaviorSubject<boolean>(false);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private masterEffects: MasterStateEffects,
		private binusianEffects: BinusianStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		this.viewTraineeTrainingSchedule$ = this.store.pipe(
			select(fromMasterState.getTraineeTrainingSchedule)
		);
		this.loadingViewTraineeTrainingSchedule$ = this.store.pipe(
			select(fromMasterState.isTraineeTrainingScheduleLoading)
		);

		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingFormInsertTrainingSchedule$.next(false);
			this.loadingFormInsertTraineeAttendance$.next(false);
			this.loadingFormInsertLectureSchedule$.next(false);
		});

		this.currentGeneration$
			.pipe(
				filter((v) => !_isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((gen) => {
				this.store.dispatch(
					MasterStateAction.FetchTraineeSchedulesBy({
						generationId: gen.GenerationId,
					})
				);
			});
	}

	submitInsertTrainingSchedule() {
		this.loadingFormInsertTrainingSchedule$.next(true);
		this.store.dispatch(
			BinusianStateAction.CreateTrainingSchedules({
				schedules: this.insertTrainingScheduleText.value.trim().split('\n'),
			})
		);
	}
	submitInsertTraineeAttendance() {
		this.loadingFormInsertTraineeAttendance$.next(true);
		this.store.dispatch(
			BinusianStateAction.CreateTraineeAttendances({
				attendances: this.insertTraineeAttendanceText.value.trim().split('\n'),
			})
		);
	}
	submitInsertLectureSchedule() {
		this.loadingFormInsertLectureSchedule$.next(true);
		this.store.dispatch(
			BinusianStateAction.CreateLectureSchedules({
				schedules: this.insertLectureScheduleText.value.trim().split('\n'),
			})
		);
	}

	deleteTraineeTrainingSchedule(s: TraineeSchedule) {}

	// OPTIONAL: Add regex here to learn more about regex hehehe
	trainingScheduleFormat({ value }: AbstractControl): ValidationErrors {
		if (false) return { regexError: true };
		else return {};
	}
}
