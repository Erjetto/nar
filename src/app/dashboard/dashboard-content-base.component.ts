import { Subject, Observable, combineLatest } from 'rxjs';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import { MainStateAction, fromMainState } from 'src/app/shared/store-modules';

import { takeUntil, filter } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
import { Role, ClientGeneration } from '../shared/models';
import { IAppState } from '../app.reducer';
import { isEmpty } from 'lodash';

export class DashboardContentBase implements OnDestroy {
	protected currentRole$: Observable<Role>;
	protected currentGeneration$: Observable<ClientGeneration>;

	protected destroyed$: Subject<any> = new Subject();

	constructor(protected store: Store<IAppState>) {
		this.currentRole$ = this.store.pipe(select(fromMainState.getCurrentRole));
		this.currentGeneration$ = this.store.pipe(select(fromMainState.getCurrentGeneration));
		combineLatest([this.currentRole$, this.currentGeneration$])
			.pipe(
				filter((values) => values.every((v) => !isEmpty(v))),
				takeUntil(this.destroyed$)
			)
			.subscribe(([role, gen]) => this.onRoleOrGenUpdate(role, gen));

		// this.actionsSubject
		// .pipe(
		//   ofType(MainStateAction.ChangeGeneration, MainStateAction.ChangeRole),
		//   takeUntil(this.destroyed$)
		// )
		// .subscribe((o) => this.reloadView());
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	onRoleOrGenUpdate(role: Role, gen: ClientGeneration) {}

	reloadView() {
		// get gen & role in MainState
	}
}
