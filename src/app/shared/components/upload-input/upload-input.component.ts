import { merge, Observable } from 'rxjs';
import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	HostBinding,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { OtherService } from '../../services/new/other.service';
import { MainStateEffects, MainStateAction } from '../../store-modules';
import { flatten as _flatten, isEmpty as _isEmpty } from 'lodash';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { adjustControlsInFormArray, fileFormFactory } from '../../methods';
import { takeUntil } from 'rxjs/operators';

/*
NOTE:
- The best example is from ModifyAnnouncement & ModifyInterviewMaterial
- Try copy from one of those
*/

@Component({
	selector: 'rd-upload-input',
	templateUrl: './upload-input.component.html',
	styleUrls: ['./upload-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadInputComponent implements OnInit {
	@HostBinding('class') hostClass = 'col input-group';

	/**
	 * FormArray will update fileId & fileName
	 */
	@Input() filesForm: FormArray = this.fb.array([]);
	@Input() singleFileForm: FormGroup = this.fb.group({ fileId: [''], fileName: [''] });
	@Input() multiple = false;
	@Output() upload = new EventEmitter<AbstractControl>(); // emit filesForm atau singleFileForm

	constructor(
		protected store: Store<IAppState>,
		private otherService: OtherService,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		// Detect changes when form is updated
		merge(this.filesForm.valueChanges, this.singleFileForm.valueChanges).subscribe(() =>
			this.cdr.markForCheck()
		);
	}

	get hasFile() {
		if (this.multiple)
			return this.filesForm.length > 0 && !_isEmpty(this.filesForm.value[0].fileId);
		else return !_isEmpty(this.singleFileForm.value.fileId);
	}

	get fileNames() {
		if (this.multiple) return this.filesForm.value.map((v) => v.fileName).join(', ');
		else return this.singleFileForm.value.fileName;
	}

	uploadFile(files: FileList) {
		if (files.length === 0) return;
		// this.store.dispatch(MainStateAction.UploadFile({ files: { ...files, length: files.length } }));
		this.store.dispatch(MainStateAction.InfoMessage('Uploading files...'));

		this.otherService.UploadFiles(files).subscribe((res) => {
			// Validasis upload success?

			const fileIdsArr: string[] = _flatten([res.fileid]);
			const fileNamesArr: string[] = _flatten([res.filename]);

			this.store.dispatch(
				MainStateAction.SuccessfullyMessage('uploaded file(s) : ' + fileNamesArr.join(', '))
			);
			if (this.multiple) {
				adjustControlsInFormArray(this.filesForm, fileIdsArr.length, fileFormFactory);
				this.filesForm.patchValue(
					Array(fileIdsArr.length)
						.fill(0)
						.map((v, idx) => ({
							fileId: fileIdsArr[idx],
							fileName: fileNamesArr[idx],
						}))
				);
				this.upload.emit(this.filesForm);
			} else {
				this.singleFileForm.patchValue({
					fileId: fileIdsArr[0],
					fileName: fileNamesArr[0],
				});
				this.upload.emit(this.singleFileForm);
			}
		});
	}

	downloadFile() {
		if (this.multiple)
			this.filesForm.value.forEach((el) => {
				this.store.dispatch(MainStateAction.DownloadFile({ fileId: el.fileId }));
			});
		else
			this.store.dispatch(
				MainStateAction.DownloadFile({ fileId: this.singleFileForm.value.fileId })
			);
	}

	removeUploadedFiles(element) {
		element.target.value = '';
		if (this.multiple) adjustControlsInFormArray(this.filesForm, 0);
		else this.singleFileForm.reset();
	}
}
