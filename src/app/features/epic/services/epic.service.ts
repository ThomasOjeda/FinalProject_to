import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EpicsResponse } from '../models/epics-response';
import { EpicResponse } from '../models/epic-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EpicService {
  /*   epicList: Epic[] = []; */
  /*   epicList$: BehaviorSubject<Epic[]>;
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

  getEpics(projectId: string) {
    return this.epicList$
      .asObservable()
      .pipe(delay(Math.floor(Math.random() * 1501)));
  }

  getEpic(epicId: string) {
    this.epic$.next(this.epicList.filter((e) => e._id == epicId)[0]);

    return this.epic$
      .asObservable()
      .pipe(delay(Math.floor(Math.random() * 1501)));
  } */

  constructor(private httpService: HttpClient) {}

  getEpics$(projectId: string) {
    return this.httpService.get<EpicsResponse>(
      environment.API_URL + '/api/projects/' + projectId + '/epics'
    );
  }

  getEpic$(epicId: string) {
    return this.httpService.get<EpicResponse>(
      environment.API_URL + '/api/epics/' + epicId
    );
  }
}
