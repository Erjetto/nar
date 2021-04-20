import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ALL_STORES, ALL_EFFECTS } from '../shared/store-modules';

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
import { ModifyAnnouncementComponent } from './modify/modify-announcement/modify-announcement.component';
import { ModifyInterviewScheduleComponent } from './modify/modify-interview-schedule/modify-interview-schedule.component';
import { ModifyInterviewMaterialComponent } from './modify/modify-interview-material/modify-interview-material.component';
import { ViewAllQuestionComponent } from './presentation/view-all-question/view-all-question.component';
import { ViewAllPresentationComponent } from './presentation/view-all-presentation/view-all-presentation.component';
import { ViewQuestionComponent } from './presentation/view-question/view-question.component';
import { ModifyTraineeScheduleComponent } from './modify/modify-trainee-schedule/modify-trainee-schedule.component';
import { TraineeDataComponent } from './trainee/trainee-data/trainee-data.component';
import { NewPresentationComponent } from './presentation/new-presentation/new-presentation.component';
import { TopBottomVoteComponent } from './top-bottom-vote/top-bottom-vote.component';
import { FillAnswersComponent } from './candidate/fill-answers/fill-answers.component';
import { LogRoomComponent } from './log/log-room/log-room.component';
import { LogBookComponent } from './log/log-book/log-book.component';
import { TraineeUploadComponent } from './trainee-upload/trainee-upload.component';
import { CorrectionComponent } from './correction/correction.component';
import { MyDataComponent } from './my-data/my-data.component';
import { PresentationReportComponent } from './presentation/presentation-report/presentation-report.component';
import { TraineeAttendanceReportComponent } from './trainee/trainee-attendance-report/trainee-attendance-report.component';
import { PresentationSummaryComponent } from './presentation/presentation-summary/presentation-summary.component';
import { TraineeHomeComponent } from './home/trainee-home/trainee-home.component';
import { TrainerHomeComponent } from './home/trainer-home/trainer-home.component';
import { RoomActiveComponent } from './room/room-active/room-active.component';
import { TraineeSchedulesComponent } from './trainee/trainee-schedules/trainee-schedules.component';
import { ViewMyPresentationComponent } from './presentation/view-my-presentation/view-my-presentation.component';

@NgModule({
	declarations: [
		DashboardComponent,
		TrainerHomeComponent,
		HomeComponent,
		CandidateQuestionsComponent,
		AnswerScheduleComponent,
		FillAnswersComponent,

		ManageCaseComponent,
		ManageTopBottomVoteComponent,
		
		LogRoomComponent,
		LogBookComponent,

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

		ModifyAnnouncementComponent,
		ModifyInterviewScheduleComponent,
		ModifyInterviewMaterialComponent,
    
		CorrectionComponent,

		ViewQuestionComponent,
		ViewAllQuestionComponent,
		ViewAllPresentationComponent,
		ViewMyPresentationComponent,
    PresentationReportComponent,
		PresentationSummaryComponent,
    
    ModifyTraineeScheduleComponent,
    
		TraineeHomeComponent,
		MyDataComponent,
		NewPresentationComponent,
		TopBottomVoteComponent,
		TraineeUploadComponent,
    
    
		RoomActiveComponent,
		TraineeDataComponent,    
		TraineeSchedulesComponent,
		TraineeAttendanceReportComponent,
    
	],
	imports: [
		SharedModule,
		DashboardRoutingModule,
		...ALL_STORES,
		EffectsModule.forFeature(ALL_EFFECTS),
	],
	exports: [],
	providers: [],
})
export class DashboardModule {}
