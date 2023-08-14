import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-icon-button',
  templateUrl: './custom-icon-button.component.html',
  styleUrls: ['./custom-icon-button.component.scss'],
})
export class CustomIconButtonComponent {
  @Output() clickedButtonEvent = new EventEmitter();
  @Input() buttonPaint: string = '';

  @Input() iconPath: string = '';
  @Input() iconAlt: string = '';
  @Input() iconHeight: string = '';

  constructor() {}
  ngOnInit(): void {}
  buttonWasClicked($event: Event) {
    this.clickedButtonEvent.emit($event);
  }
}
