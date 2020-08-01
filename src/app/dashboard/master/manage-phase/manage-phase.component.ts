import { Component, OnInit } from '@angular/core';
import { ClientPhase } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';

@Component({
	selector: 'rd-manage-phase',
	templateUrl: './manage-phase.component.html',
	styleUrls: ['./manage-phase.component.scss'],
})
export class ManagePhaseComponent implements OnInit {
	public editDateFormat = 'dd-MM-yyyy';
	public viewDateFormat = 'EEEE, MMM dd yyyy';

	public phases: ClientPhase[];
	public phaseTypes = [{ key: 'ar', val: 'Assistant Recruitment' }];

	public editForm: ClientPhase;

	constructor() {}

	ngOnInit(): void {
		this.phases = MockData.GetPhasesCurrentGeneration.map(ClientPhase.fromJson);
	}

	getPhaseType(key) {
		return this.phaseTypes.find((p) => p.key === key).val;
	}

	onSelectPhase(phase) {
		this.editForm = phase;
	}

	onCancelEdit() {
		this.editForm = null;
	}
}
