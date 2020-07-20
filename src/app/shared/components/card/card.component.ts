import {
	Component,
	OnInit,
	HostBinding,
	Input,
	ViewChild,
	ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
	trigger,
	transition,
	style,
	animate,
	state,
	keyframes,
} from '@angular/animations';
import { expand } from 'rxjs/operators';
@Component({
	selector: 'rd-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	animations: [
		trigger('dropdown', [
			// state('void', style({height: '46px'})),
			// transition(':enter, :leave', [ // void <=> *
			// 	animate(500), // , style({ opacity: 1 })), -> angular already know
			// ]),
			// state('void') -> Before element enters DOM
			// state('*') -> Element is in DOM
			// ex: void => * -> Animation for entering/creating (:create)
			// * => void -> Animation for removing element (:leave)
			state(
				'collapse',
				style({
					opacity: 0,
					'padding-top': 0,
					'padding-bottom': 0,
					height: 0,
					'overflow-y': 'hidden',
				})
			),
			transition(
				'expand => collapse',
				animate(
					'500ms ease-out',
					keyframes([
						style({ opacity: 0, offset: 0.3 }),
						style({
							'padding-top': 0,
							'padding-bottom': 0,
							height: 0,
							offset: 0.9,
						}),
						style({
							'overflow-y': 'hidden',
							offset: 1,
						}),
					])
				)
			),
			transition('collapse => expand', animate('300ms ease-out')),
		]),
	],
})
export class CardComponent implements OnInit, OnChanges {
	@ViewChild('content') contentElement: ElementRef;

	// tslint:disable-next-line: no-input-rename
	@Input('title') cardTitle = '';

	@HostBinding('class.card-collapsible') @Input() collapsible = false;

	@Input() expanded = true;
	public dropdownState = 'expand';

	constructor() {}

	ngOnInit(): void {
    this.dropdownState = this.expanded ? 'expand' : 'collapse';
	}

  ngOnChanges(changes: SimpleChanges) {
    if('expanded' in changes){
      this.dropdownState = this.expanded ? 'expand' : 'collapse';
    }
  }

	toggleMinimize() {
		this.dropdownState =
			this.dropdownState === 'expand' ? 'collapse' : 'expand';
  }
}
