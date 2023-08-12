import { Task } from 'src/models/task';

export interface TasksResponse {
  status: string;
  data: Task[];
}
