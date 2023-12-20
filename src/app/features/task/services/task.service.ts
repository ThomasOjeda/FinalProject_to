import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TasksResponse } from '../models/tasks-response';
import { TaskResponse } from '../models/task-response';
import { Task } from 'src/models/task';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpService: HttpClient) {}

  getTasks$() {
    return this.httpService.get<TasksResponse>(
      environment.API_URL + '/api/tasks'
    ).pipe(take(1));
  }

  getTask$(taskId: string) {
    return this.httpService.get<TaskResponse>(
      environment.API_URL + '/api/tasks/' + taskId
    ).pipe(take(1));
  }

  addTask$(task: Task) {
    return this.httpService.post(environment.API_URL + '/api/tasks', task).pipe(take(1));
  }

  updateTask(updatedTask: Task) {
    return this.httpService.patch(
      environment.API_URL + '/api/tasks/' + updatedTask._id,
      updatedTask
    ).pipe(take(1));
  }

  deleteTask(deletedTask: Task) {
    return this.httpService.delete(
      environment.API_URL + '/api/tasks/' + deletedTask._id
    ).pipe(take(1));
  }
}
