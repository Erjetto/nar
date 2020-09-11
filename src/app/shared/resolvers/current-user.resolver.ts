import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { User } from 'src/app/shared/models';
import { UserService } from '../services/user.service';
import { GeneralService } from '../services/new/general.service';

// Note: Can be used to refresh the login time
// Can't be used to get current user for Auth Guard because Auth Guard activates first

@Injectable({providedIn: 'root'})
export class CurrentUserResolver implements Resolve<User> {
  constructor(private service: GeneralService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<User> {
    return this.service.GetCurrentUser().toPromise();
  }
}
