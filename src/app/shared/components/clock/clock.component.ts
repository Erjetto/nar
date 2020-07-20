import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, timer, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'rd-clock',
	template: '<span>{{timer$ | async | date: dateFormat}}</span>',
	styles: [''],
})
export class ClockComponent {
	public dateFormat = 'EEE MMM dd yyyy - hh:mm:ss';
	public timer$: Observable<Date> = timer(0, 1000).pipe(map((o) => new Date()));

	constructor() {}
}
