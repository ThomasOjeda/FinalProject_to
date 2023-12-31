import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EpicsResponse } from '../models/epics-response';
import { EpicResponse } from '../models/epic-response';
import { environment } from 'src/environments/environment';
import { StoriesResponse } from '../../story/models/stories-response';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EpicService {
  constructor(private httpService: HttpClient) {}

  getStories$(epicId: string) {
    return this.httpService.get<StoriesResponse>(
      environment.API_URL + '/api/epics/' + epicId + '/stories'
    ).pipe(take(1));
  }

  getEpic$(epicId: string) {
    return this.httpService.get<EpicResponse>(
      environment.API_URL + '/api/epics/' + epicId
    ).pipe(take(1));
  }

  getEpics$() {
    return this.httpService.get<EpicsResponse>(
      environment.API_URL + '/api/epics/'
    ).pipe(take(1));
  }

  getProjectId$(epicId: string) {
    return this.getEpic$(epicId).pipe(
      map((response) => {
        return response.data.project;
      }),
      take(1)
    );
  }
}
