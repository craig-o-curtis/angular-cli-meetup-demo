import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'craigc-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;

  constructor() { }
  ngOnInit() { }

  toggleSidenav($event): void {
    this.sidenav.opened ? this.sidenav.close() : this.sidenav.open();
  }
}
