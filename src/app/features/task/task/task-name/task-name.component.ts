import { Component, Input } from '@angular/core'; // First, import Input

@Component({
  selector: 'app-task-name',
  templateUrl: './task-name.component.html',
  styleUrls: ['./task-name.component.scss'],
})
export class TaskNameComponent {
  @Input() styleTask = false;
}
