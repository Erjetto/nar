import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { OtherService } from '../../services/new/other.service';
import { MainStateEffects, MainStateAction } from '../../store-modules';
import { flatten as _flatten, isEmpty as _isEmpty } from 'lodash';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { adjustControlsInFormArray } from '../../methods';

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
	@HostBinding('class') hostClass = 'col input-group';

  /**
   * FormArray will update fileId & fileName
   */
	@Input() filesForm: FormArray = new FormArray([]);
  @Input() multiple = false;
  fileNamesArr = ''

	constructor(protected store: Store<IAppState>, private otherService: OtherService) {}

	ngOnInit(): void {}

	get hasFile() {
		return this.filesForm.length > 0;
	}

	uploadFile(files: FileList) {
    if(files.length === 0) return;
		// this.store.dispatch(MainStateAction.UploadFile({ files: { ...files, length: files.length } }));
    this.store.dispatch(MainStateAction.InfoMessage('Uploading files...'));
    
		this.otherService.UploadFiles(files).subscribe((res) => {
			const fileIdsArr: string[] = _flatten([res.fileid]);
      const fileNamesArr: string[] = _flatten([res.filename]);
      this.fileNamesArr = fileNamesArr.join(', ');

			this.store.dispatch(
				MainStateAction.SuccessfullyMessage('uploaded file(s) : ' + fileNamesArr.join(', '))
      );
      const fileFormFactory = () => ({
        fileName: new FormControl(''), 
        fileId: new FormControl('')
      })
      adjustControlsInFormArray(this.filesForm, fileIdsArr.length, fileFormFactory)
      this.filesForm.patchValue(
        Array(fileIdsArr.length).fill(0).map((v, idx) => ({ 
          fileId: fileIdsArr[0], 
          fileName: fileNamesArr[1] 
        }))
      )
		});
	}

	removeUploadedFiles(element) {
		element.target.value = '';
	}
}
