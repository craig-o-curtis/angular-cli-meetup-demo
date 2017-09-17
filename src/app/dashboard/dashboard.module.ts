import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ReposModule } from './repos/repos.module';

@NgModule({
  imports: [
    CommonModule,
    ReposModule,
    SharedModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
