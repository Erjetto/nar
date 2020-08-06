import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Role, ClientUserInRoles } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { debounce, cloneDeep, filter } from 'lodash';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

@Component({
	selector: 'rd-manage-user-role',
	templateUrl: './manage-user-role.component.html',
	styleUrls: ['./manage-user-role.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUserRoleComponent extends DashboardContentBase
implements OnInit, OnDestroy  {
	// GetRoles	GetUserInRoles	GetGeneralAssistantRole

	public roles: Role[];

	public userInRoles: ClientUserInRoles[];

	public userInRolesFiltered: ClientUserInRoles[];
	public searchText = '';

	constructor(
		private store: Store<IAppState>,
		action: ActionsSubject,
	) {
		super(action);
	}
  
	ngOnInit(): void {
    this.userInRoles = MockData.GetUserInRoles.map(ClientUserInRoles.fromJson);
    this.userInRolesFiltered = this.userInRoles;
    this.roles = MockData.GetRoles.map(Role.fromJson);

  }

	onTypeSearch = ($text: Observable<string>) =>
		$text.pipe(
			debounceTime(500),
			distinctUntilChanged(),
			map((text) => {
				this.searchText = text;
				text = text.toLowerCase();

				let filteredUsers = cloneDeep(this.userInRoles);
				if (text !== '')
					filteredUsers = filteredUsers.filter(
						(u) =>
							`${u.UserName} ${u.Role}`
								.toLowerCase()
								.indexOf(this.searchText) !== -1
					);

				this.userInRolesFiltered = filteredUsers;
			})
		);
}
