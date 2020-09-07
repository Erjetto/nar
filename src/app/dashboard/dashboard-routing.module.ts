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
import { ScoringComponent } from './presentation/scoring/scoring.component';
import { ViewAllQuestionComponent } from './presentation/view-all-question/view-all-question.component';
import { ViewAllPresentationComponent } from './presentation/view-all-presentation/view-all-presentation.component';
import { ViewQuestionComponent } from './presentation/view-question/view-question.component';
import { TraineeScheduleComponent } from './modify/trainee-schedule/trainee-schedule.component';

export const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		// canActivate: [AuthGuard, RoleGuard],
		// canActivateChild: [AuthGuard, RoleGuard],
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
						component: TraineeScheduleComponent,
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
			// {
			// 	path: 'my-data',
			// 	component: null,
			// 	data: { roles: RoleFlags.Trainee, name: 'My Data' },
			// },
			// {
			// 	path: 'my-schedule',
			// 	component: null,
			// 	data: { roles: RoleFlags.Trainee, name: 'My Schedule' },
			// },
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
			// {
			// 	path: 'top-bottom-vote',
			// 	component: null,
			// 	data: {
			// 		roles:
			// 			RoleFlags.Trainee |
			// 			RoleFlags.Trainer |
			// 			RoleFlags.Interviewer,
			// 		name: 'Top Bottom Vote',
			// 	},
			// },
			// {
			// 	path: 'upload',
			// 	component: null,
			// 	data: { roles: RoleFlags.Trainee, name: 'Upload' },
			// },
			// {
			// 	path: 'interview',
			// 	component: null,
			// 	data: { roles: RoleFlags.Trainee, name: 'Interview' },
			// },
			{
				path: 'log',
				data: { roles: RoleFlags.Trainee, name: 'Log' },
				children: [
					{
						path: 'room',
						redirectTo: '/home',
						// component: null,
						data: { roles: RoleGroups.SENIOR_ROLES, name: 'Room (-)' },
					},
					{
						path: 'room/detail/:id',
						redirectTo: '/home',
						// component: null,
						data: { roles: RoleGroups.SENIOR_ROLES },
					},
					{
						path: 'book',
						redirectTo: '/home',
						// component: null,
						data: { roles: RoleGroups.SENIOR_ROLES, name: 'Book (-)' },
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
				path: 'Room',
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
					{
						path: 'trainee',
						redirectTo: '/home',
						// component: null,
						data: { roles: RoleFlags.AssistantSupervisor, name: 'Trainee (-)' },
					},
				],
			},
			// {
			// 	path: 'correction',
			// 	data: {
			// 		roles: RoleGroups.SENIOR_ROLES | RoleFlags.JuniorTrainer,
			// 		name: 'Correction',
			// 	},
			// },
			{
				path: 'presentation',
				data: {
					roles: RoleGroups.SENIOR_ROLES | RoleFlags.JuniorTrainer,
					name: 'Presentation',
				},
				children: [
					{
						path: 'scoring',
						component: ScoringComponent,
						data: {
							roles: RoleGroups.SENIOR_ROLES | RoleFlags.JuniorTrainer,
							name: 'Scoring',
						},
					},
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
						path: 'view-question/',
						component: ViewQuestionComponent,
						data: {
							roles: RoleGroups.ALL,
						},
					},
					{
						path: 'new',
						redirectTo: '/home',
						// component: null,
						data: { roles: RoleFlags.Trainee, name: 'New Presentations (-)' },
					},
					{
						path: 'my-presentations',
						redirectTo: '/home',
						// component: null,
						data: { roles: RoleFlags.Trainee, name: 'My Presentations (-)' },
					},
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
						path: 'score',
						redirectTo: '/home',
						// component: null,
						data: { roles: RoleGroups.SENIOR_ROLES, name: 'Score (-)' },
					},
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
			// {
			// 	path: 'attendance',
			// 	data: { name: 'Attendance' },
			// 	children: [
			// 		{
			// 			path: 'RoomAttendance.aspx',
			// 			data: {
			// 				roles: RoleGroups.SENIOR_ROLES | RoleFlags.Dummy,
			// 				name: 'Room Attendance',
			// 			},
			// 		},
			// 		{
			// 			path: 'RestAttendance.aspx',
			// 			data: {
			// 				roles: RoleGroups.SENIOR_ROLES | RoleFlags.Dummy,
			// 				name: 'Rest Attendance',
			// 			},
			// 		},
			// 		{
			// 			path: 'Permission.aspx',
			// 			data: {
			// 				roles: RoleGroups.SENIOR_ROLES | RoleFlags.Dummy,
			// 				name: 'Permission',
			// 			},
			// 		},
			// 	],
			// },
			{
				path: 'trainee',
				data: { name: 'Trainee' },
				children: [
					{
						path: 'data',
						redirectTo: '/home',
						// component: null,
						data: { roles: RoleFlags.AssistantSupervisor, name: 'Data (-)' },
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
						redirectTo: '/home',
						// component: null,
						data: {
							roles: RoleGroups.ALL,
							name: 'Fill Answer (-)',
						},
					},
					{
						path: 'candidate-questions',
						component: CandidateQuestionsComponent,
						data: {
							roles: RoleGroups.ALL,
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
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
