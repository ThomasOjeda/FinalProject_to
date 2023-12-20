import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Story } from 'src/models/story';
import { StoryService } from '../services/story.service';
import { Router } from '@angular/router';
import { EpicService } from '../../epic/services/epic.service';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.scss']
})
export class MyStoriesComponent implements OnInit {
  storyList: Story[] = [];
  storyListSubscription: Subscription = new Subscription();
  loadingStories = true;
  errorFetchingStories = false;
  constructor(
    private storyService: StoryService,
    private epicService:EpicService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.storyService.getStories$().subscribe({
      next: (stories) => {
        this.storyList = stories.data;
      },
      error: () => {
        this.loadingStories = false;
        this.errorFetchingStories = true;
      },
      complete: () => {
        this.loadingStories = false;
      },
    });
  }
  handleStoryClick(story:Story){
    this.epicService.getProjectId$(story.epic).subscribe((project)=>{
      this.router.navigate(["my-projects",project,story.epic,story._id])
    })
  }

}
