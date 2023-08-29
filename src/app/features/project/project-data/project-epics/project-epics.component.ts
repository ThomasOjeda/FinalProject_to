import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Epic } from 'src/models/epic';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-epics',
  templateUrl: './project-epics.component.html',
  styleUrls: ['./project-epics.component.scss'],
})
export class ProjectEpicsComponent {
  epicList: Epic[] = [];

  epicListSubscription: Subscription = new Subscription();

  loadingEpics: boolean = true;
  errorLoadingEpics = false;

  constructor(
    private projectService: ProjectService,
    private activatedRouteService: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingEpics = true;
    this.errorLoadingEpics = false;
    let projectId =
      this.activatedRouteService.snapshot.paramMap.get('project-id');
    if (projectId) {
      this.projectService.getEpics$(projectId).subscribe({
        next: (epics) => {
          this.epicList = epics.data;
        },
        error: (error) => {
          this.loadingEpics = false;
          this.errorLoadingEpics = true;
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
