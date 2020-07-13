import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoleConstant } from '../../shared/constants/role.constant';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	public currentUser: any;

	private baseUrl = environment.apiUrl + 'General.svc/';

	constructor(protected httpClient: HttpClient) {}

	public login(): Observable<any> {
		return this.httpClient.get(this.baseUrl + 'LogIn');
  }

	public tryGetUserRole(): number {
		return this.currentUser?.role ?? 0;
	}
}
