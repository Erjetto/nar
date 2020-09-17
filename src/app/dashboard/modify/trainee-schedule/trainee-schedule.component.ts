import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	MainStateEffects,
	MasterStateEffects,
	MasterStateAction,
	BinusianStateAction,
	BinusianStateEffects,
} from 'src/app/shared/store-modules';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'rd-trainee-schedule',
	templateUrl: './trainee-schedule.component.html',
	styleUrls: ['./trainee-schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TraineeScheduleComponent extends DashboardContentBase implements OnInit, OnDestroy {
	insertTrainingScheduleText = new FormControl('', [
		Validators.required,
		this.trainingScheduleFormat,
	]);
	insertTraineeAttendanceText = new FormControl('', Validators.required);
	insertLectureScheduleText = new FormControl('', Validators.required);

	loadingFormInsertTrainingSchedule$ = new BehaviorSubject<boolean>(false);
	loadingFormInsertTraineeAttendance$ = new BehaviorSubject<boolean>(false);
	loadingFormInsertLectureSchedule$ = new BehaviorSubject<boolean>(false);

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private masterEffects: MasterStateEffects,
		private binusianEffects: BinusianStateEffects
	) {
		super(store);
	}

	ngOnInit(): void {
		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.loadingFormInsertTrainingSchedule$.next(false);
			this.loadingFormInsertTraineeAttendance$.next(false);
			this.loadingFormInsertLectureSchedule$.next(false);
    });
	}

	submitInsertTrainingSchedule() {
    this.loadingFormInsertTrainingSchedule$.next(true);
		this.store.dispatch(
			BinusianStateAction.CreateTrainingSchedules({
				schedules: (this.insertTrainingScheduleText.value + '').split('\n'),
			})
		);
	}
	submitInsertTraineeAttendance() {
    this.loadingFormInsertTraineeAttendance$.next(true);
		this.store.dispatch(
			BinusianStateAction.CreateTraineeAttendances({
				attendances: (this.insertTraineeAttendanceText.value + '').split('\n'),
			})
		);
	}
	submitInsertLectureSchedule() {
    this.loadingFormInsertLectureSchedule$.next(true);
		this.store.dispatch(
			BinusianStateAction.CreateLectureSchedules({
				schedules: (this.insertLectureScheduleText.value + '').split('\n'),
			})
		);
	}

	// OPTIONAL: Add regex here to learn more about regex hehehe
	trainingScheduleFormat({ value }: AbstractControl): ValidationErrors {
		if (false) return { regexError: true };
		else return {};
	}
}
