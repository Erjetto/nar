import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Role, Message } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

@Component({
  selector: 'rd-modify-announcement',
  templateUrl: './modify-announcement.component.html',
  styleUrls: ['./modify-announcement.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyAnnouncementComponent extends DashboardContentBase
implements OnInit, OnDestroy  {

  public memberTypes: Role[];

  public announcements: Message[];

	constructor(
		private store: Store<IAppState>,
		action: ActionsSubject,
	) {
		super(action);
	}
  
  ngOnInit(): void {
    this.announcements = MockData.GetMessage.map(Message.fromJson);
    console.log(this.announcements)
  }

}
