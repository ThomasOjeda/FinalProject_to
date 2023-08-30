export interface Task {
  _id: string;
  name: string;
  description?: string;
  story: string;
  created?: Date;
  due?: Date;
  done?: boolean;
  __v?: number;
}
