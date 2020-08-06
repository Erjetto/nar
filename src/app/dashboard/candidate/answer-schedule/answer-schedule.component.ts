import {
	Component,
	OnInit,
	ViewChild,
	ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
	SubcoCandidateAnswerModel,
	SubcoCandidateQuestionModel,
	Pair,
} from 'src/app/shared/models';
import * as CandidateStateAction from 'src/app/shared/stores/candidate/candidate.action';
import * as fromCandidateState from 'src/app/shared/stores/candidate/candidate.reducer';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeID from '@angular/common/locales/id';
import { take, takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { DashboardContentBase } from '../../dashboard-content-base.component';

@Component({
	selector: 'rd-answer-schedule',
	templateUrl: './answer-schedule.component.html',
	styleUrls: ['./answer-schedule.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerScheduleComponent extends DashboardContentBase
	implements OnInit, OnDestroy {
	@ViewChild('form') form: NgForm;

	public addSchedulePlaceholder = '';

	public questionModel: SubcoCandidateQuestionModel;
	public dateFormat = 'yyyy-MM-dd HH:mm';
	public viewDateFormat = 'yyyy MMM dd HH:mm';

	public trainerSchedule$: Observable<SubcoCandidateAnswerModel[]>;
	public selectedSchedule$: Observable<SubcoCandidateAnswerModel>;

	constructor(actionsSubject: ActionsSubject, private store: Store<IAppState>) {
		super(actionsSubject);
		registerLocaleData(localeID);
		const pipe = new DatePipe('ID');
		const today = pipe.transform(Date.now(), this.dateFormat);
		this.addSchedulePlaceholder = `${today}, ${today}, XX99-9`;
	}

	ngOnInit(): void {
		this.trainerSchedule$ = this.store.pipe(
			select(fromCandidateState.getAnswerModels)
		);
		this.selectedSchedule$ = this.store.pipe(
			select(fromCandidateState.getSelectedAnswer)
		);
		this.store
			.pipe(select(fromCandidateState.getQuestionModel), take(2))
			.subscribe((res) => {
				this.questionModel = res;
				console.log(res);
			});

		this.trainerSchedule$.subscribe(console.log);

		// this.form.valueChanges.pipe(
		//   // takeUntil(this.destoryed$),

    // ).subscribe((evt) => this.store.dispatch())
    this.reloadView();
	}

	reloadView() {
		this.store.dispatch(CandidateStateAction.FetchQuestions());
		this.store.dispatch(CandidateStateAction.FetchAnswers());
	}

	onSelectSchedule(row: SubcoCandidateAnswerModel) {
		this.store.dispatch(CandidateStateAction.ViewSchedule({ payload: row }));
		console.log(row);
	}

	closeViewSchedule() {
    // Bad practice? : use null to close card
		this.store.dispatch(CandidateStateAction.ViewSchedule({ payload: null }));
	}

	deleteSchedule(form) {
		console.log(form);
	}

	saveSchedule(form) {
		console.log(form);
	}
}
