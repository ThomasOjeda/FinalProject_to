import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  taskCreationSubscription: Subscription = new Subscription();
  loadingTasks: boolean = true;
  errorFetchingTasks: boolean = false;
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
    this.errorFetchingTasks = false;
    this.taskService.getTasks$().subscribe({
      next: (tasks) => {
        this.taskList = tasks.data;
      },
      error: () => {
        this.errorFetchingTasks = true;
        this.loadingTasks = false;
      },
      complete: () => {
        this.loadingTasks = false;
      },
    });
  }
  openAddTaskDialog() {
    this.addTaskDialogService.setState(true);
  }

  ngOnDestroy() {
    this.taskCreationSubscription.unsubscribe();
  }
}
