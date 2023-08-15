import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Task } from 'src/models/task';
import { TaskService } from '../services/task.service';
import { AddTaskDialogService } from '../services/add-task-dialog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  taskList: Task[] = [];
  toDelete: Task = { _id: ' ', name: '', story: '' };
  taskCreationSubscription: Subscription = new Subscription();
  taskDeletionDialogCommand: Subject<boolean> = new Subject<boolean>();
  loadingTasks: boolean = true;
  constructor(
    private taskService: TaskService,
    private addTaskDialogService: AddTaskDialogService
  ) {}
  ngOnInit(): void {
    this.retrieveTaskList();
    this.taskCreationSubscription = this.addTaskDialogService
      .getTaskCreationEvent$()
      .subscribe(() => this.retrieveTaskList());
  }

  retrieveTaskList() {
    this.loadingTasks = true;

    this.taskService.getTasks$().subscribe({
      next: (tasks) => {
        this.taskList = tasks.data;
      },
      error: () => {},
      complete: () => {
        this.loadingTasks = false;
      },
    });
  }

  handleTaskDeletion($event: Task) {
    this.toDelete = $event;
    this.taskDeletionDialogCommand.next(true);
  }

  receiveResult(result: boolean) {
    if (result) {
      this.taskService.deleteTask(this.toDelete).subscribe({
        error: () => {
          this.retrieveTaskList();
          this.taskDeletionDialogCommand.next(false);
        },
        complete: () => {
          this.retrieveTaskList();
          this.taskDeletionDialogCommand.next(false);
        },
      });
    } else {
      this.taskDeletionDialogCommand.next(false);
    }
  }

  ngOnDestroy() {
    this.taskCreationSubscription.unsubscribe();
  }
}
