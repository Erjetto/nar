import {
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpEvent,
	HttpResponse,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { MainStateAction } from '../store-modules';

@Injectable({
	providedIn: 'root',
})
export class AfterRequestInterceptor implements HttpInterceptor {
	constructor(private store: Store<IAppState>) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next
			.handle(req)
			.pipe(finalize(() => this.store.dispatch(MainStateAction.AfterRequest())));
	}
}
