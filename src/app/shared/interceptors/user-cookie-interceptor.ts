import {
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpEvent,
	HttpResponse,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root',
})
export class UserCookieInterceptor implements HttpInterceptor {
	constructor(private cookieService: CookieService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		req = req.clone({
			withCredentials: true,
			// headers: req.headers.append('Cookie', 'cookie=' + this.cookieService.get('cookie')),
		});
		return next.handle(req);
		// .pipe(
		// 	tap((res) => {
		// 		if (res instanceof HttpResponse) {
		//       console.log(res);
		// 			if (res.headers.has('Set-Cookie')) {
		//         console.log(res.headers);
		// 				res.headers.getAll('Set-Cookie').forEach((h) => {
		//           const props = h.split(';').map((s) => s.trim());
		//           const [name, value] = props[0].split('=');

		//           this.cookieService.set(name, value, Number.MAX_SAFE_INTEGER, '/', '', false, 'Lax');
		// 				});
		// 			}
		// 			// this.cookieService.set(res.headers.get('Set-Cookie'))
		// 		}
		// 	})
		// );
	}
}
