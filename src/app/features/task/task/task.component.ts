import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from 'src/models/task';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task: Task = { _id: '', name: '', story: '' };
  @Output() deleteTask = new EventEmitter<Task>();

  constructor(
    private taskService: TaskService,
    private routerService: Router,
    private activatedRouteService: ActivatedRoute
  ) {}

  handleTaskNameClick() {
    this.routerService.navigate([this.task._id], {
      relativeTo: this.activatedRouteService,
    });
  }

  handleCheckboxToggle() {
    this.task.done = !this.task.done;
    console.log(this.task.done);
    this.taskService.updateTask(this.task).subscribe({
      next: () => {},
      error: () => {
        this.task.done = !this.task.done;
      },
      complete: () => {},
    });
  }
}
