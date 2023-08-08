import { Component, OnInit } from '@angular/core';
import { Project } from 'src/models/project';
import { Epic } from 'src/models/epic';
import { EpicService } from '../../epic/services/epic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | undefined;
  epicList: Epic[] = [];

  epicListSubscription: Subscription = new Subscription();
  constructor(
    private projectService: ProjectService,
    private epicService: EpicService,
    private activatedRouteService: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.epicService
      .getEpics()
      .subscribe((epics) => (this.epicList = epics))
      .unsubscribe();
    let projectId =
      this.activatedRouteService.snapshot.paramMap.get('project-id');
    if (projectId)
      this.projectService
        .getProject(projectId)
        .subscribe((project) => (this.project = project))
        .unsubscribe();
  }

  handleEpicSelection(epicId: string) {
    this.router.navigate([epicId], { relativeTo: this.activatedRouteService });
  }
}
