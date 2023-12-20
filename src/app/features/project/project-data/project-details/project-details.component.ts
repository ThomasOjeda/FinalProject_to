import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from 'src/models/project';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit{
  project!: Project;

  loadingProjectDetails = true;
  errorLoadingProjectDetails = false;

  memberListDialogCommand: Subject<string> = new Subject<string>();
  constructor(
    private projectService: ProjectService,
    private activatedRouteService: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadingProjectDetails = true;
    this.errorLoadingProjectDetails = false;
    const projectId =
      this.activatedRouteService.snapshot.paramMap.get('project-id');
    if (projectId) {
      this.projectService.getProject$(projectId).subscribe({
        next: (project) => {
          this.project = project.data;
        },
        error: () => {
          this.loadingProjectDetails = false;
          this.errorLoadingProjectDetails = true;
        },
        complete: () => {
          this.loadingProjectDetails = false;
        },
      });
    }
  }

  seeMembers() {
    this.memberListDialogCommand.next('open');
  }
}
