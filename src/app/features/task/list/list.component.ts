import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
    this.taskService
      .getTasks$()
      .subscribe((tasks) => (this.taskList = tasks.data));
  }

  ngOnDestroy() {
    this.taskCreationSubscription.unsubscribe();
  }
}
