import { SharedModule } from '../../shared/shared.module';
// import { HttpClientModule } from '@angular/common/http/src/module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReposComponent } from './repos.component';
import { ReposService } from './repos.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [ReposComponent],
  exports: [ReposComponent],
  providers: [ReposService]
})
export class ReposModule { }
