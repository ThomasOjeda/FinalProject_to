import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-detail',
  templateUrl: './custom-detail.component.html',
  styleUrls: ['./custom-detail.component.scss'],
})
export class CustomDetailComponent {
  @Input() name = '';
  @Input() state = false;
  @Input() expandable = false;

  handleButtonClickedEvent() {
    if (this.expandable) this.state = !this.state;
  }
}
