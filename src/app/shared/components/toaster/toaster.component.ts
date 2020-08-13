import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Observable, interval, timer, Subject, Subscription } from 'rxjs';
import { tap, takeUntil, repeatWhen, map } from 'rxjs/operators';
import { Toast } from '../../models';
import { swipeAnimation } from '../../angular-animations';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import * as MainStateAction from '../../stores/main/main.action';
import * as fromMainState from '../../stores/main/main.reducer';

@Component({
	selector: 'rd-toaster',
	templateUrl: './toaster.component.html',
	styleUrls: ['./toaster.component.scss'],
	animations: [swipeAnimation('up', 50, 300)],
})
export class ToasterComponent implements OnInit, OnDestroy {
	public messages$: Observable<Toast[]>;

	private stop$ = new Subject<void>();
	private start$ = new Subject<void>();
	private destroyed$ = new Subject<void>();

	constructor(
		private store: Store<IAppState>,
		private actionSubject: ActionsSubject
	) {
		this.messages$ = this.store.pipe(select(fromMainState.getToastMessages));
		// Trigger decayTimer when messages[] changes
		this.messages$
			.pipe(
				takeUntil(this.destroyed$),
				map((arr) => arr.length > 0),
				tap((hasMessage) => {
					this.stop$.next();
					if (hasMessage) this.start$.next();
				})
			)
			.subscribe();

		interval(3500)
			.pipe(
				takeUntil(this.stop$),
				repeatWhen(() => this.start$),
				tap((v) =>
					this.store.dispatch(MainStateAction.RemoveMessage({ index: 0 }))
					// this.store.dispatch(
					// 	MainStateAction.ToastMessage({
					// 		message: 'adsfasdf',
					// 		messageType: 'success',
					// 	})
					// )
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
		this.destroyed$.next();
	}

	toastNewMessage(...message: Toast[]) {
		// if (this.messages.length === 0) this.start$.next();
		// this.messages.push(...message);
	}

	removeToast(index: number) {
		this.store.dispatch(MainStateAction.RemoveMessage({ index }));
	}
}
