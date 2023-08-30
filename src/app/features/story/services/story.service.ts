import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoriesResponse } from '../models/stories-response';
import { StoryResponse } from '../models/story-response';
import { environment } from 'src/environments/environment';
import { TasksResponse } from '../../task/models/tasks-response';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor(private httpService: HttpClient) {}

  getStory$(storyId: string) {
    return this.httpService.get<StoryResponse>(
      environment.API_URL + '/api/stories/' + storyId
    );
  }

  getStories$() {
    return this.httpService.get<StoriesResponse>(
      environment.API_URL + '/api/stories'
    );
  }

  getTasks$(storyId: string) {
    return this.httpService.get<TasksResponse>(
      environment.API_URL + '/api/stories/' + storyId + '/tasks'
    );
  }

  getEpicId$(storyId: string) {
    return this.getStory$(storyId).pipe(
      map((response) => {
        return response.data.epic;
      })
    );
  }
}
