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
} from '@angular/core';
import { ColorHelper } from '../../utilities/color-helper';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'rd-confirmable-button',
	templateUrl: './confirmable-button.component.html',
	styleUrls: ['./confirmable-button.component.scss'],
})
export class ConfirmableButtonComponent implements OnInit {
	@ViewChild('pop') popOver: NgbPopover;
  @Input() description = '';
  @Input() canConfirm = true;
	@Output() confirm = new EventEmitter();
	@Output() cancel = new EventEmitter();
	public isConfirming = false;

	constructor(private el: ElementRef) {}

	ngOnInit(): void {}
}
