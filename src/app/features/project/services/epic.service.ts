import { Injectable } from '@angular/core';
import { Epic } from 'src/models/project/epic';

@Injectable({
  providedIn: 'root',
})
export class EpicService {
  epicList: Epic[] = [];
  constructor() {
    this.epicList = [
      {
        _id: '14111111141141414',
        project: 'PROYA',
        name: 'epic2',
        description: 'epic2d esc',
        icon: 'nose',
      },
      {
        _id: '36666633633333363',
        project: 'PROYA',
        name: 'epic1',
        description: 'epic1d esc',
        icon: 'nose',
      },
    ];
  }

  getEpics() {
    return this.epicList;
  }
}
