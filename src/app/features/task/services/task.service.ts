import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';
import { Task } from 'src/models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskList: Task[] = [];
  taskList$: BehaviorSubject<Task[]>;
  task$: BehaviorSubject<Task>;
  constructor() {
    this.taskList = [
      {
        _id: '8441as5a8sd465165',
        name: 'P111',
        description: 'A dream project',
        story: '4848516133654600',
      },
      {
        _id: '987777797877977',
        name: 'P222',
        description: 'A postal project',
        story: 'a5da6d4546454484',
      },
    ];

    this.taskList$ = new BehaviorSubject<Task[]>(this.taskList);

    this.task$ = new BehaviorSubject<Task>({
      _id: 'def',
      name: 'def',
      description: 'def',
      story: 'def',
    });
  }

  getProjects() {
    return this.taskList$
      .asObservable()
      .pipe(delay(Math.floor(Math.random() * 1501)));
  }

  getProject(taskId: string) {
    this.task$.next(this.taskList.filter((p) => p._id == taskId)[0]);

    return this.task$
      .asObservable()
      .pipe(delay(Math.floor(Math.random() * 1501)));
  }
}
