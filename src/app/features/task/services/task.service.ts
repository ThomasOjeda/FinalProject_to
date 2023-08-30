import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TasksResponse } from '../models/tasks-response';
import { TaskResponse } from '../models/task-response';
import { Task } from 'src/models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpService: HttpClient) {}

  getTasks$() {
    return this.httpService.get<TasksResponse>(
      environment.API_URL + '/api/tasks'
    );
  }

  getTask$(taskId: string) {
    return this.httpService.get<TaskResponse>(
      environment.API_URL + '/api/tasks/' + taskId
    );
  }

  addTask$(task: Task) {
    return this.httpService.post(environment.API_URL + '/api/tasks', task);
  }

  updateTask(updatedTask: Task) {
    return this.httpService.patch(
      environment.API_URL + '/api/tasks/' + updatedTask._id,
      updatedTask
    );
  }

  deleteTask(deletedTask: Task) {
    return this.httpService.delete(
      environment.API_URL + '/api/tasks/' + deletedTask._id
    );
  }
}
