import { Project } from 'src/models/project';

export interface ProjectResponse {
  status: string;
  data: Project;
}
