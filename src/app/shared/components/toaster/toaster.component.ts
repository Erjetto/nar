import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil, map, repeatWhen, delay, windowToggle, mapTo, filter } from 'rxjs/operators';
import { Toast } from '../../models';
import { swipeAnimation } from '../../angular-animations';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { MainStateAction, fromMainState } from 'src/app/shared/store-modules';

@Component({
	selector: 'rd-toaster',
	templateUrl: './toaster.component.html',
	styleUrls: ['./toaster.component.scss'],
	animations: [swipeAnimation('down', 50, 300)],
})
export class ToasterComponent implements OnInit, OnDestroy {
	public messages$: Observable<Toast[]>;

	private timerOn = false;
	private stop$ = new Subject<void>();
	private start$ = new Subject<void>();
	private destroyed$ = new Subject<void>();
	counter = 100; // in percent
	decayTime = 5; // Auto remove in 5 seconds

	constructor(private store: Store<IAppState>) {}

	ngOnInit(): void {
		this.messages$ = this.store.pipe(select(fromMainState.getToastMessages));
		// Trigger decayTimer when messages[] changes
		this.messages$
			.pipe(
				map((arr) => arr.length > 0),
				takeUntil(this.destroyed$)
			)
			.subscribe((hasMessage) => {
				if (hasMessage && !this.timerOn) {
					this.start$.next();
					this.timerOn = true;
				} else if (!hasMessage) {
					this.stop$.next();
					this.timerOn = false;
				}
			});

		interval(1000 / 10) // 10 TPS => Per 0.1 detik
			.pipe(
				takeUntil(this.stop$),
				repeatWhen(() => this.start$),
				mapTo(100 / (this.decayTime * 10)), // Reduce counter based on decayTime
				filter(() => this.timerOn) // Only when timer is On
			)
			.subscribe((val) => {
				this.counter -= val;
				if (this.counter <= 0) {
					this.removeToast(0);
				}
			});

		this.stop$.next();
	}

	ngOnDestroy() {
		this.stop$.next();
		this.destroyed$.next();
	}

	togglePauseTimer(shouldContinue: boolean) {
		this.timerOn = shouldContinue;
	}

	removeToast(index: number) {
		this.store.dispatch(MainStateAction.RemoveMessage({ index }));
		this.counter = 100;
	}
}
