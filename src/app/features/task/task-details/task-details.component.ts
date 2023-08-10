import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/models/task';
import { TaskService } from '../services/task.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  task: Task | undefined;

  constructor(
    private activatedRouteService: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    let taskId = this.activatedRouteService.snapshot.paramMap.get('task-id');
    if (taskId)
      this.taskService
        .getTask$(taskId)
        .pipe(take(1))
        .subscribe((task) => (this.task = task));
  }
}
