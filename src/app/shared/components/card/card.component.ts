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
import { interval } from 'rxjs';
import { first, take } from 'rxjs/operators';
import {
	swipeAnimation,
	faderAnimation,
	scaleAnimation,
} from '../../angular-animations';

@Component({
	selector: 'rd-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	animations: [
		trigger('dropdown', [
			// state('void', style({height: '46px'})),
			// transition(':enter, :leave', [ //  void <=> *
			// 	animate(500), // , style({ opacity: 1 })), -> angular already know so it's removable
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
					])
				)
			),
			transition(
				'collapse => expand',
				animate(
					'400ms ease-out',
					keyframes([
						style({ 'overflow-y': 'unset', offset: 0 }),
						style({
							'padding-top': '*',
							'padding-bottom': '*',
							height: '*',
							opacity: 0,
							offset: 0.6,
						}),
						style({ opacity: 1, offset: 0.9 }),
					])
				)
			),
			// transition('collapse => expand', animate('300ms ease-out')),
		]),
		swipeAnimation('down', 15, 200),
		faderAnimation(0.8, 300),
		// scaleAnimation([
		// 	{ x: 0, y: 0, offset: 0 },
		// 	{ x: 100, y: 0, offset: 0.5 },
		// 	{ x: 100, y: 100, offset: 1 },
		// ]),
		// trigger('scaleAnimation', [
		// 	state('shown', style({ 'transform-origin': 'top' })),
		// 	state('hidden', style({ transform: 'scaleY(0)', width: 0, 'transform-origin': 'top' })),
		// 	transition(
		// 		'hidden => shown',
		// 		animate(
		// 			500 + 'ms ease-out',
		// 			keyframes([
		// 				style({ transform: 'scaleY(0)', width: 0, offset: 0 }),
		// 				style({ transform: 'scaleY(0)', width: '*', offset: 0.5 }),
		// 				style({ transform: 'scaleY(1)', width: '*', offset: 1 }),
		// 			])
		// 		)
		// 	),
		// 	transition(
		// 		'shown => hidden',
		// 		animate(
		// 			500 + 'ms ease-out',
		// 			keyframes([
		// 				style({ transform: 'scaleY(1)', width: '*', 'overflow-x':'hidden', offset: 0 }),
		// 				style({ transform: 'scaleY(1)', width: '*', offset: 0.5 }),
		// 				style({ transform: 'scaleY(1)', width: 0, offset: 1 }),
		// 			])
		// 		)
		// 	),
		// ]),
	],
})
export class CardComponent implements OnInit {
	// tslint:disable-next-line: no-input-rename
	// @Input('hiddable') doesScale = false;
	// @HostBinding('@scaleAnimation') scaleState = 'shown';

	@ViewChild('content')
	contentElement: ElementRef;

	// tslint:disable-next-line: no-input-rename
	@Input('title') cardTitle = '';

	@HostBinding('class.card-collapsible') @Input() collapsible = true;

	@Input() expanded = true;
	@Input() isLoading = true;
	// public dropdownState = 'expand';

	constructor() {}

	ngOnInit(): void {
		// this.dropdownState = this.expanded ? 'expand' : 'collapse';
		interval(1500)
			.pipe(take(10))
			.subscribe((val) => {
				this.isLoading = !this.isLoading;
				// this.doesScale = !this.doesScale;
				// if (this.doesScale)
					// this.scaleState = this.scaleState === 'shown' ? 'hidden' : 'shown';
			});
	}

	toggleMinimize() {
		if (this.collapsible) this.expanded = !this.expanded;
	}
}
