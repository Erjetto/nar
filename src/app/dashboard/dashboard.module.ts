import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MAINSTATE_REDUCER_NAME, MainStateReducer } from '../shared/main-state/main-state.reducer';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [DashboardComponent, HomeComponent],
	imports: [
		DashboardRoutingModule,
		CommonModule,
		FormsModule,
		StoreModule.forFeature(MAINSTATE_REDUCER_NAME, MainStateReducer),
	],
	providers: [],
})
export class DashboardModule {}
