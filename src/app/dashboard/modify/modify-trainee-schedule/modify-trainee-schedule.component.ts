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
  MainStateAction,
} from 'src/app/shared/store-modules';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { takeUntil } from 'rxjs/operators';
import { TraineeSchedule } from 'src/app/shared/models';

@Component({
	selector: 'rd-trainee-schedule',
	templateUrl: './modify-trainee-schedule.component.html',
	styleUrls: ['./modify-trainee-schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyTraineeScheduleComponent extends DashboardContentBase implements OnInit, OnDestroy {
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

    this.store.dispatch(MainStateAction.TestRequest({
      // link: 'REST.svc/TraineeSchedule/Get/405c8061-2dd1-e411-8e96-d8d385fcda38/2c42ab6f-1ed2-e411-8e96-d8d385fcda38/secretariat/03-aug-2015/425de1b9-338f-4912-b735-cb2712a8f07f',
      link: 'REST.svc/TraineeSchedule/Create',
      // link: 'File.svc/GetZipFile/asdfasdf',
      method: 'post',
      body: {
        data: new TraineeSchedule('asasdf','asdf','asdf','asdf','asdf','asdf',new Date(), 'asdf', 'asdf',  'asdf', new Date(), 'asdf', 'asdf')
      }
    }));
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

	// OPTIONAL: Add regex here to learn more about regex hehehe
	trainingScheduleFormat({ value }: AbstractControl): ValidationErrors {
		if (false) return { regexError: true };
		else return {};
	}
}
