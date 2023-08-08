import { Component, OnInit } from '@angular/core';
import { Project } from 'src/models/project/project';
import { Epic } from 'src/models/project/epic';
import { EpicService } from '../../epic/services/epic.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | undefined;
  epicList: Epic[] = [];
  constructor(
    private projectService: ProjectService,
    private epicService: EpicService,
    private activatedRouteService: ActivatedRoute
  ) {}

  ngOnInit() {
    this.epicList = this.epicService.getEpics();
    let projectId =
      this.activatedRouteService.snapshot.paramMap.get('project-id');
    if (projectId)
      this.projectService
        .getProject(projectId)
        .subscribe((project) => (this.project = project))
        .unsubscribe();
  }
}
