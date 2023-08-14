import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent implements OnInit {
  @Output() clickedButtonEvent = new EventEmitter();
  @Input() text: string = '';
  @Input() buttonPaint: string = '';
  @Input() buttonHeight: string = '';

  classes = {};
  constructor() {}

  ngOnInit(): void {
    this.classes = {
      'btn-large': this.buttonHeight == 'large',
      'btn-medium': this.buttonHeight == 'medium',
      'btn-small': this.buttonHeight == 'small',

      'btn-primary': this.buttonPaint == 'primary',
      'btn-red': this.buttonPaint == 'red',
      'btn-orange': this.buttonPaint == 'orange',
      'btn-green': this.buttonPaint == 'green',
      'btn-yellow': this.buttonPaint == 'yellow',
      'btn-purple': this.buttonPaint == 'purple',
    };
  }
  buttonWasClicked($event: Event) {
    this.clickedButtonEvent.emit($event);
  }
}
