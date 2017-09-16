import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopnavComponent } from './topnav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [TopnavComponent],
  exports: [TopnavComponent]
})
export class TopnavModule { }
