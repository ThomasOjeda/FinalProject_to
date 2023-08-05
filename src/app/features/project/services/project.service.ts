import { Injectable } from '@angular/core';
import { Project } from 'src/models/project/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectList: Project[] = [];
  constructor() {
    this.projectList = [
      {
        name: 'P1',
        members: ['lionel messi', 'cristiano ronaldo'],
        description: 'A dream project',
        icon: '(☞ﾟヮﾟ)☞',
      },
      {
        name: 'P2',
        members: ['oca', 'andreani'],
        description: 'A postal project',
        icon: '🚗',
      },
    ];
  }

  getProjects() {
    return this.projectList;
  }
}
