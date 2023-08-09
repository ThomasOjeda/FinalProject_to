import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Output() checkboxEvent = new EventEmitter<boolean>();

  @Input() checked: boolean = false;

  handleCheckboxEvent() {
    this.checkboxEvent.emit(this.checked);
  }
}
