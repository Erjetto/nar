import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { TraineePresentation, ClientTraineeAttendanceReport, ClientEvaluation } from 'src/app/shared/models';
// import { MockData } from 'src/app/shared/mock-data-old';
import { MockData } from 'src/app/shared/mock-data';
import { DashboardContentBase } from '../../dashboard-content-base.component';

@Component({
  selector: 'rd-view-evaluation',
  templateUrl: './view-evaluation.component.html',
  styleUrls: ['./view-evaluation.component.scss']
})
export class ViewEvaluationComponent extends DashboardContentBase implements OnInit, OnDestroy {
  detailedViewDateFormat = 'dd-MM-yyyy HH:mm:ss'
  viewDateFormat = 'dd MMM yyyy'

  currentDate = new Date()

  evalType = ['Tidiness', 'Case Making', 'Presentation', 'Book', 'Attendance', 'Others']

  todaysPresentation: TraineePresentation[];
  attendanceReport: ClientTraineeAttendanceReport;
  evaluations: ClientEvaluation;

  constructor(protected store: Store<IAppState>) { super(store); }

  ngOnInit(): void {
    
    this.todaysPresentation = MockData.GetPresentationReportDetailByDate.map(TraineePresentation.fromJson);
    this.attendanceReport = ClientTraineeAttendanceReport.fromJson(MockData.GetTraineeAttendances);
    this.evaluations = ClientEvaluation.fromJson(MockData.GetEvaluation)
  }

  onSelectPresentation(row: TraineePresentation){

  }

  viewEvaluationOnDate(input: Event){
    const date = input.target['value'];
    console.log(date);
    
  }

}
