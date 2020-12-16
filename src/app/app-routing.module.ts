import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrintInterviewResultComponent } from './print/print-interview-result/print-interview-result.component';

const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{
		path: 'dashboard',
		loadChildren: './dashboard/dashboard.module#DashboardModule',
	},
	// { path: 'dashboard', component: DashboardComponent },
	{ path: 'login', component: LoginComponent },
	{ 
    path: 'print',  
    children: [
      {
        path:'interview-result/:interviewScheduleId',
        component: PrintInterviewResultComponent
      }
    ]
  },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
