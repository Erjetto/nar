import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	OnDestroy,
	ViewChild,
	ElementRef,
} from '@angular/core';
import { Message } from 'src/app/shared/models';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import {
	MainStateAction,
	fromMainState,
	fromMasterState,
	MainStateEffects,
} from 'src/app/shared/store-modules';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil, filter } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
	selector: 'rd-modify-announcement',
	templateUrl: './modify-announcement.component.html',
	styleUrls: ['./modify-announcement.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyAnnouncementComponent extends DashboardContentBase implements OnInit, OnDestroy {
	@ViewChild('fileUploader') uploader: ElementRef;

	announcementForm = this.fb.group({
		messageId: [''],
		memberType: ['ar', Validators.required],
		title: ['', Validators.required],
		note: ['', Validators.required],
		fileId: [''],
		fileName: [''],
	});

	phaseTypes$: Observable<{ key: string; val: string }>;

	announcements$: Observable<Message[]>;

	uploadedFiles$: Observable<{ fileid: string; filename: string }[]>;
	uploadedFileId: string; // NOTE: Utk sekarang announcement hanya upload 1 file saja
	loadingFormAnnouncement$ = new BehaviorSubject<boolean>(false);
	loadingViewAnnouncements$: Observable<boolean>;

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.phaseTypes$ = this.store.pipe(select(fromMasterState.getPhaseTypes));
		this.announcements$ = this.store.pipe(select(fromMainState.getAnnouncements));
		this.loadingViewAnnouncements$ = this.store.pipe(select(fromMainState.isAnnouncementsLoading));
		this.uploadedFiles$ = this.store.pipe(select(fromMainState.getUploadedFiles));

		this.uploadedFiles$
			.pipe(
				filter((v) => !_.isEmpty(v)),
				takeUntil(this.destroyed$)
			)
			.subscribe((files) => {
        this.announcementForm.get('fileId').setValue(files[0].fileid)
        this.announcementForm.get('fileName').setValue(files[0].filename)
      });
		//#endregion

		//#region Subscribe to effects
		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.loadingFormAnnouncement$.next(false));

		// Reload when crud or change gen
		merge(
			this.mainEffects.createAnnouncement$,
			this.mainEffects.updateAnnouncement$,
			this.mainEffects.deleteAnnouncement$,
			this.mainEffects.changeGen$
		)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.store.dispatch(MainStateAction.FetchAnnouncements());
				this.announcementForm.reset({ memberType: 'ar' });
			});
		//#endregion

		this.store.dispatch(MainStateAction.FetchAnnouncements());
	}

	get isEditing() {
		return !_.isEmpty(this.announcementForm.get('messageId').value);
	}
	get hasFile() {
		return !_.isEmpty(this.announcementForm.get('fileId').value);
	}

	submitAnnouncementForm() {
		if (this.isEditing)
			this.store.dispatch(
				MainStateAction.UpdateAnnouncement({
					...this.announcementForm.value,
					mtype: this.announcementForm.value.memberType,
				})
			);
    else this.store.dispatch(MainStateAction.CreateAnnouncement(this.announcementForm.value));
    this.loadingFormAnnouncement$.next(true);
	}

	deleteAnnouncement() {
    this.store.dispatch(MainStateAction.DeleteAnnouncement(this.announcementForm.value));
    this.loadingFormAnnouncement$.next(true);
	}

	selectAnnouncement(ann: Message) {
		this.announcementForm.setValue({
			messageId: ann.MessageId,
			memberType: ann.MemberType,
			title: ann.Title,
			note: ann.Note,
			fileId: ann.FileId !== '00000000-0000-0000-0000-000000000000' ? ann.FileId : null,
			fileName: ann.FileName,
    });
	}

	removeUploadedFiles() {
		// If fileId is null, then it will use different method
		this.uploader.nativeElement.value = '';
		this.store.dispatch(MainStateAction.RemoveUploadedFiles());
		this.announcementForm.get('fileId').setValue(null);
	}

	uploadFile(files: FileList) {
		// Harus {...files} untuk membuang object sebelumnya yg read-only
    this.store.dispatch(MainStateAction.UploadFile({ files: { ...files, length: files.length } }));
    this.loadingFormAnnouncement$.next(true);
	}
}
