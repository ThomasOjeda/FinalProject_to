import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Story } from 'src/models/story';
import { StoryService } from '../../services/story.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss'],
})
export class StoryDetailsComponent implements OnInit{
  story!: Story;
  loadingStoryDetails = true;
  errorLoadingStoryDetails = false;

  assignedToDialogCommand: Subject<string> = new Subject<string>();
  constructor(
    private storyService: StoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const storyId = this.activatedRoute.snapshot.paramMap.get('story-id');
    if (storyId) {
      this.storyService.getStory$(storyId).subscribe({
        next: (story) => {
          this.story = story.data;
        },
        error: () => {
          this.loadingStoryDetails = false;
          this.errorLoadingStoryDetails = true;
        },
        complete: () => {
          this.loadingStoryDetails = false;
        },
      });
    }
  }

  seeMembers() {
    this.assignedToDialogCommand.next('open');
  }
}
