import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
	MAINSTATE_REDUCER_NAME,
	MainStateReducer,
} from '../shared/stores/main/main.reducer';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { MainStateEffects } from '../shared/stores/main/main.effect';
import { SharedModule } from '../shared/shared.module';
import { ManageQuestionsComponent } from './candidate/manage-questions/manage-questions.component';
import {
	CANDIDATE_REDUCER_NAME,
	CandidateStateReducer,
} from '../shared/stores/candidate/candidate.reducer';
import { CandidateStateEffects } from '../shared/stores/candidate/candidate.effect';
import { ManageScheduleComponent } from './candidate/manage-schedule/manage-schedule.component';

@NgModule({
	declarations: [
		DashboardComponent,
		HomeComponent,
		ManageQuestionsComponent,
		ManageScheduleComponent,
	],
	imports: [
		SharedModule,
		DashboardRoutingModule,
		StoreModule.forFeature(MAINSTATE_REDUCER_NAME, MainStateReducer),
		StoreModule.forFeature(CANDIDATE_REDUCER_NAME, CandidateStateReducer),
		EffectsModule.forFeature([MainStateEffects, CandidateStateEffects]),
	],
	exports: [],
	providers: [],
})
export class DashboardModule {}
