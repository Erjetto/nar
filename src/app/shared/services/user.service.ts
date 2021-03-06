import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role, User } from '../models';

/*
NOTE: May be unneeded because current user is stored in backend
*/

@Injectable({
	providedIn: 'root',
})
export class UserService {
	public currentUser: User;

	private baseUrl = environment.apiUrl + 'General.svc/';

	constructor(protected httpClient: HttpClient) {}

	public login(): Observable<any> {
		return this.httpClient.get(this.baseUrl + 'LogIn');
  }

	public tryGetUserRole(): Role {
    return Role.allRoles[0];
		// return this.currentUser?.Role;
	}

  // For SPV changing role
	public tryGetUserCurrentRole(): Role {
    return Role.allRoles[0];
		// return this.currentUser?.Role;
	}
}
