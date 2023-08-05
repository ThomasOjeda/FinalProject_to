import { Component } from '@angular/core';
import { Project } from 'src/models/project/project';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent {
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
}
