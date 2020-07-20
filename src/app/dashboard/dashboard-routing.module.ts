import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RoleGuard } from '../shared/guards/role.guard';
import { RoleFlags, RoleGroups } from '../shared/constants/role.constant';
import { HomeComponent } from './home/home.component';
import {
	Endpoints,
	PathMatchings,
} from '../shared/constants/endpoint.constant';
import { ManageQuestionsComponent } from './candidate/manage-questions/manage-questions.component';
import { ManageScheduleComponent } from './candidate/manage-schedule/manage-schedule.component';

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
			} ,
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
			// {
			// 	path: 'log',
			// 	data: { roles: RoleFlags.Trainee, name: 'Log' },
			// 	children: [
			// 		{
			// 			path: 'room',
			// 			component: null,
			// 			data: { roles: RoleGroups.SENIOR_ROLES, name: 'Room' },
			// 		},
			// 		{
			// 			path: 'room/detail/:id',
			// 			component: null,
			// 			data: { roles: RoleGroups.SENIOR_ROLES },
			// 		},
			// 		{
			// 			path: 'book',
			// 			component: null,
			// 			data: { roles: RoleGroups.SENIOR_ROLES, name: 'Book' },
			// 		},
			// 		{
			// 			path: 'book/detail/:id',
			// 			component: null,
			// 			data: { roles: RoleGroups.SENIOR_ROLES },
			// 		},
			// 	],
			// },
			// {
			// 	path: 'Room',
			// 	children: [
			// 		{
			// 			path: 'room-active',
			// 			data: {
			// 				roles: RoleGroups.SENIOR_ROLES | RoleFlags.JuniorTrainer,
			// 				name: 'Room Active',
			// 			},
			// 		},
			// 	],
			// },
			// {
			// 	path: 'manage',
			// 	data: { name: 'Manage' },
			// 	children: [
			// 		{
			// 			path: 'case',
			// 			component: null,
			// 			data: { roles: RoleGroups.SENIOR_ROLES, name: 'Case' },
			// 		},
			// 		{
			// 			path: 'top-bottom-vote',
			// 			component: null,
			// 			data: {
			// 				roles: RoleFlags.AssistantSupervisor,
			// 				name: 'Top Bottom Vote',
			// 			},
			// 		},
			// 		{
			// 			path: 'trainee',
			// 			component: null,
			// 			data: { roles: RoleFlags.AssistantSupervisor, name: 'Trainee' },
			// 		},
			// 	],
			// },
			// {
			// 	path: 'correction',
			// 	data: {
			// 		roles: RoleGroups.SENIOR_ROLES | RoleFlags.JuniorTrainer,
			// 		name: 'Correction',
			// 	},
			// },
			// {
			// 	path: 'presentation',
			// 	data: { roles: RoleFlags.Trainee, name: 'Presentation' },
			// 	children: [
			// 		{
			// 			path: 'scoring',
			// 			component: null,
			// 			data: {
			// 				roles: RoleGroups.SENIOR_ROLES | RoleFlags.JuniorTrainer,
			// 				name: 'Scoring',
			// 			},
			// 		},
			// 		{
			// 			path: 'report-detail-summary',
			// 			component: null,
			// 			data: {
			// 				roles: RoleGroups.SENIOR_ROLES,
			// 				name: 'Report Detail Summary',
			// 			},
			// 		},
			// 		{
			// 			path: GrouRoleGroup-all-questions',
			// 			component: null,
			// 			data: {
			// 				roles: RoleGroups.SENIOR_ROLES | RoleFlags.Trainee,
			// 				name: GrouRoleGroup All Questions',
			// 			},
			// 		},
			// 		{
			// 			path: 'new',
			// 			component: null,
			// 			data: { roles: RoleFlags.Trainee, name: 'New Presentations' },
			// 		},
			// 		{
			// 			path: 'my-presentations',
			// 			component: null,
			// 			data: { roles: RoleFlags.Trainee, name: 'My Presentations' },
			// 		},
			// 		{
			// 			path: 'question/:generationId/:trainerId/:questionId',
			// 			component: null,
			// 			data: {
			// 				roles:
			// 					RoleGroups.SENIOR_ROLES |
			// 					RoleFlags.JuniorTrainer |
			// 					RoleFlags.Trainee,
			// 			},
			// 		},
			// 		{
			// 			path: 'report',
			// 			component: null,
			// 			data: { roles: RoleGroups.SENIOR_ROLES, name: 'Report' },
			// 		},
			// 		{
			// 			path: 'report-trainer',
			// 			component: null,
			// 			data: {
			// 				roles: RoleFlags.AssistantSupervisor,
			// 				name: 'Report Trainer',
			// 			},
			// 		},
			// 	],
			// },
			// {
			// 	path: 'view',
			// 	data: { name: 'View' },
			// 	children: [
			// 		{
			// 			path: 'score',
			// 			component: null,
			// 			data: { roles: RoleGroups.SENIOR_ROLES, name: 'Score' },
			// 		},
			// 		{
			// 			path: 'trainee',
			// 			component: null,
			// 			data: {
			// 				roles: RoleGroups.SENIOR_ROLES | RoleFlags.JuniorTrainer,
			// 				name: 'Trainee',
			// 			},
			// 		},
			// 		{
			// 			path: 'trainee/:traineeId/:isEval',
			// 			component: null,
			// 			data: { roles: RoleGroups.SENIOR_ROLES },
			// 		},
			// 		{
			// 			path: 'evaluation',
			// 			component: null,
			// 			data: { roles: RoleGroups.SENIOR_ROLES, name: 'Evaluation' },
			// 		},
			// 	],
			// },
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
			// {
			// 	path: 'trainee',
			// 	data: { name: 'Trainee' },
			// 	children: [
			// 		{
			// 			path: 'data',
			// 			component: null,
			// 			data: { roles: RoleFlags.AssistantSupervisor, name: 'Data' },
			// 		},
			// 		{
			// 			path: 'schedule',
			// 			component: null,
			// 			data: {
			// 				roles:
			// 					RoleFlags.AssistantSupervisor |
			// 					RoleFlags.SubjectCoordinator,
			// 				name: 'Schedule',
			// 			},
			// 		},
			// 		{
			// 			path: 'schedule-header',
			// 			component: null,
			// 			data: {
			// 				roles:
			// 					RoleFlags.AssistantSupervisor |
			// 					RoleFlags.SubjectCoordinator,
			// 				name: 'Schedule Header',
			// 			},
			// 		},
			// 		{
			// 			path: 'binusian-data',
			// 			component: null,
			// 			data: {
			// 				roles: RoleFlags.AssistantSupervisor,
			// 				name: 'Binusian Data',
			// 			},
			// 		},
			// 	],
      // },
			{
				path: 'candidate',
				data: { name: 'Candidate' },
				children: [
					// {
					// 	path: 'fill-answer',
					// 	component: null,
					// 	data: { roles: RoleFlags.Trainer, name: 'Fill Answer' },
					// },
					{
						path: 'manage-questions',
						component: ManageQuestionsComponent,
						data: {
							roles: RoleGroups.ALL,
							name: 'Manage Questions',
						},
					},
					{
						path: 'manage-schedule',
						component: ManageScheduleComponent,
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
