import {
	trigger,
	transition,
	style,
	animate,
	state,
} from '@angular/animations';

type Direction = 'left' | 'right' | 'up' | 'down';

// tslint:disable-next-line: only-arrow-functions
export function swipeAnimation(
	direction: Direction = 'up',
	swipeAmount: number,
	duration: number
) {
	// position before entering
	let transformDir: string;
	switch (direction) {
		case 'up':
			transformDir = `translateY(${swipeAmount}px)`;
			break;
		case 'down':
			transformDir = `translateY(-${swipeAmount}px)`;
			break;
		case 'left':
			transformDir = `translateX(${swipeAmount}px)`;
			break;
		case 'right':
			transformDir = `translateX(-${swipeAmount}px)`;
			break;
	}

	return trigger('swipeAnimation', [
		state('void, hidden', style({ opacity: 0, transform: transformDir })),
		transition(':enter, :leave, shown <=> hidden', [
			animate(duration + 'ms ease-out'),
		]),

		state('*, shown', style({ opacity: 1 })),
		// transition(':leave', [animate('4000ms ease-out', style({ opacity: 0 }))]),
	]);
}

// tslint:disable-next-line: only-arrow-functions
export function faderAnimation(opacity: number, duration: number) {
	return trigger('faderAnimation', [
		state('hidden', style({ opacity: 0, 'z-index': -1 })),
		state('shown', style({ opacity })),
		transition('hidden <=> shown', animate(duration + 'ms ease-out')),
	]);
}



// Kinda fail, review later
// tslint:disable-next-line: only-arrow-functions
// export function scaleAnimation(
// 	// Scale in percent
// 	scales: { x: number; y: number; offset: number }[],
// 	anchor: string = 'top',
// 	duration: number = 500
// ) {
// 	return trigger('scaleAnimation', [
// 		state('hidden', style({ transform: 'scale(0%,0%)' })),
// 		transition( 'hidden => shown', animate( duration + 'ms ease-out', keyframes(
//       map(scales, (s) =>
//         style({ transform: `scale(${s.x}%,${s.y}%)`, offset: s.offset })
//       ).sort((a,b) => a.styles['offset'] - b.styles['offset'])))
//     ),
//     transition( 'shown => hidden', animate( duration + 'ms ease-out', keyframes(
//       map(scales, (s) =>
//         style({ transform: `scale(${s.x}%,${s.y}%)`, offset: 1 - s.offset })
//       ).sort((a,b) => a.styles['offset'] - b.styles['offset'])))
// 		),
// 	]);
// }
