import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-task-input',
  templateUrl: './add-task-input.component.html',
  styleUrls: ['./add-task-input.component.scss'],
})
export class AddTaskInputComponent {
  @Output() valueChangedEvent = new EventEmitter();

  valueChanged($event: KeyboardEvent) {
    this.valueChangedEvent.emit(($event.target as HTMLInputElement).value);
  }
}
