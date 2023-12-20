import { Injectable } from '@angular/core';
import { ProjectService } from '../../project/services/project.service';
import { EpicService } from '../../epic/services/epic.service';
import { StoryService } from '../../story/services/story.service';
import { TaskService } from '../../task/services/task.service';
import {  map } from 'rxjs';
import { SearchResult } from '../../../../models/search-result';

@Injectable({
  providedIn: 'root',
})
export class SearchService  {
  constructor(
    private projectService: ProjectService,
    private epicService: EpicService,
    private storyService: StoryService,
    private taskService: TaskService
  ) {}

  search(value: string, searchType: string) {
    switch (searchType) {
      case 'projects':
        return this.searchForProjects(value);
      case 'epics':
        return this.searchForEpics(value);
      case 'stories':
        return this.searchForStories(value);
      case 'tasks':
        return this.searchForTasks(value);
      default:
        return this.searchForProjects(value);
    }
  }

  searchForProjects(value: string) {
    return this.projectService.getProjects$().pipe(
      map((response) =>
        response.data
          .filter((project) => project.name.toLowerCase().includes(value))
          .map((project) => {
            const result: SearchResult = {
              type: 1,
              data: {
                _id: project._id,
                parent: '',
                name: project.name,
                description: project.description || '',
                icon: project.icon,
              },
            };
            return result;
          })
      )
    );
  }

  searchForEpics(value: string) {
    return this.epicService.getEpics$().pipe(
      map((response) =>
        response.data
          .filter((epic) => epic.name.toLowerCase().includes(value))
          .map((epic) => {
            const result: SearchResult = {
              type: 2,
              data: {
                _id: epic._id,
                parent: epic.project,
                name: epic.name,
                description: epic.description || '',
                icon: epic.icon,
              },
            };
            return result;
          })
      )
    );
  }

  searchForStories(value: string) {
    return this.storyService.getStories$().pipe(
      map((response) =>
        response.data
          .filter((story) => story.name.toLowerCase().includes(value))
          .map((story) => {
            const result: SearchResult = {
              type: 3,
              data: {
                _id: story._id,
                parent: story.epic,
                name: story.name,
                description: story.description || '',
                icon: story.icon,
              },
            };
            return result;
          })
      )
    );
  }

  searchForTasks(value: string) {
    return this.taskService.getTasks$().pipe(
      map((response) =>
        response.data
          .filter((task) => task.name.toLowerCase().includes(value))
          .map((task) => {
            const result: SearchResult = {
              type: 4,
              data: {
                _id: task._id,
                parent: task.story,
                name: task.name,
                description: task.description || '',
              },
            };
            return result;
          })
      )
    );
  }

}
