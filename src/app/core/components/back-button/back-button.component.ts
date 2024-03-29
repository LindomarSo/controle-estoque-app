import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
  constructor(private location: Location) {}

  back() {
    this.location.back();
  }
}
