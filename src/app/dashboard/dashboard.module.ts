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
import { AnswerScheduleComponent } from './candidate/answer-schedule/answer-schedule.component';
import { ManageCaseComponent } from './manage/case/manage-case.component';
import { CandidateQuestionsComponent } from './candidate/candidate-questions/candidate-questions.component';
import { ManageTopBottomVoteComponent } from './manage/manage-top-bottom-vote/manage-top-bottom-vote.component';
import { ViewTraineeComponent } from './view/view-trainee/view-trainee.component';
import { ViewEvaluationComponent } from './view/view-evaluation/view-evaluation.component';
import { ViewTraineeDetailComponent } from './view/view-trainee-detail/view-trainee-detail.component';
import { ManageGenerationComponent } from './master/manage-generation/manage-generation.component';
import { ManagePhaseComponent } from './master/manage-phase/manage-phase.component';
import { ManageSubjectComponent } from './master/manage-subject/manage-subject.component';
import { ManageInterviewQuestionComponent } from './master/manage-interview-question/manage-interview-question.component';
import { ManageUserRoleComponent } from './master/manage-user-role/manage-user-role.component';
import { ManageAttendanceIpListComponent } from './master/manage-attendance-ip-list/manage-attendance-ip-list.component';
import { ManageScheduleComponent } from './master/manage-schedule/manage-schedule.component';

@NgModule({
	declarations: [
		DashboardComponent,
		HomeComponent,
		CandidateQuestionsComponent,
		AnswerScheduleComponent,
		ManageCaseComponent,
		ManageTopBottomVoteComponent,
		ViewTraineeComponent,
		ViewEvaluationComponent,
		ViewTraineeDetailComponent,
		ManageGenerationComponent,
		ManagePhaseComponent,
		ManageSubjectComponent,
		ManageScheduleComponent,
		ManageInterviewQuestionComponent,
		ManageUserRoleComponent,
		ManageAttendanceIpListComponent,
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
