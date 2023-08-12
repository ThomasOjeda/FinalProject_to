import { Task } from 'src/models/task';

export interface TaskResponse {
  status: string;
  data: Task;
}
