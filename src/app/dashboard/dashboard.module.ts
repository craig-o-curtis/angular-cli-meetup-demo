import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ReposModule } from './repos/repos.module';

@NgModule({
  imports: [
    CommonModule,
    ReposModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
