import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientSubject, ClientPhase } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { clone } from 'lodash';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { LeaderService } from 'src/app/shared/services/new/leader.service';
import { GeneralService } from 'src/app/shared/services/new/general.service';

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
  
	public currentPhase: ClientPhase;
	public editForm: ClientSubject;

	constructor(
    private leaderService: LeaderService,
    private generalService: GeneralService,
		private store: Store<IAppState>,
		action: ActionsSubject,
	) {
		super(action);
	}
	ngOnInit(): void {
		this.phases = MockData.GetPhasesCurrentGeneration.map(ClientPhase.fromJson);
		this.subjects = MockData.GetSubjectListByPhase.map(ClientSubject.fromJson);
  }
  
  // refreshPhases(){
  //   this.generalService.GetPhasesCurrentGeneration().subscribe( res => {
  //     this.phases = res;
  //     this.currentPhase = res[0];
  //     this.refreshSubject();
  //   })
  // }

  // refreshSubject(){
  //   this.generalService.GetSubjects(this.currentPhase.PhaseId).subscribe( res => {
      
  //   })
  // }

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
    this.currentSize = this.size[0];
	}

	onCancelEdit() {
		this.editForm = null;
	}
}
