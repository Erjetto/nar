import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	OnDestroy,
} from '@angular/core';
import { Role, Message } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { AnnouncementService } from 'src/app/shared/services/new/announcement.service';
import { Observable } from 'rxjs';
import { MainStateAction, fromMainState } from 'src/app/shared/store-modules';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'rd-modify-announcement',
	templateUrl: './modify-announcement.component.html',
	styleUrls: ['./modify-announcement.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyAnnouncementComponent extends DashboardContentBase
	implements OnInit, OnDestroy {
	public memberTypes: Role[];

	public announcements$: Observable<Message[]>;
  public announcementsLoading$: Observable<boolean>;

  public chosenFile : File;

	constructor(
		protected store: Store<IAppState>,
		private announcementService: AnnouncementService,
	) {
		super(store);
	}

	ngOnInit(): void {
		this.memberTypes = Role.allRoles;
		this.announcements$ = this.store.pipe(
			select(fromMainState.getAnnouncements)
		);

		this.store.dispatch(MainStateAction.FetchAnnouncements());
	}

	onSubmitForm(form: NgForm) {
		const { selectMemberType, title, file, contentTextArea } = form.value;
    console.log(form);
    
    // Change file here?

		// this.store.dispatch(
		// 	MainStateAction.CreateAnnouncement({
		// 		memberType: selectMemberType.value,
		// 		title: title.value,
		// 		content: contentTextArea.value,
		// 		file: file.value,
		// 	})
		// );
  }
  
  getFile(event: Event){
    const files = event.target['files'];
    console.log(files);
    
  }
}
