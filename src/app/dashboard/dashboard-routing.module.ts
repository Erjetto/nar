import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RoleGuard } from '../shared/guards/role.guard';
import { RoleFlags, RoleGroups } from '../shared/constants/role.constant';
import { HomeComponent } from './home/home.component';
import { Endpoints, PathMatchings } from '../shared/constants/endpoint.constant';
import { CandidateQuestionsComponent } from './candidate/candidate-questions/candidate-questions.component';
import { AnswerScheduleComponent } from './candidate/answer-schedule/answer-schedule.component';
import { ManageCaseComponent } from './manage/case/manage-case.component';
import { ManageTopBottomVoteComponent } from './manage/manage-top-bottom-vote/manage-top-bottom-vote.component';
import { ViewEvaluationComponent } from './view/view-evaluation/view-evaluation.component';
import { ViewTraineeComponent } from './view/view-trainee/view-trainee.component';
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
import { CurrentUserResolver } from '../shared/resolvers/current-user.resolver';
import { TraineeDataComponent } from './trainee/trainee-data/trainee-data.component';
import { NewPresentationComponent } from './presentation/new-presentation/new-presentation.component';
import { TopBottomVoteComponent } from './top-bottom-vote/top-bottom-vote.component';
import { FillAnswersComponent } from './candidate/fill-answers/fill-answers.component';
import { LogRoomComponent } from './log/log-room/log-room.component';
import { LogBookComponent } from './log/log-book/log-book.component';
import { TraineeUploadComponent } from './trainee-upload/trainee-upload.component';
import { CorrectionComponent } from './correction/correction.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { MyDataComponent } from './my-data/my-data.component';

