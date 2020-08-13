import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import {
	trigger,
	query,
	style,
	animate,
	keyframes,
	state,
	transition,
} from '@angular/animations';
import { Observable, interval, timer, Subject, Subscription } from 'rxjs';
import { tap, takeUntil, repeatWhen } from 'rxjs/operators';
import { Toast } from '../../models';
import { swipeAnimation } from '../../angular-animations';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import * as MainStateAction from '../../stores/main/main.action';
import * as fromMainState from '../../stores/main/main.reducer';

@Component({
	selector: 'rd-toaster',
	templateUrl: './toaster.component.html',
	styleUrls: ['./toaster.component.scss'],
	animations: [
		// trigger('toastAnimation', [
		//   query('.toast:enter', style({opacity: 0})),
		//   query('.toast:enter', animate('300ms ease-out', keyframes([
		//     style({transform:'translateY()', offset:0}),
		//     style({transform:'translateY()', offset:0}),
		//   ])))
		// ])
		swipeAnimation('up', 50, 300),
	],
})
export class ToasterComponent implements OnInit, OnDestroy {

	public messages$: Observable<Toast[]>;
	public messages: Toast[] = [
		new Toast('info', 'Lorem ipsum dolor sit amet'),
		// new Toast('success', 'Fetch data success 2'),
		// new Toast('warning', 'Fetch data failed 3'),
		// new Toast('danger', 'Fetch data failed 4'),
	];

	private decayTimer$: Subscription;
	private stop$ = new Subject<void>();
	private start$ = new Subject<void>();

	constructor(private store: Store<IAppState>) {
		this.messages$ = this.store.pipe(select(fromMainState.getToastMessages));

		this.decayTimer$ = interval(3500)
			.pipe(
				takeUntil(this.stop$),
				repeatWhen(() => this.start$),
				tap((v) =>
					this.store.dispatch(
						MainStateAction.ToastMessage({
							messageType: 'info',
							message: 'Hello World! ' + v,
						})
					)
				)
			)
			.subscribe();

		// this.decayTimer$.subscribe((val) => {
		//   this.messages.pop();
		//   if (this.messages.length === 0) this.stop$.next();
		// })
	}

	ngOnInit(): void {}

	ngOnDestroy() {
		this.stop$.next();
		this.stop$.complete();
	}

	toastNewMessage(...message: Toast[]) {
		// if (this.messages.length === 0) this.start$.next();
		// this.messages.push(...message);
	}

	removeToast(index: number) {
		this.store.dispatch(MainStateAction.RemoveMessage({index}));
		// this.messages.splice(index, 1);
		this.stop$.next();
		this.start$.next();
	}
}
