import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { fromMainState } from 'src/app/shared/store-modules';

import { OnDestroy } from '@angular/core';
import { ClientGeneration } from '../shared/models';
import { IAppState } from '../app.reducer';
import * as _ from 'lodash';

export class DashboardContentBase implements OnDestroy {
  // TODO: Remove this from derived component, use mainEffects.changeGen$ instead
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
