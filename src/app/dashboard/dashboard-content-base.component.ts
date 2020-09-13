import { Subject, Observable, combineLatest } from 'rxjs';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import { MainStateAction, fromMainState, MasterStateAction } from 'src/app/shared/store-modules';

import { takeUntil, filter } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
import { Role, ClientGeneration } from '../shared/models';
import { IAppState } from '../app.reducer';
import { isEmpty } from 'lodash';

export class DashboardContentBase implements OnDestroy {
	currentGeneration$: Observable<ClientGeneration>;

	destroyed$: Subject<any> = new Subject();

	constructor(protected store: Store<IAppState>) {
    this.currentGeneration$ = this.store.pipe(select(fromMainState.getCurrentGeneration));
  }

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}
}
