import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Role, Message } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { AnnouncementService } from 'src/app/shared/services/new/announcement.service';
import { Observable, BehaviorSubject } from 'rxjs';
import {
	MainStateAction,
	fromMainState,
	MasterStateEffects,
	fromMasterState,
	MasterStateAction,
	MainStateEffects,
} from 'src/app/shared/store-modules';
import { NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'rd-modify-announcement',
	templateUrl: './modify-announcement.component.html',
	styleUrls: ['./modify-announcement.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyAnnouncementComponent extends DashboardContentBase implements OnInit, OnDestroy {
	roles$: Observable<Role[]>;

	announcements$: Observable<Message[]>;
	announcementsLoading$: Observable<boolean>;

	chosenFile: File;
	loadingFormAnnouncement$ = new BehaviorSubject<boolean>(false);
	loadingViewAnnouncements$: Observable<boolean>;

	constructor(protected store: Store<IAppState>, private mainEffects: MainStateEffects) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.roles$ = this.store.pipe(select(fromMasterState.getRoles));
		this.loadingViewAnnouncements$ = this.store.pipe(select(fromMainState.getAnnouncements));
    //#endregion
    
		//#region Subscribe to effects
		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.loadingFormAnnouncement$.next(false));
		//#endregion

		this.store.dispatch(MasterStateAction.FetchRoles());
		this.store.dispatch(MainStateAction.FetchAnnouncements());
	}

	submitAnnouncementForm(form: NgForm) {
		const { selectMemberType, title, file, contentTextArea } = form.value;
		console.log(form);

		this.store.dispatch(
			MainStateAction.CreateAnnouncement({
				memberType: selectMemberType.value,
				title: title.value,
				content: contentTextArea.value,
				file: file.value,
			})
		);
	}

	uploadFile(files: FileList) {
    // Harus {...files} untuk membuang object sebelumnya yg read-only
    this.store.dispatch(MainStateAction.UploadFile({files: {...files}}))
	}
}
