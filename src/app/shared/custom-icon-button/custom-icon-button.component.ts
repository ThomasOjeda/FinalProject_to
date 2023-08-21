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
  @Input() invisible: boolean = false;
  @Input() rounded: boolean = false;
  classes = {};
  constructor() {}
  ngOnInit(): void {
    this.classes = {
      'btn-primary': this.buttonPaint == 'primary',
      'btn-red': this.buttonPaint == 'red',
      'btn-orange': this.buttonPaint == 'orange',
      'btn-green': this.buttonPaint == 'green',
      'btn-yellow': this.buttonPaint == 'yellow',
      'btn-purple': this.buttonPaint == 'purple',
      'btn-gray': this.buttonPaint == 'gray',

      'btn-invisible': this.invisible,
      'btn-rounded': this.rounded,
    };
  }
  buttonWasClicked($event: Event) {
    this.clickedButtonEvent.emit($event);
  }
}
