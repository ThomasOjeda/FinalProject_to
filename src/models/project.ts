export interface Project {
  _id: string;
  name: string;
  members: string[]; //Subject to change when user interface is defined
  owner: string;
  description?: string;
  icon?: string;
  __v?: number;
}
