import { Component, OnInit } from '@angular/core';
import { ClientPhase, ClientSubject, ClientSchedule } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';

@Component({
  selector: 'rd-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.scss']
})
export class ManageScheduleComponent implements OnInit {

  public viewDateFormat = 'EEEE, dd MMM yyyy';

	public schedules: ClientSchedule[];
	public subjects: ClientSubject[];
	public phases: ClientPhase[];
	public phaseTypes = [{ key: 'ar', val: 'Assistant Recruitment' }];

	public editForm: ClientSchedule;

	constructor() {}

	ngOnInit(): void {
    this.phases = MockData.GetPhasesCurrentGeneration.map(ClientPhase.fromJson);
    this.subjects = MockData.GetSubjectListByPhase.map(ClientSubject.fromJson);
    this.schedules = MockData.GetSchedules.map(ClientSchedule.fromJson);
	}

	getPhaseType(key) {
		return this.phaseTypes.find((p) => p.key === key).val;
	}

	onSelectSchedule(schedule){
		this.editForm = schedule;
	}

	onCancelEdit() {
		this.editForm = null;
	}
}
