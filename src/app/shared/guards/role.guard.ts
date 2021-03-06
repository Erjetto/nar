import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	RouterStateSnapshot,
	UrlSegment,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

// Note: An old file, not reviewed yet
// Is this even necessary?

@Injectable({
	providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanActivateChild {
	constructor(private userService: UserService) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return (
			next.data?.roles &&
			this.userService.tryGetUserRole().is(next.data.roles)
		);
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| boolean
		| UrlTree
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree> {
		return this.canActivate(childRoute, state);
	}
}
