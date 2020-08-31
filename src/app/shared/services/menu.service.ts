import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { cloneDeep, filter } from 'lodash';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root',
})
export class MenuService {
	public currentRole = 0;
	public currentMenus: Route[] = [];
	public dashboardRoute: Route[];

	private menuFilter = (r: Route) => r.data?.name && this.isPermitted(r);

	constructor(private userService: UserService, private router: Router) {
		// Get dashboard menus using isRootMenu data
		this.dashboardRoute = this.router.config.find(
			(route) => route.data?.isRootMenu === true
		)?.children;
	}

	public getMenuForRole(role: number): Route[] {
		// if (role === this.currentRole) return this.currentMenus;
		// console.log(this.dashboardRoute);

		this.currentRole = role;
		this.currentMenus = this.filterMenu(cloneDeep(this.dashboardRoute));

		return this.currentMenus;
	}

	public isPermitted(route: Route) {
		return (
			route.data?.roles &&
			this.userService.tryGetUserRole()?.is(route.data.roles)
		);
	}

	filterMenu(routeArray: Route[]): Route[] {
		return filter(routeArray, (route) => {
			if (route.children)
				route.children = route.children.filter(
					(r) => r.data?.name && this.isPermitted(r)
				);
			return route.children?.length > 0 || this.isPermitted(route);
		});
	}
}
