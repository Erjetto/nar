import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DashboardComponent, HomeComponent],
  imports: [DashboardRoutingModule, CommonModule, FormsModule],
  providers: [],
})
export class DashboardModule {}
