import { Component, OnInit } from '@angular/core';
import { Story } from 'src/models/story';
import { StoryService } from '../services/story.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss'],
})
export class StoryDetailsComponent implements OnInit {
  story!: Story;
  loadingStoryDetails: boolean = true;
  errorFetchingStoryDetails: boolean = false;
  constructor(
    private storyService: StoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let storyId = this.activatedRoute.snapshot.paramMap.get('story-id');
    if (storyId) {
      this.storyService.getStory$(storyId).subscribe({
        next: (story) => {
          this.story = story.data;
        },
        error: () => {
          this.loadingStoryDetails = false;
          this.errorFetchingStoryDetails = true;
        },
        complete: () => {
          this.loadingStoryDetails = false;
        },
      });
    }
  }
}
