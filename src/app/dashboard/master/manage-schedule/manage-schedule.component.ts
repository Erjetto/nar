import { Component, OnInit } from '@angular/core';
import { ClientPhase, ClientSubject, ClientSchedule, ClientTrainee } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { throwIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'rd-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.scss']
})
export class ManageScheduleComponent implements OnInit {

  public viewDateFormat = 'EEEE, dd MMM yyyy';

  public traineeInSchedule: ClientTrainee[];

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

    this.traineeInSchedule = MockData.GetTraineesBySchedule.map(ClientTrainee.fromJson);
	}

	getPhaseType(key) {
		return this.phaseTypes.find((p) => p.key === key).val;
	}

	onDeleteTrainee(trainee){}
  
	onSelectSchedule(schedule){
		this.editForm = schedule;
	}

	onCancelEdit() {
		this.editForm = null;
	}
}
