import { Injectable } from '@angular/core';
import { Epic } from 'src/models/project/epic';

@Injectable({
  providedIn: 'root',
})
export class EpicService {
  epicList: Epic[] = [
    {
      project: 'PROYA',
      name: 'epic2',
      description: 'epic2d esc',
      icon: 'nose',
    },
    {
      project: 'PROYA',
      name: 'epic1',
      description: 'epic1d esc',
      icon: 'nose',
    },
  ];
  constructor() {}

  getEpics() {
    return this.epicList;
  }
}
