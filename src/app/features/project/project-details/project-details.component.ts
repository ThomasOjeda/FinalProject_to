import { Component, OnInit } from '@angular/core';
import { Project } from 'src/models/project';
import { Epic } from 'src/models/epic';
import { EpicService } from '../../epic/services/epic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project!: Project;
  epicList: Epic[] = [];

  epicListSubscription: Subscription = new Subscription();

  loadingEpics: boolean = true;
  loadingProjectDetails: boolean = true;
  errorFetchingEpics = false;
  errorFetchingProjectDetails = false;
  constructor(
    private projectService: ProjectService,
    private epicService: EpicService,
    private activatedRouteService: ActivatedRoute,
    private router: Router
  ) {}

  /*   ngOnInit() {
    let projectId =
      this.activatedRouteService.snapshot.paramMap.get('project-id');
    if (projectId) {
      this.projectService
        .getProject(projectId)
        .pipe(take(1))
        .subscribe((project) => (this.project = project));
      this.epicService
        .getEpics(projectId)
        .pipe(take(1))
        .subscribe((epics) => (this.epicList = epics));
    }
  } */

  ngOnInit(): void {
    this.loadingEpics = true;
    this.loadingProjectDetails = true;
    this.errorFetchingEpics = false;
    this.errorFetchingProjectDetails = false;
    let projectId =
      this.activatedRouteService.snapshot.paramMap.get('project-id');
    if (projectId) {
      this.projectService.getProject$(projectId).subscribe({
        next: (project) => {
          this.project = project.data;
        },
        error: (error) => {
          this.loadingProjectDetails = false;
          this.errorFetchingProjectDetails = true;
        },
        complete: () => {
          this.loadingProjectDetails = false;
        },
      });
      this.projectService.getEpics$(projectId).subscribe({
        next: (epics) => {
          this.epicList = epics.data;
        },
        error: (error) => {
          this.loadingEpics = false;
          this.errorFetchingEpics = true;
        },
        complete: () => {
          this.loadingEpics = false;
        },
      });
    }
  }

  handleEpicSelection(epicId: string) {
    this.router.navigate([epicId], { relativeTo: this.activatedRouteService });
  }
}
