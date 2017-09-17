import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [BlogComponent]
})
export class BlogModule { }
