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
  public detailedViewDateFormat = 'dd-MM-yyyy HH:mm:ss'
  public viewDateFormat = 'dd MMM yyyy'

  public currentDate = new Date()

  public evalType = ['Tidiness', 'Case Making', 'Presentation', 'Book', 'Attendance', 'Others']

  public todaysPresentation: TraineePresentation[];
  public attendanceReport: ClientTraineeAttendanceReport;
  public evaluations: ClientEvaluation;

  constructor(private store: Store<IAppState>, action: ActionsSubject,) { super(action); }

  ngOnInit(): void {
    this.todaysPresentation = MockData.GetPresentationReportDetailByDate.map(TraineePresentation.fromJson);
    this.attendanceReport = ClientTraineeAttendanceReport.fromJson(MockData.GetTraineeAttendances);
    this.evaluations = ClientEvaluation.fromJson(MockData.GetEvaluation)
  }

  onSelectPresentation(row: TraineePresentation){

  }

}
