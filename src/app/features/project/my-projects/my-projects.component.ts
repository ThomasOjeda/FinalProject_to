import { Component } from '@angular/core';
import { Project } from 'src/models/project/project';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent {
  projectList: Project[] = [];

  constructor(projectService: ProjectService, private router: Router) {
    this.projectList = projectService.getProjects();
  }

  handleProjectSelection(projectId: string) {
    this.router.navigateByUrl('/my-projects/' + projectId);
  }
}
