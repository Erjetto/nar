import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

@Component({
  selector: 'rd-manage-attendance-ip-list',
  templateUrl: './manage-attendance-ip-list.component.html',
  styleUrls: ['./manage-attendance-ip-list.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageAttendanceIpListComponent extends DashboardContentBase
implements OnInit, OnDestroy  {

  ipList: string[] = [];

	constructor(
		protected store: Store<IAppState>,
	) {
		super(store);
	}

  ngOnInit(): void {
  }

}
