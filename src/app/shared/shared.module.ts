import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  exports: [
    MaterialModule,
    BrowserAnimationsModule
  ],
  declarations: []
})
export class SharedModule { }
