import {
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpEvent,
	HttpResponse,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IAppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { MainStateAction } from '../store-modules';

@Injectable({
	providedIn: 'root',
})
export class StoreDispatcherInterceptor implements HttpInterceptor {
	constructor(private store: Store<IAppState>) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
      tap(() => this.store.dispatch(MainStateAction.RequestSuccess())),
      
			catchError((error: HttpErrorResponse) => {
        console.log(error);
				this.store.dispatch(MainStateAction.RequestFailedMessage(error));
        this.store.dispatch(MainStateAction.RequestFailed());
        return throwError(error);
      }),
      
			finalize(() => this.store.dispatch(MainStateAction.AfterRequest()))
		);
	}
}
