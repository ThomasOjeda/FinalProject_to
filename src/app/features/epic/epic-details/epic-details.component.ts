import { Component, OnDestroy, OnInit } from '@angular/core';
import { Epic } from 'src/models/epic';
import { EpicService } from '../services/epic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Story } from 'src/models/story';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-epic-details',
  templateUrl: './epic-details.component.html',
  styleUrls: ['./epic-details.component.scss'],
})
export class EpicDetailsComponent implements OnInit, OnDestroy {
  epic: Epic | undefined;
  storyList: Story[] = [];
  storyListDone: Story[] = [];
  storyListRunning: Story[] = [];
  storyListTodo: Story[] = [];

  loadingStories: boolean = true;
  loadingEpicDetails: boolean = true;
  errorFetchingStories: boolean = false;
  errorFetchingEpicDetails: boolean = false;

  theme: string = '';
  themeSubscription: Subscription = new Subscription();
  constructor(
    private epicService: EpicService,
    private router: Router,
    private activatedRouteService: ActivatedRoute,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.loadingStories = true;
    this.loadingEpicDetails = true;
    this.errorFetchingEpicDetails = false;
    this.errorFetchingStories = false;
    let epicId = this.activatedRouteService.snapshot.paramMap.get('epic-id');
    if (epicId) {
      this.epicService.getEpic$(epicId).subscribe({
        next: (epic) => {
          this.epic = epic.data;
        },
        error: () => {
          this.errorFetchingEpicDetails = true;
          this.loadingEpicDetails = false;
        },
        complete: () => {
          this.loadingEpicDetails = false;
        },
      });

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
          this.errorFetchingStories = true;
          this.loadingStories = false;
        },
        complete: () => {
          this.loadingStories = false;
        },
      });
    }

    this.themeSubscription = this.themeService
      .getTheme$()
      .subscribe((theme) => {
        this.theme = theme;
      });
  }

  handleStorySelection(storyId: string) {
    this.router.navigate([storyId], {
      relativeTo: this.activatedRouteService,
    });
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
