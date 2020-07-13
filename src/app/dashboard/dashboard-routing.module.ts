import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RoleGuard } from '../shared/guards/role.guard';
import { RoleConstant } from '../shared/constants/role.constant';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		canActivate: [AuthGuard, RoleGuard],
		canActivateChild: [AuthGuard, RoleGuard],
		children: [
			{
				path: '',
				component: HomeComponent,
				data: { roles: RoleConstant.ALL, name: 'Home' },
			}, /*
			{
				path: 'my-data',
				component: null,
				data: { roles: RoleConstant.Trainee, name: 'My Data' },
			},
			{
				path: 'my-schedule',
				component: null,
				data: { roles: RoleConstant.Trainee, name: 'My Schedule' },
			},
			{
				path: 'dummy.aspx',
				component: null,
				data: { roles: RoleConstant.Dummy, name: 'Dummy' },
			},
			{
				path: 'AssistantSupervisor.aspx',
				component: null,
				data: {
					roles: RoleConstant.AssistantSupervisor,
					name: 'View Assistant Supervisor',
				},
			},
			{
				path: 'Interviewer.aspx',
				component: null,
				data: { roles: RoleConstant.Interviewer, name: 'Interviewer' },
			},
			{
				path: 'Guest.aspx',
				component: null,
				data: { roles: RoleConstant.Guest, name: 'Guest' },
			},
			{
				path: 'top-bottom-vote',
				component: null,
				data: {
					roles:
						RoleConstant.Trainee |
						RoleConstant.Trainer |
						RoleConstant.Interviewer,
					name: 'Top Bottom Vote',
				},
			},
			{
				path: 'upload',
				component: null,
				data: { roles: RoleConstant.Trainee, name: 'Upload' },
			},
			{
				path: 'interview',
				component: null,
				data: { roles: RoleConstant.Trainee, name: 'Interview' },
			},
			{
				path: 'log',
				data: { roles: RoleConstant.Trainee, name: 'Log' },
				children: [
					{
						path: 'room',
						component: null,
						data: { roles: RoleConstant.SENIOR_ROLES, name: 'Room' },
					},
					{
						path: 'room/detail/:id',
						component: null,
						data: { roles: RoleConstant.SENIOR_ROLES },
					},
					{
						path: 'book',
						component: null,
						data: { roles: RoleConstant.SENIOR_ROLES, name: 'Book' },
					},
					{
						path: 'book/detail/:id',
						component: null,
						data: { roles: RoleConstant.SENIOR_ROLES },
					},
				],
			},
			{
				path: 'Room',
				children: [
					{
						path: 'room-active',
						data: {
							roles: RoleConstant.SENIOR_ROLES | RoleConstant.JuniorTrainer,
							name: 'Room Active',
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
						component: null,
						data: { roles: RoleConstant.SENIOR_ROLES, name: 'Case' },
					},
					{
						path: 'top-bottom-vote',
						component: null,
						data: {
							roles: RoleConstant.AssistantSupervisor,
							name: 'Top Bottom Vote',
						},
					},
					{
						path: 'trainee',
						component: null,
						data: { roles: RoleConstant.AssistantSupervisor, name: 'Trainee' },
					},
				],
			},
			{
				path: 'correction',
				data: {
					roles: RoleConstant.SENIOR_ROLES | RoleConstant.JuniorTrainer,
					name: 'Correction',
				},
			},
			{
				path: 'presentation',
				data: { roles: RoleConstant.Trainee, name: 'Presentation' },
				children: [
					{
						path: 'scoring',
						component: null,
						data: {
							roles: RoleConstant.SENIOR_ROLES | RoleConstant.JuniorTrainer,
							name: 'Scoring',
						},
					},
					{
						path: 'report-detail-summary',
						component: null,
						data: {
							roles: RoleConstant.SENIOR_ROLES,
							name: 'Report Detail Summary',
						},
					},
					{
						path: 'view-all-questions',
						component: null,
						data: {
							roles: RoleConstant.SENIOR_ROLES | RoleConstant.Trainee,
							name: 'View All Questions',
						},
					},
					{
						path: 'new',
						component: null,
						data: { roles: RoleConstant.Trainee, name: 'New Presentations' },
					},
					{
						path: 'my-presentations',
						component: null,
						data: { roles: RoleConstant.Trainee, name: 'My Presentations' },
					},
					{
						path: 'question/:generationId/:trainerId/:questionId',
						component: null,
						data: {
							roles:
								RoleConstant.SENIOR_ROLES |
								RoleConstant.JuniorTrainer |
								RoleConstant.Trainee,
						},
					},
					{
						path: 'report',
						component: null,
						data: { roles: RoleConstant.SENIOR_ROLES, name: 'Report' },
					},
					{
						path: 'report-trainer',
						component: null,
						data: {
							roles: RoleConstant.AssistantSupervisor,
							name: 'Report Trainer',
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
						component: null,
						data: { roles: RoleConstant.SENIOR_ROLES, name: 'Score' },
					},
					{
						path: 'trainee',
						component: null,
						data: {
							roles: RoleConstant.SENIOR_ROLES | RoleConstant.JuniorTrainer,
							name: 'Trainee',
						},
					},
					{
						path: 'trainee/:traineeId/:isEval',
						component: null,
						data: { roles: RoleConstant.SENIOR_ROLES },
					},
					{
						path: 'evaluation',
						component: null,
						data: { roles: RoleConstant.SENIOR_ROLES, name: 'Evaluation' },
					},
				],
			},
			{
				path: 'attendance',
				data: { name: 'Attendance' },
				children: [
					{
						path: 'RoomAttendance.aspx',
						data: {
							roles: RoleConstant.SENIOR_ROLES | RoleConstant.Dummy,
							name: 'Room Attendance',
						},
					},
					{
						path: 'RestAttendance.aspx',
						data: {
							roles: RoleConstant.SENIOR_ROLES | RoleConstant.Dummy,
							name: 'Rest Attendance',
						},
					},
					{
						path: 'Permission.aspx',
						data: {
							roles: RoleConstant.SENIOR_ROLES | RoleConstant.Dummy,
							name: 'Permission',
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
						component: null,
						data: { roles: RoleConstant.AssistantSupervisor, name: 'Data' },
					},
					{
						path: 'schedule',
						component: null,
						data: {
							roles:
								RoleConstant.AssistantSupervisor |
								RoleConstant.SubjectCoordinator,
							name: 'Schedule',
						},
					},
					{
						path: 'schedule-header',
						component: null,
						data: {
							roles:
								RoleConstant.AssistantSupervisor |
								RoleConstant.SubjectCoordinator,
							name: 'Schedule Header',
						},
					},
					{
						path: 'binusian-data',
						component: null,
						data: {
							roles: RoleConstant.AssistantSupervisor,
							name: 'Binusian Data',
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
						component: null,
						data: { roles: RoleConstant.Trainer, name: 'Fill Answer' },
					},
					{
						path: 'manage-questions',
						component: null,
						data: {
							roles: RoleConstant.AssistantSupervisor,
							name: 'Manage Questions',
						},
					},
					{
						path: 'answer-schedule',
						component: null,
						data: {
							roles: RoleConstant.AssistantSupervisor,
							name: 'Answer Schedule',
						},
					},
				],
			},*/
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
