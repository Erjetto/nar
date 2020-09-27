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
import { IAppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { MainStateAction } from '../store-modules';
import { DateHelper } from '../utilities/date-helper';

/**
 * Converts from standard JSON date format (2020-09-27T09:11:03.049Z)
 * to old ASP Net format (/Date(12141252352)/)
 * Only works if parameter contains 'date', do it manually otherwise
 */

@Injectable({
	providedIn: 'root',
})
export class ToCSharpDateInterceptor implements HttpInterceptor {
	constructor(private store: Store<IAppState>) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const body = {...req.body};
		let prop = '';
		// tslint:disable-next-line: forin
		for (prop in req.body) {
			if (prop.toLowerCase().includes('date')) body[prop] = DateHelper.toCSharpDate(body[prop]);
		}
		req = req.clone({ body });
		return next.handle(req);
	}
}
