import { Component, OnInit } from '@angular/core';
import { Project } from 'src/models/project';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent implements OnInit {
  projectList: Project[] = [];
  projectListSubscription: Subscription = new Subscription();
  loadingProjects = true;
  errorFetchingProjects = false;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private activatedRouteService: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.projectService.getProjects$().subscribe({
      next: (projects) => {
        this.projectList = projects.data;
      },
      error: () => {
        this.loadingProjects = false;
        this.errorFetchingProjects = true;
      },
      complete: () => {
        this.loadingProjects = false;
      },
    });
  }

  handleProjectSelection(projectId: string) {
    this.router.navigate([projectId], {
      relativeTo: this.activatedRouteService,
    });
  }
}
