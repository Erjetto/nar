import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { isNil } from 'lodash';

@Directive({
	selector: 'a[rdExternalUrl]',
})
export class ExternalUrlDirective {
	constructor(private el: ElementRef, private router: Router) {}

	@HostListener('click', ['$event'])
	clicked(event: Event) {
		const url = this.el.nativeElement.href;
		if (isNil(url)) {
			return;
		}

    window.open(url, '_blank');
    
		event.preventDefault();
	}
}
