import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeModule } from '../home/home.module';
import { BlogModule } from '../blog/blog.module';
import { TopnavModule } from './topnav/topnav.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    HomeModule,
    BlogModule,
    TopnavModule
  ],
  declarations: [MainComponent],
  exports: [MainComponent]
})
export class MainModule { }
