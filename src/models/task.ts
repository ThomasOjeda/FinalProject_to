export interface Task {
  _id: string;
  name: string;
  description?: string;
  story: string;
  created?: Date;
  dueDate?: Date;
  done?: boolean;
  __v?: number;
}
