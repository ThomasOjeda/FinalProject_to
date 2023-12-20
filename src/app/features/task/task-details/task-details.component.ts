import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/models/task';
import { TaskService } from '../services/task.service';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  task: Task = { _id: 'a', name: 'a', story: 'a' };
  taskDeletionDialogCommand: Subject<string> = new Subject<string>();
  loadingTask = true;
  errorFetchingTaskDetails = false;
  constructor(
    private activatedRouteService: ActivatedRoute,
    private taskService: TaskService,
    private locationService: Location
  ) {}

  ngOnInit() {
    const taskId = this.activatedRouteService.snapshot.paramMap.get('task-id');
    if (taskId)
      this.taskService.getTask$(taskId).subscribe({
        next: (task) => {
          this.task = task.data;
        },
        error: () => {
          this.loadingTask = false;
          this.errorFetchingTaskDetails = true;
        },
        complete: () => {
          this.loadingTask = false;
        },
      });
  }

  handleDeleteButtonClick() {
    this.taskDeletionDialogCommand.next('open');
  }

  receiveResult($event: string) {
    if ($event == 'op1') {
      this.handleTaskDeletion();
    }
    if ($event == 'op2') {
      this.taskDeletionDialogCommand.next('close');
    }
  }

  handleTaskDeletion() {
    this.taskService.deleteTask(this.task).subscribe({
      error: () => {
        this.taskDeletionDialogCommand.next(
          'Error deleting the task...try again later'
        );
      },
      complete: () => {
        this.taskDeletionDialogCommand.next('close');
        this.locationService.back();
      },
    });
  }
}
