import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectsResponse } from '../my-projects/models/projects-response';
import { ProjectResponse } from '../my-projects/models/project-response';
import { environment } from 'src/environments/environment';
import { EpicsResponse } from '../../epic/models/epics-response';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpService: HttpClient) {}

  getProjects$() {
    return this.httpService.get<ProjectsResponse>(
      environment.API_URL + '/api/projects'
    ).pipe(take(1));
  }
  getProject$(projectId: string) {
    return this.httpService.get<ProjectResponse>(
      environment.API_URL + '/api/projects/' + projectId
    ).pipe(take(1));
  }

  getEpics$(projectId: string) {
    return this.httpService.get<EpicsResponse>(
      environment.API_URL + '/api/projects/' + projectId + '/epics'
    ).pipe(take(1));
  }
}
