import { Project } from 'src/models/project';

export interface ProjectsResponse {
  status: string;
  data: Project[];
}
