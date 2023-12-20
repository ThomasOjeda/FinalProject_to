import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent {
  @Input() type = 'error';
  @Input() color = 'primary';
  @Input() closable = true;

  @Output() closeSignal = new EventEmitter();
  handleCloseButtonClick() {
    this.closeSignal.emit();
  }
}
