import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { cloneDeep, filter } from 'lodash';
import { routes } from '../../dashboard/dashboard-routing.module';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root',
})
export class MenuService {
	public currentRole = 0;
  public currentMenus: Route[] = [];
  
  private menuFilter = (r: Route) => r.data.name && this.isPermitted(r);

	constructor(private userService: UserService) {}

	public getMenuForRole(role: number): Route[] {
		if (role === this.currentRole) return this.currentMenus;

		this.currentRole = role;
		this.currentMenus = this.filterMenu(cloneDeep(routes), this.menuFilter);

		return this.currentMenus;
	}

	public isPermitted(route: Route) {
		return (
			route.data.roles &&
			(this.userService.tryGetUserRole() & route.data.roles) !== 0
		);
	}

	filterMenu(
		routeArray: Route[],
		isMenuShown: (route: Route) => boolean
	): Route[] {
		return filter(routeArray, (route) => {
			if (route.children)
				route.children = this.filterMenu(route.children, isMenuShown);
			return isMenuShown(route);
		});
	}
}
