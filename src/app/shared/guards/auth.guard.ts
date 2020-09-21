import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	RouterStateSnapshot,
	UrlTree,
	Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { GeneralService } from '../services/new/general.service';
import { map, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { MainStateAction, fromMainState } from '../store-modules';
import { User } from '../models';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(
		private router: Router,
		private store: Store<IAppState>,
		private generalService: GeneralService
	) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.store.pipe(
      select(fromMainState.getCurrentUser),
      switchMap(user => user ? of(user) : this.generalService.GetCurrentUser()),
			map((user: User) => {
				if (user) {
					this.store.dispatch(MainStateAction.SetCurrentUser({ user }));
					return true;
				} else {
					this.router.navigateByUrl('/login');
					return false;
				}
			})
		);
		// return this.generalService.GetCurrentUser().pipe(
		// 	map((user) => {
		//     console.log('AuthGuard: Current user is ', user);
		// 		if (!!user) {
		//       this.store.dispatch(MainStateAction.SetCurrentUser({ user }));
		//       return true;
		//     } else {
		//       this.router.navigateByUrl('/login');
		//       return false;
		//     }
		// 	})
		// );
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this.canActivate(childRoute, state);
	}
}
