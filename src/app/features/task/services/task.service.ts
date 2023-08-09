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
        name: 'Tarea1',
        description: 'This task is not easy :D',
        story: '4848516133654600',
      },
      {
        _id: '987777797877977',
        name: 'Tarea2',
        description: 'The lemons usually fall down the tree',
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

  getTasks$() {
    return this.taskList$
      .asObservable()
      .pipe(delay(Math.floor(Math.random() * 1501)));
  }

  getTask$(taskId: string) {
    this.task$.next(this.taskList.filter((t) => t._id == taskId)[0]);

    return this.task$
      .asObservable()
      .pipe(delay(Math.floor(Math.random() * 1501)));
  }

  updateTask(updatedTask: Task) {
    this.taskList[this.taskList.findIndex((t) => t._id == updatedTask._id)] =
      updatedTask;

    console.log(this.taskList);
  }

  deleteTask(deletedTask: Task) {
    delete this.taskList[
      this.taskList.findIndex((t) => t._id == deletedTask._id)
    ];
  }
}
