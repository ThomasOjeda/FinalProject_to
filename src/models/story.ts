export interface Story {
  _id: string;
  name: string;
  owner?: string;
  epic: string;
  created?: Date;
  due?: Date;
  started?: Date;
  finished?: Date;
  status?: string;
  points?: number;
  assignedTo?: string[];
  description?: string;
  icon?: string;
  __v?: number;
}
