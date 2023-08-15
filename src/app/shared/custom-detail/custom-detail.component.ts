import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-detail',
  templateUrl: './custom-detail.component.html',
  styleUrls: ['./custom-detail.component.scss'],
})
export class CustomDetailComponent {
  @Input() name: string = '';
  @Input() state: boolean = false;

  constructor() {}

  handleButtonClickedEvent() {
    this.state = !this.state;
  }
}
