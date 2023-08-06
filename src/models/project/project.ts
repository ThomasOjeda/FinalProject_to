export interface Project {
  _id: string;
  name: string;
  members: string[]; //Subject to change when user interface is defined
  description?: string;
  icon?: string;
}
