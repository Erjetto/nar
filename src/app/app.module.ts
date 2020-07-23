import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { metaReducers } from './app.reducer';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
	declarations: [AppComponent, LoginComponent],
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
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
