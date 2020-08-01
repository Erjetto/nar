import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	Input,
	HostBinding,
	ElementRef,
  HostListener,
} from '@angular/core';
import { ColorHelper } from '../../utilities/color-helper';

@Component({
	selector: 'rd-confirmable-button',
	templateUrl: './confirmable-button.component.html',
	styleUrls: ['./confirmable-button.component.scss'],
})
export class ConfirmableButtonComponent implements OnInit {
	@Input() color = '';
	@Output() confirm = new EventEmitter();
	public isConfirming = false;

	constructor(private el: ElementRef) {}

	ngOnInit(): void {
		this.el.nativeElement.style.backgroundColor = this.color;
    this.el.nativeElement.style.borderColor = this.color;
    
    // rdContrastText cannot be bound to host, so co-pasted it
		if (ColorHelper.isHexContrastToWhite(this.color))
      this.el.nativeElement.classList.add('text-white');
    else 
      this.el.nativeElement.classList.add('text-dark');
  }
  
}
