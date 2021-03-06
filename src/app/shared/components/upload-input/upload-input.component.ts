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
	HostListener,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { OtherService } from '../../services/new/other.service';
import { MainStateEffects, MainStateAction } from '../../store-modules';
import { flatten as _flatten, isEmpty as _isEmpty } from 'lodash';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { adjustControlsInFormArray, fileFormFactory, numberDelimiter } from '../../methods';
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
export class UploadInputComponent implements OnInit, OnChanges {
	@HostBinding('class') hostClass = 'col input-group';

	/**
	 * FormArray will update fileId & fileName
	 */
	@Input() filesForm: FormArray = this.fb.array([]);
	@Input() singleFileForm: FormGroup = this.fb.group({ fileId: [''], fileName: [''] });
	@Input() multiple = false;
	@Input() disabled = false;
	@Input() placeholder = 'Click or drop here to upload';
	@Input() extensions = '';

	// Size in bytes
	@Input() minSize = 0;
	@Input() maxSize = -1;

	@Output() upload = new EventEmitter<AbstractControl>(); // emit filesForm atau singleFileForm

	extensionList = [];
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

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['extensions']?.currentValue) {
			this.extensionList = changes['extensions']?.currentValue.split('|');
		}
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

	@HostListener('dragover', ['$event'])
	ondragover(evt: DragEvent) {
		evt.preventDefault();
	}

	@HostListener('drop', ['$event'])
	ondrop(evt: DragEvent) {
		evt.preventDefault();
		evt.stopPropagation();
		const files = evt.dataTransfer.files;
		if (files.length > 0) {
			this.uploadFile(files);
		}
	}

	uploadFile(files: FileList) {
		if (files.length === 0) return;
		let errorMsg = '';

		// Checks size & extension if necessary
		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < files.length; i++) {
			if (this.minSize !== 0 && files[i].size < this.minSize) {
				errorMsg = `${files[i].name} has size < ${numberDelimiter(this.minSize / 1024)} kB`;
				break;
			}
			if (this.maxSize !== -1 && files[i].size > this.maxSize) {
				errorMsg = `${files[i].name} has size > ${numberDelimiter(this.maxSize / 1024)} kB`;
				break;
			}

			if (this.extensions !== '') {
				const split = files[i].name.split('.');
				if (split.length === 1) {
					errorMsg = `${files[i].name} has no extension`;
					break;
				}
				const fileExt = split[split.length - 1];
				if (this.extensionList.indexOf(fileExt) === -1) {
					errorMsg = `${files[i].name} has invalid extension.\nOnly ${this.extensions} extension is allowed`;
					break;
				}
			}
		}
		if (errorMsg !== '') {
			this.store.dispatch(MainStateAction.FailMessage('Uploading files', errorMsg));
			return;
		}
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
