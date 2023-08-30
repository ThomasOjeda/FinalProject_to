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
  @Input() disabled: boolean = false;

  @Input() ariaLabel: string = '';
  constructor() {}

  ngOnInit(): void {}
  buttonWasClicked($event: Event) {
    this.clickedButtonEvent.emit($event);
  }
}
