import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Role, ClientUserInRoles } from 'src/app/shared/models';
import { takeUntil, tap, map, startWith } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import {
	fromMasterState,
	MasterStateAction,
	MainStateEffects,
	MasterStateEffects,
} from 'src/app/shared/store-modules';
import { NgForm, FormControl } from '@angular/forms';

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

	roles$: Observable<Role[]>;
	userInRoles$: Observable<ClientUserInRoles[]>;
	userInRolesFiltered$: Observable<ClientUserInRoles[]>;
	searchTextControl = new FormControl('');

	loadingFormUserInRole$ = new BehaviorSubject<boolean>(false);
	loadingViewUserInRole$: Observable<boolean>;

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private masterEffects: MasterStateEffects
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
		this.userInRolesFiltered$ = combineLatest([
			this.userInRoles$,
			this.searchTextControl.valueChanges.pipe(startWith('')),
		]).pipe(
			takeUntil(this.destroyed$),
			map(([users, searchText]) =>
				users.filter((u) => `${u.UserName} ${u.Role}`.toLowerCase().includes(searchText))
			)
		);

		merge(
			this.masterEffects.createUserInRole$,
			this.masterEffects.deleteUserInRole$,
			this.mainEffects.changeGen$
		)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.store.dispatch(MasterStateAction.FetchUserInRoles());
			});

		this.store.dispatch(MasterStateAction.FetchRoles());
		this.store.dispatch(MasterStateAction.FetchUserInRoles());
	}

	// onTypeSearch = ($text: Observable<string>) =>
	// 	$text.pipe(
	// 		debounceTime(500),
	// 		distinctUntilChanged(),
	// 		tap((text) => this.searchText$.next(text))
	// 	);

	submitUserInRoleForm(form: NgForm) {
		const { selectRole, trainerText } = form.value;
		this.store.dispatch(
			MasterStateAction.CreateUserInRole({
				userRoleId: selectRole.roleId,
				usernames: trainerText.split('\n'),
			})
		);
	}

	deleteUserInRole(u: ClientUserInRoles) {
		this.store.dispatch(MasterStateAction.DeleteUserInRole({ userInRoleId: u.UserInRoleId }));
	}
}
