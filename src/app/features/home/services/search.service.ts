import { Injectable, OnDestroy } from '@angular/core';
import { ProjectService } from '../../project/services/project.service';
import { EpicService } from '../../epic/services/epic.service';
import { StoryService } from '../../story/services/story.service';
import { TaskService } from '../../task/services/task.service';
import { Subscription, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnDestroy {
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
            return {
              type: 1,
              data: {
                _id: project._id,
                name: project.name,
                description: project.description || '',
              },
            };
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
            return {
              type: 1,
              data: {
                _id: epic._id,
                name: epic.name,
                description: epic.description || '',
              },
            };
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
            return {
              type: 1,
              data: {
                _id: story._id,
                name: story.name,
                description: story.description || '',
              },
            };
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
            return {
              type: 1,
              data: {
                _id: task._id,
                name: task.name,
                description: task.description || '',
              },
            };
          })
      )
    );
  }

  ngOnDestroy(): void {}
}
