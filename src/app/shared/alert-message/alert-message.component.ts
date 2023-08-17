import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent {
  @Input() type: string = 'error';
  @Input() color: string = 'primary';
  @Input() closable: boolean = true;

  @Output() closeSignal = new EventEmitter();
  handleCloseButtonClick() {
    this.closeSignal.emit();
  }
}
