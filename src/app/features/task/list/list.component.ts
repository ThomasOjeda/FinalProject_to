import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Task } from 'src/models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  taskList: Task[] = [];
  tasks$ = new Observable<Task[]>();
  tasksSubscription = new Subscription();
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    /*     this.tasks$ = this.taskService.getTasks$();
    this.tasksSubscription = this.tasks$.subscribe(
      (tasks) => (this.taskList = tasks)
    ); */
  }

  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
  }
}
