import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Role, ClientUserInRoles } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { debounce, cloneDeep, filter } from 'lodash';
import { distinctUntilChanged, debounceTime, map, takeUntil, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	fromMasterState,
	MasterStateAction,
	MainStateEffects,
	MasterStateEffects,
	MainStateAction,
} from 'src/app/shared/store-modules';
import { NgForm } from '@angular/forms';

/**
 * Question:
 * - What is 'Is Guest' or GetGeneralAssistantRole is for?
 */

@Component({
	selector: 'rd-manage-user-role',
	templateUrl: './manage-user-role.component.html',
	styleUrls: ['./manage-user-role.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUserRoleComponent extends DashboardContentBase implements OnInit, OnDestroy {
	// GetRoles	GetUserInRoles	GetGeneralAssistantRole

	public roles$: Observable<Role[]>;
	public userInRoles$: Observable<ClientUserInRoles[]>;
	public userInRolesFiltered$ = new BehaviorSubject<ClientUserInRoles[]>([]);
  public searchText$ = new BehaviorSubject<string>('');
  
	public loadingFormUserInRole$ = new BehaviorSubject<boolean>(false);
	public loadingViewUserInRole$: Observable<boolean>;

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
	) {
		super(store);
	}

	ngOnInit(): void {
		//#region Bind to store
		this.userInRoles$ = this.store.pipe(select(fromMasterState.getUserInRoles));
		this.roles$ = this.store.pipe(select(fromMasterState.getRoles));
		this.loadingViewUserInRole$ = this.store.pipe(select(fromMasterState.isUserInRolesLoading));
		//#endregion

		//#region Subscribe to effects
		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.loadingFormUserInRole$.next(false));
		//#endregion

		// Filter user in roles
		combineLatest([this.userInRoles$, this.searchText$])
			.pipe(takeUntil(this.destroyed$))
			.subscribe(([users, searchText]) =>
				this.userInRolesFiltered$.next(
					users.filter((u) => `${u.UserName} ${u.Role}`.toLowerCase().indexOf(searchText) !== -1)
				)
      );
      
		this.store.dispatch(MasterStateAction.FetchRoles());
		this.store.dispatch(MasterStateAction.FetchUserInRoles());
	}

	onTypeSearch = ($text: Observable<string>) =>
		$text.pipe(
			debounceTime(500),
			distinctUntilChanged(),
			tap((text) => this.searchText$.next(text))
		);

	submitUserInRoleForm(form: NgForm) {
		const { selectRole, traineeText } = form.value;
		this.store.dispatch(
			MasterStateAction.CreateUserInRole({
				userRoleId: selectRole.RoleId,
				userRoles: traineeText.split('\n'),
			})
		);
	}

	deleteUserInRole(u: ClientUserInRoles) {}
}
