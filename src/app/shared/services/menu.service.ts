import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { isEmpty as _isEmpty, cloneDeep as _cloneDeep, filter as _filter} from 'lodash';
import { UserService } from './user.service';
import { Role } from '../models';
import { RoleFlags } from '../constants/role.constant';

@Injectable({
	providedIn: 'root',
})
export class MenuService {
	public currentRole: Role = Role.from('Guest');
	public currentMenus: Route[] = [];
	public dashboardRoute: Route[];

	constructor(private userService: UserService, private router: Router) {
		// Get dashboard menus using isRootMenu data
		this.dashboardRoute = this.router.config.find(
			(route) => route.data?.isRootMenu === true
		)?.children;
	}

	public getMenuForRole(role: number | string | Role): Route[] {
    if (role === this.currentRole) return this.currentMenus;
		if (role instanceof Role) this.currentRole = role;
		else this.currentRole = Role.from(role);

		this.currentMenus = this.filterMenu(_cloneDeep(this.dashboardRoute));

		return this.currentMenus;
	}

	private menuFilter  = (r: Route) => r.data?.name && this.isPermitted(r); // If has name
	private isPermitted = (r: Route) => r.data?.roles && this.currentRole.is(r.data.roles);
	
	// Only suitable for 2 level menu
	private filterMenu(routeArray: Route[]): Route[] {
		return _filter(routeArray, (route) => {
			if (route.children) route.children = route.children.filter(this.menuFilter);
			return route.children?.length > 0 || this.isPermitted(route);
		});
	}
}
