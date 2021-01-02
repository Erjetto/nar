import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { fromMainState } from 'src/app/shared/store-modules';

import { OnDestroy } from '@angular/core';
import { ClientGeneration, User } from '../shared/models';
import { IAppState } from '../app.reducer';
import { takeUntil } from 'rxjs/operators';

export class DashboardContentBase implements OnDestroy {
	
	currentUser$ = new BehaviorSubject<User>(null);
	currentGeneration$ = new BehaviorSubject<ClientGeneration>(null);

	destroyed$: Subject<any> = new Subject();

	constructor(protected store: Store<IAppState>) {
		this.store.pipe(
      select(fromMainState.getCurrentUser),
      takeUntil(this.destroyed$)
    ).subscribe(this.currentUser$);
    
		this.store.pipe(
      select(fromMainState.getCurrentGeneration),
      takeUntil(this.destroyed$)
    ).subscribe(this.currentGeneration$);
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}
}
