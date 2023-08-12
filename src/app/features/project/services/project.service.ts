import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectsResponse } from '../my-projects/models/projects-response';
import { ProjectResponse } from '../my-projects/models/project-response';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  /*   projectList: Project[] = [];
   */ /*   projectList$: BehaviorSubject<Project[]>;
  project$: BehaviorSubject<Project>;
  constructor() {
    this.projectList = [
      {
        _id: '8441as5a8sd465165',
        name: 'P111',
        members: ['lionel messi', 'cristiano ronaldo'],
        description: 'A dream project',
        icon: '(☞ﾟヮﾟ)☞',
        owner: '326456165456161',
      },
      {
        _id: '987777797877977',
        name: 'P222',
        members: ['oca', 'andreani'],
        description: 'A postal project',
        icon: '🚗',
        owner: '326456165456161',
      },
    ];

    this.projectList$ = new BehaviorSubject<Project[]>(this.projectList);

    this.project$ = new BehaviorSubject<Project>({
      _id: 'def',
      name: 'def',
      members: ['def'],
      description: 'def',
      icon: 'def',
      owner: 'def',
    });
  } */

  /*   getProjects() {
    return this.projectList$
      .asObservable()
      .pipe(delay(Math.floor(Math.random() * 1501)));
  }

  getProject(projectId: string) {
    this.project$.next(this.projectList.filter((p) => p._id == projectId)[0]);

    return this.project$
      .asObservable()
      .pipe(delay(Math.floor(Math.random() * 1501)));
  } */

  constructor(private httpService: HttpClient) {}

  getProjects() {
    return this.httpService.get<ProjectsResponse>(
      'https://lamansysfaketaskmanagerapi.onrender.com/api/projects'
    );
  }
  getProject(projectId: string) {
    return this.httpService.get<ProjectResponse>(
      'https://lamansysfaketaskmanagerapi.onrender.com/api/projects/' +
        projectId
    );
  }
}
