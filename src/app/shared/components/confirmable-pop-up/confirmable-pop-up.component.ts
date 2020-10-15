import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	Input,
	HostBinding,
	ElementRef,
	HostListener,
	ViewChild,
	TemplateRef,
} from '@angular/core';
import { ColorHelper } from '../../utilities/color-helper';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { isString as _isString } from 'lodash';

@Component({
	selector: 'rd-confirmable-pop-up',
	templateUrl: './confirmable-pop-up.component.html',
	styleUrls: ['./confirmable-pop-up.component.scss'],
})
export class ConfirmablePopUpComponent implements OnInit {
	@ViewChild('pop') popOver: NgbPopover;
	@Input() description: string | TemplateRef<any> = null;
	@Input() title: string | TemplateRef<any> = 'Confirmation';
  @Input() autoClose: boolean | string = 'outside';
  @Input() canConfirm = true;
	@Output() confirm = new EventEmitter();
	@Output() cancel = new EventEmitter();

	constructor(private el: ElementRef) {}

	get titleIsString() {
		return _isString(this.title);
	}
	get descriptionIsString() {
		return _isString(this.description);
	}

	ngOnInit(): void {}
}
