import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { MainStateEffects, MainStateAction } from '../../store-modules';

/*
NOTE:
- The best example is from ModifyAnnouncement & ModifyInterviewMaterial
- Try copy from one of those
*/

@Component({
	selector: 'rd-upload-input',
	templateUrl: './upload-input.component.html',
	styleUrls: ['./upload-input.component.scss'],
})
export class UploadInputComponent implements OnInit {
	@Input() files: string[];
	@Input() multiple = false;
  @Output() upload = new EventEmitter<string>();

	constructor(protected store: Store<IAppState>, private mainEffects: MainStateEffects) {}

	ngOnInit(): void {}

	get hasFile() {
		return this.files.length > 0;
	}

	uploadFile(files: FileList) {
		this.store.dispatch(MainStateAction.UploadFile({ files: { ...files, length: files.length } }));
  }

	removeUploadedFiles(element) {
		element.target.value = '';
	}
}
