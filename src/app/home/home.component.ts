import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'craigc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HomeComponent implements OnInit {
  boxes = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}];

  constructor() { }

  ngOnInit() {
  }

}
