import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Story } from 'src/models/story';
import { StoryService } from '../services/story.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.scss']
})
export class MyStoriesComponent implements OnInit {
  storyList: Story[] = [];
  storyListSubscription: Subscription = new Subscription();
  loadingStories: boolean = true;
  errorFetchingStories: boolean = false;
  constructor(
    private storyService: StoryService,

  ) {}
  ngOnInit(): void {
    this.storyService.getStories$().subscribe({
      next: (stories) => {
        this.storyList = stories.data;
      },
      error: (err) => {
        this.loadingStories = false;
        this.errorFetchingStories = true;
      },
      complete: () => {
        this.loadingStories = false;
      },
    });
  }

}
