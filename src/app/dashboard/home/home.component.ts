import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

import { DashboardContentBase } from '../dashboard-content-base.component';
import { isEmpty as _isEmpty } from 'lodash';

@Component({
	selector: 'rd-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends DashboardContentBase implements OnInit {
	constructor(protected store: Store<IAppState>) {
		super(store);
	}

	ngOnInit() {}
}
