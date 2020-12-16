import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, COMPILER_OPTIONS } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { LoginComponent } from 'src/app/login/login.component';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';

import { AppRoutingModule } from './app-routing.module';
import { metaReducers } from 'src/app/app.reducer';
import { SharedModule } from 'src/app/shared/shared.module';

import { ToCSharpDateInterceptor } from 'src/app/shared/interceptors/to-csharp-date-interceptor';
import { LogInterceptor } from 'src/app/shared/interceptors/log-interceptor';
import { StoreDispatcherInterceptor } from 'src/app/shared/interceptors/store-dispatcher-interceptor';
import { UserCookieInterceptor } from './shared/interceptors/user-cookie-interceptor';
import { PrintInterviewResultComponent } from './print/print-interview-result/print-interview-result.component';

@NgModule({
	declarations: [AppComponent, LoginComponent, PrintInterviewResultComponent],
	imports: [
		SharedModule,
		BrowserModule,
		AppRoutingModule,
		DashboardModule,
		StoreModule.forRoot(metaReducers, {
			runtimeChecks: {
				strictStateImmutability: true, // disallow property mutation, use {...obj}
				strictActionImmutability: true, // disallow action data mutation
			},
		}),
		EffectsModule.forRoot([]),
		BrowserAnimationsModule,
	],
	providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserCookieInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: StoreDispatcherInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ToCSharpDateInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
    CookieService,
  ],
	bootstrap: [AppComponent],
})
export class AppModule {}