export const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		// resolve: { currentUser: CurrentUserResolver },
		canActivate: [AuthGuard],
		// canActivateChild: [AuthGuard],  // Not needed, canActivate still triggered when accessing child
		// Data for MenuService to prevent Circular import
		data: { isRootMenu: true },
		children: [
			{
				path: '',
				pathMatch: PathMatchings.FULL,
				redirectTo: Endpoints.HOME,
			},
			{
				path: Endpoints.HOME,
				component: HomeComponent,
				data: { roles: RoleGroups.ALL, name: 'Home' },
			},
			{
				path: Endpoints.MASTER,
				data: { name: 'Master' },
				children: [
					{
						path: 'generation',
						component: ManageGenerationComponent,
						data: { roles: RoleFlags.AssistantSupervisor, name: 'Generation' },
					},
					// {
					//   path: 'trainee',
					//   component: managetr,
					//   data: { roles: RoleFlags.AssistantSupervisor, name: 'Trainee' },
					// },
					{
						path: 'phase',
						component: ManagePhaseComponent,
						data: { roles: RoleFlags.AssistantSupervisor, name: 'Phase' },
					},
					{
						path: 'subject',
						component: ManageSubjectComponent,
						data: { roles: RoleFlags.AssistantSupervisor, name: 'Subject' },
					},
					{
						path: 'schedule',
						component: ManageScheduleComponent,
						data: { roles: RoleFlags.AssistantSupervisor, name: 'Schedule' },
					},
					{
						path: 'interview-questions',
						component: ManageInterviewQuestionComponent,
						data: {
							roles: RoleFlags.AssistantSupervisor,
							name: 'Interview Questions',
						},
					},
					{
						path: 'user-roles',
						component: ManageUserRoleComponent,
						data: { roles: RoleFlags.AssistantSupervisor, name: 'User Roles' },
					},
					{
						path: 'attendance-ip-list',
						component: ManageAttendanceIpListComponent,
						data: {
							roles: RoleFlags.AssistantSupervisor,
							name: 'Attendance IP List',
						},
					},
				],
			},
			{
				path: Endpoints.MODIFY,
				data: { name: 'Modify' },
				children: [
					{
						path: 'announcement',
						component: ModifyAnnouncementComponent,
						data: {
							roles: RoleFlags.AssistantSupervisor,
							name: 'Announcement',
						},
					},
					{
						path: 'trainee-schedule',
						component: ModifyTraineeScheduleComponent,
						data: {
							roles: RoleFlags.AssistantSupervisor,
							name: 'Trainee Schedule',
						},
					},
					{
						path: 'interview-material',
						component: ModifyInterviewMaterialComponent,
						data: {
							roles: RoleFlags.AssistantSupervisor,
							name: 'Interview Material',
						},
					},
					{
						path: 'interview-schedule',
						component: ModifyInterviewScheduleComponent,
						data: {
							roles: RoleFlags.AssistantSupervisor,
							name: 'Interview Schedule',
						},
					},
				],
			},
			{
				path: 'my-data',
				component: MyDataComponent,
				data: { roles: RoleFlags.Trainee, name: 'My Data' },
			},
			{
				path: 'my-schedule',
				component: MyScheduleComponent,
				data: { roles: RoleFlags.Trainee, name: 'My Schedule' },
			},
			// {
			// 	path: 'dummy.aspx',
			// 	component: null,
			// 	data: { roles: RoleFlags.Dummy, name: 'Dummy' },
			// },
			// {
			// 	path: 'AssistantSupervisor.aspx',
			// 	component: null,
			// 	data: {
			// 		roles: RoleFlags.AssistantSupervisor,
			// 		name: 'View Assistant Supervisor',
			// 	},
			// },
			// {
			// 	path: 'Interviewer.aspx',
			// 	component: null,
			// 	data: { roles: RoleFlags.Interviewer, name: 'Interviewer' },
			// },
			// {
			// 	path: 'Guest.aspx',
			// 	component: null,
			// 	data: { roles: RoleFlags.Guest, name: 'Guest' },
			// },
			{
				path: 'top-bottom-vote',
				component: TopBottomVoteComponent,
				data: {
					roles: RoleFlags.Trainee | RoleFlags.Trainer | RoleFlags.Interviewer,
					name: 'Top Bottom Vote',
				},
			},
			{
				path: 'upload',
				component: TraineeUploadComponent,
				data: { roles: RoleFlags.Trainee, name: 'Upload' },
			},
			// {
			// 	path: 'interview',
			// 	component: null,
			// 	data: { roles: RoleFlags.Trainee, name: 'Interview' },
			// },
			{
				path: 'log',
				children: [
					{
						path: 'room',
						component: LogRoomComponent,
						data: { roles: RoleGroups.SENIOR_ROLES, name: 'Room' },
					},
					{
						path: 'room/detail/:id',
						redirectTo: '/home',
						// component: null,
						data: { roles: RoleGroups.SENIOR_ROLES },
					},
					{
						path: 'book',
						component: LogBookComponent,
						data: { roles: RoleGroups.SENIOR_ROLES, name: 'Book' },
					},
					{
						path: 'book/detail/:id',
						redirectTo: '/home',
						// component: null,
						data: { roles: RoleGroups.SENIOR_ROLES },
					},
				],
			},
			{
				path: 'room',
				data: { name: 'Room' },
				children: [
					{
						path: 'room-active',
						redirectTo: '/home',
						data: {
							roles: RoleGroups.SENIOR_ROLES | RoleFlags.JuniorTrainer,
							name: 'Room Active (-)',
						},
					},
				],
			},
			{
				path: 'manage',
				data: { name: 'Manage' },
				children: [
					{
						path: 'case',
						component: ManageCaseComponent,
						data: { roles: RoleGroups.SENIOR_ROLES, name: 'Case' },
					},
					{
						path: 'top-bottom-vote',
						component: ManageTopBottomVoteComponent,
						data: {
							roles: RoleFlags.AssistantSupervisor,
							name: 'Top Bottom Vote',
						},
					},
				],
			},
			{
				path: 'correction',
				component: CorrectionComponent,
				data: {
					roles: RoleGroups.SENIOR_ROLES | RoleFlags.JuniorTrainer,
					name: 'Correction',
				},
			},
			{
				path: 'presentation',
				data: {
					roles: RoleGroups.SENIOR_ROLES | RoleFlags.JuniorTrainer,
					name: 'Presentation',
				},
				children: [
					// {
					// 	path: 'scoring',
					// 	component: ScoringComponent,
					// 	data: {
					// 		roles: RoleGroups.SENIOR_ROLES | RoleFlags.JuniorTrainer,
					// 		name: 'Scoring',
					// 	},
					// },
					// {
					// 	path: 'report-detail-summary',
					// 	component: null,
					// 	data: {
					// 		roles: RoleGroups.SENIOR_ROLES,
					// 		name: 'Report Detail Summary',
					// 	},
					// },
					{
						path: 'view-all-presentations',
						component: ViewAllPresentationComponent,
						data: {
							roles: RoleGroups.SENIOR_ROLES | RoleFlags.Trainee,
							name: 'View All Presentations',
						},
					},
					{
						path: 'view-all-questions',
						component: ViewAllQuestionComponent,
						data: {
							roles: RoleGroups.SENIOR_ROLES | RoleFlags.Trainee,
							name: 'View All Questions',
						},
					},
					{
						path: 'view-question/:generationId/:traineeId/:questionId',
						component: ViewQuestionComponent,
						data: {
							roles: RoleGroups.ALL,
						},
					},
					{
						path: 'new',
						component: NewPresentationComponent,
						data: { roles: RoleFlags.Trainee, name: 'New Presentations' },
					},
					// {
					// 	path: 'my-presentations',
					// 	component: MyPresentationComponent,
					// 	data: { roles: RoleFlags.Trainee, name: 'My Presentations' },
					// },
					{
						path: 'question/:generationId/:trainerId/:questionId',
						redirectTo: '/home',
						// component: null,
						data: {
							roles: RoleGroups.SENIOR_ROLES | RoleFlags.JuniorTrainer | RoleFlags.Trainee,
						},
					},
					{
						path: 'report',
						redirectTo: '/home',
						// component: null,
						data: { roles: RoleGroups.SENIOR_ROLES, name: 'Report (-)' },
					},
					{
						path: 'report-trainer',
						redirectTo: '/home',
						// component: null,
						data: {
							roles: RoleFlags.AssistantSupervisor,
							name: 'Report Trainer (-)',
						},
					},
				],
			},
			{
				path: 'view',
				data: { name: 'View' },
				children: [
					{
						path: 'trainee',
						component: ViewTraineeComponent,
						data: {
							roles: RoleGroups.SENIOR_ROLES | RoleFlags.JuniorTrainer,
							name: 'Trainee',
						},
					},
					{
						path: 'trainee/:traineeId/:isEval',
						component: ViewTraineeDetailComponent,
						data: { roles: RoleGroups.SENIOR_ROLES },
					},
					{
						path: 'evaluation',
						component: ViewEvaluationComponent,
						data: { roles: RoleGroups.SENIOR_ROLES, name: 'Evaluation' },
					},
				],
			},
			{
				path: 'attendance',
				data: { name: 'Attendance' },
				children: [
					{
						path: 'RoomAttendance.aspx',
						redirectTo: '/RoomAttendance.aspx',
						data: {
							roles: RoleGroups.SENIOR_ROLES | RoleFlags.Dummy,
							name: 'Room Attendance',
							externalUrl: true,
						},
					},
					{
						path: 'RestAttendance.aspx',
						redirectTo: '/RestAttendance.aspx',
						data: {
							roles: RoleGroups.SENIOR_ROLES | RoleFlags.Dummy,
							name: 'Rest Attendance',
							externalUrl: true,
						},
					},
					{
						path: 'Permission.aspx',
						redirectTo: '/Permission.aspx',
						data: {
							roles: RoleGroups.SENIOR_ROLES | RoleFlags.Dummy,
							name: 'Permission',
							externalUrl: true,
						},
					},
				],
			},
			{
				path: 'trainee',
				data: { name: 'Trainee' },
				children: [
					{
						path: 'data',
						component: TraineeDataComponent,
						data: { roles: RoleFlags.AssistantSupervisor, name: 'Data' },
					},
					{
						path: 'schedule',
						redirectTo: '/home',
						// component: null,
						data: {
							roles: RoleFlags.AssistantSupervisor | RoleFlags.SubjectCoordinator,
							name: 'Schedule (-)',
						},
					},
					{
						path: 'schedule-header',
						redirectTo: '/home',
						// component: null,
						data: {
							roles: RoleFlags.AssistantSupervisor | RoleFlags.SubjectCoordinator,
							name: 'Schedule Header (-)',
						},
					},
					{
						path: 'binusian-data',
						redirectTo: '/home',
						// component: null,
						data: {
							roles: RoleFlags.AssistantSupervisor,
							name: 'Binusian Data (-)',
						},
					},
				],
			},
			{
				path: 'candidate',
				data: { name: 'Candidate' },
				children: [
					{
						path: 'fill-answer',
						component: FillAnswersComponent,
						data: {
							roles: RoleFlags.Trainer,
							name: 'Fill Answer',
						},
					},
					{
						path: 'candidate-questions',
						component: CandidateQuestionsComponent,
						data: {
							roles: RoleFlags.AssistantSupervisor,
							name: 'Manage Questions',
						},
					},
					{
						path: 'answer-schedule',
						component: AnswerScheduleComponent,
						data: {
							roles: RoleFlags.AssistantSupervisor,
							name: 'Manage Schedule',
						},
					},
				],
			},
		],
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
