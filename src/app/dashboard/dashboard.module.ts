import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

import {
  MAINSTATE_REDUCER_NAME,
  MainStateReducer,
} from '../shared/stores/main/main.reducer';
import {
	CANDIDATE_REDUCER_NAME,
	CandidateStateReducer,
} from '../shared/stores/candidate/candidate.reducer';
import {
	CASESTATE_REDUCER_NAME,
	CaseStateReducer,
} from '../shared/stores/case/case.reducer';
const stores = [
  StoreModule.forFeature(MAINSTATE_REDUCER_NAME, MainStateReducer),
  StoreModule.forFeature(CASESTATE_REDUCER_NAME, CaseStateReducer),
  StoreModule.forFeature(CANDIDATE_REDUCER_NAME, CandidateStateReducer),
]

import { MainStateEffects } from '../shared/stores/main/main.effect';
import { CandidateStateEffects } from '../shared/stores/candidate/candidate.effect';
import { CaseStateEffects } from '../shared/stores/case/case.effect';
const effects = [MainStateEffects, CandidateStateEffects, CaseStateEffects]

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ManageScheduleComponent } from './candidate/manage-schedule/manage-schedule.component';
import { ManageCaseComponent } from './manage/case/manage-case.component';
import { ManageQuestionsComponent } from './candidate/manage-questions/manage-questions.component';

@NgModule({
	declarations: [
		DashboardComponent,
		HomeComponent,
		ManageQuestionsComponent,
		ManageScheduleComponent,
		ManageCaseComponent,
	],
	imports: [
		SharedModule,
    DashboardRoutingModule,
    ...stores,
		EffectsModule.forFeature(effects),
	],
	exports: [],
	providers: [],
})
export class DashboardModule {}
