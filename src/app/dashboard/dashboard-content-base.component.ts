import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { fromMainState } from 'src/app/shared/store-modules';

import { OnDestroy } from '@angular/core';
import { ClientGeneration, User } from '../shared/models';
import { IAppState } from '../app.reducer';

export class DashboardContentBase implements OnDestroy {
  // TODO: Remove this from derived component, use mainEffects.changeGen$ instead
	currentUser$: Observable<User>;
	currentGeneration$: Observable<ClientGeneration>;

	destroyed$: Subject<any> = new Subject();

	constructor(protected store: Store<IAppState>) {
    this.currentUser$ = this.store.pipe(select(fromMainState.getCurrentUser));
    this.currentGeneration$ = this.store.pipe(select(fromMainState.getCurrentGeneration));
  }

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
  }
  
  
}
