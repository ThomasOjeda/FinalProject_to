import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Epic } from 'src/models/epic';

@Injectable({
  providedIn: 'root',
})
export class EpicService {
  epicList: Epic[] = [];
  epicList$: BehaviorSubject<Epic[]>;
  epic$: BehaviorSubject<Epic>;
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

    this.epicList$ = new BehaviorSubject<Epic[]>(this.epicList);

    this.epic$ = new BehaviorSubject<Epic>({
      _id: 'def',
      project: 'def',
      name: 'def',
      description: 'def',
      icon: 'def',
    });
  }

  getEpics() {
    return this.epicList$.asObservable();
  }

  getEpic(epicId: string) {
    this.epic$.next(this.epicList.filter((e) => e._id == epicId)[0]);

    return this.epic$.asObservable();
  }
}
