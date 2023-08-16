import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/models/task';
import { TaskService } from '../services/task.service';
import { Subject, Subscription, take } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  task: Task = { _id: 'a', name: 'a', story: 'a' };
  taskDeletionDialogCommand: Subject<boolean> = new Subject<boolean>();
  taskCreationSubscription: Subscription = new Subscription();
  loadingTask: boolean = true;
  constructor(
    private activatedRouteService: ActivatedRoute,
    private taskService: TaskService,
    private locationService: Location
  ) {}

  ngOnInit() {
    let taskId = this.activatedRouteService.snapshot.paramMap.get('task-id');
    if (taskId)
      this.taskService.getTask$(taskId).subscribe((task) => {
        this.task = task.data;
        this.loadingTask = false;
      });
  }

  handleDeleteButtonClick() {
    this.taskDeletionDialogCommand.next(true);
  }

  receiveResult($event: boolean) {
    if ($event) {
      this.handleTaskDeletion();
    } else {
      this.taskDeletionDialogCommand.next(false);
    }
  }

  handleTaskDeletion() {
    this.taskService.deleteTask(this.task).subscribe({
      next: () => {},
      error: () => {},
      complete: () => {
        this.taskDeletionDialogCommand.next(false);
        this.locationService.back();
      },
    });
  }
}
