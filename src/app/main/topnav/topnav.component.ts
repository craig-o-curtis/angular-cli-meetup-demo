import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'craigc-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  @Output() menuClicked: EventEmitter<string> = new EventEmitter<string>(); // above constructor

  constructor() { }

  ngOnInit() { }

  onMenuClick(): void {
    this.menuClicked.emit('clicked');
  }

  toggleNav(): void {
    this.onMenuClick();
  }
}
