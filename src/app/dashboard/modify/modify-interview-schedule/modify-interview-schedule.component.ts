import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientInterviewReport } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

@Component({
	selector: 'rd-modify-interview-schedule',
	templateUrl: './modify-interview-schedule.component.html',
	styleUrls: ['./modify-interview-schedule.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyInterviewScheduleComponent extends DashboardContentBase
implements OnInit, OnDestroy  {
	public statusClass = { Acc: 'acc', Rej: 'reject', Pos: 'pos' };

	public interviewScheduleReport: ClientInterviewReport;


	constructor(
		protected store: Store<IAppState>,
	) {
		super(store);
	}
  
	ngOnInit(): void {
    this.interviewScheduleReport = ClientInterviewReport.fromJson(
      MockData.GetInterviewSchedules
    );
    console.log(this.interviewScheduleReport);
  }

  isLocationLink(str : string){return str.includes('http')}
}
