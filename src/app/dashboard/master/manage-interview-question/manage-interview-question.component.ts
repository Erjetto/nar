import { Component, OnInit } from '@angular/core';
import { ClientInterviewQuestion, InterviewQuestionDetail } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';

@Component({
  selector: 'rd-manage-interview-question',
  templateUrl: './manage-interview-question.component.html',
  styleUrls: ['./manage-interview-question.component.scss']
})
export class ManageInterviewQuestionComponent implements OnInit {

  public interviewQuestion: ClientInterviewQuestion[];
  public interviewQuestionDetails: InterviewQuestionDetail[];

  constructor() { 
    this.interviewQuestion = MockData.GetInterviewQuestions.map(ClientInterviewQuestion.fromJson);
    this.interviewQuestionDetails = MockData.GetInterviewQuestionDetails.map(InterviewQuestionDetail.fromJson);
  }

  ngOnInit(): void {
  }

}
