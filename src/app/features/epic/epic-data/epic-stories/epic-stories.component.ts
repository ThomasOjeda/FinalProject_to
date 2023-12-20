import { Component, OnInit } from '@angular/core';
import { Story } from 'src/models/story';
import { EpicService } from '../../services/epic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-epic-stories',
  templateUrl: './epic-stories.component.html',
  styleUrls: ['./epic-stories.component.scss'],
})
export class EpicStoriesComponent implements OnInit{
  storyList: Story[] = [];
  storyListDone: Story[] = [];
  storyListRunning: Story[] = [];
  storyListTodo: Story[] = [];

  loadingStories = true;
  errorLoadingStories = false;

  constructor(
    private epicService: EpicService,
    private router: Router,
    private activatedRouteService: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadingStories = true;
    this.errorLoadingStories = false;
    const epicId = this.activatedRouteService.snapshot.paramMap.get('epic-id');
    if (epicId) {
      this.epicService.getStories$(epicId).subscribe({
        next: (stories) => {
          this.storyList = stories.data;
          this.storyListDone = this.storyList.filter(
            (story) => story.status == 'done'
          );
          this.storyListRunning = this.storyList.filter(
            (story) => story.status == 'running'
          );
          this.storyListTodo = this.storyList.filter(
            (story) => story.status == 'todo'
          );
        },
        error: () => {
          this.errorLoadingStories = true;
          this.loadingStories = false;
        },
        complete: () => {
          this.loadingStories = false;
        },
      });
    }
  }
}
