import { Component } from '@angular/core';
import { Project } from 'src/models/project/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent {
  projectList: Project[] = [];

  constructor(projectService: ProjectService) {
    this.projectList = projectService.getProjects();
  }
}
