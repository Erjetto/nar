import { Component, OnInit } from '@angular/core';
import { ClientSubject, ClientPhase } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { clone } from 'lodash';

@Component({
	selector: 'rd-manage-subject',
	templateUrl: './manage-subject.component.html',
	styleUrls: ['./manage-subject.component.scss'],
})
export class ManageSubjectComponent implements OnInit {
	public subjects: ClientSubject[];

	public size = [
		{ key: 'byte', val: 1 },
		{ key: 'kB', val: 1024 },
		{ key: 'MB', val: 1024 * 1024 },
		{ key: 'GB', val: 1024 * 1024 * 1024 },
	];
	public currentSize = this.size[0];

	public phases: ClientPhase[];
	public phaseTypes = [{ key: 'ar', val: 'Assistant Recruitment' }];

	public editForm: ClientSubject;

	constructor() {}

	ngOnInit(): void {
		this.phases = MockData.GetPhasesCurrentGeneration.map(ClientPhase.fromJson);
		this.subjects = MockData.GetSubjectListByPhase.map(ClientSubject.fromJson);
	}

	convertFileSize($event) {
		// val
		if (!this.editForm) return;
		this.editForm.MaxFileSize =
			(this.editForm.MaxFileSize * this.currentSize.val) / $event.val;

		if (this.editForm.MaxFileSize < 1) this.editForm.MaxFileSize = 1;

		this.currentSize = $event;
	}

	onSelectSubject(subject) {
		this.editForm = clone(subject);
	}

	onCancelEdit() {
		this.editForm = null;
	}
}
