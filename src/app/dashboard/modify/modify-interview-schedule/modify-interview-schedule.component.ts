import { Component, OnInit } from '@angular/core';
import { ClientInterviewReport } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';

@Component({
	selector: 'rd-modify-interview-schedule',
	templateUrl: './modify-interview-schedule.component.html',
	styleUrls: ['./modify-interview-schedule.component.scss'],
})
export class ModifyInterviewScheduleComponent implements OnInit {
	public statusClass = { Acc: 'acc', Rej: 'reject', Pos: 'pos' };

	public interviewScheduleReport: ClientInterviewReport;

	constructor() {
		this.interviewScheduleReport = ClientInterviewReport.fromJson(
			MockData.GetInterviewSchedules
    );
    console.log(this.interviewScheduleReport);
    
	}

	ngOnInit(): void {}
}
