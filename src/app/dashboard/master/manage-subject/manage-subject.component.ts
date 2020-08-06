import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientSubject, ClientPhase } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { clone } from 'lodash';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

@Component({
	selector: 'rd-manage-subject',
	templateUrl: './manage-subject.component.html',
	styleUrls: ['./manage-subject.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageSubjectComponent extends DashboardContentBase
implements OnInit, OnDestroy  {
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

	constructor(
		private store: Store<IAppState>,
		action: ActionsSubject,
	) {
		super(action);
	}
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
