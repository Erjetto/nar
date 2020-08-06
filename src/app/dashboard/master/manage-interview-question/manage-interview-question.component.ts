import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientInterviewQuestion, InterviewQuestionDetail } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

@Component({
  selector: 'rd-manage-interview-question',
  templateUrl: './manage-interview-question.component.html',
  styleUrls: ['./manage-interview-question.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageInterviewQuestionComponent extends DashboardContentBase
implements OnInit, OnDestroy  {

  public interviewQuestion: ClientInterviewQuestion[];
  public interviewQuestionDetails: InterviewQuestionDetail[];

	constructor(
		private store: Store<IAppState>,
		action: ActionsSubject,
	) {
		super(action);
	}
  
  ngOnInit(): void {
    this.interviewQuestion = MockData.GetInterviewQuestions.map(ClientInterviewQuestion.fromJson);
    this.interviewQuestionDetails = MockData.GetInterviewQuestionDetails.map(InterviewQuestionDetail.fromJson);
  }

}
