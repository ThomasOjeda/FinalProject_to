import { Component, OnInit } from '@angular/core';
import { Epic } from 'src/models/epic';
import { EpicService } from '../services/epic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Story } from 'src/models/story';
import { StoryService } from '../../story/services/story.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-epic-details',
  templateUrl: './epic-details.component.html',
  styleUrls: ['./epic-details.component.scss'],
})
export class EpicDetailsComponent implements OnInit {
  epic: Epic | undefined;
  storyList: Story[] = [];
  constructor(
    private epicService: EpicService,
    private storyService: StoryService,
    private router: Router,
    private activatedRouteService: ActivatedRoute
  ) {}

  ngOnInit() {
    let epicId = this.activatedRouteService.snapshot.paramMap.get('epic-id');
    if (epicId) {
      this.epicService
        .getEpic(epicId)
        .pipe(take(1))
        .subscribe((epic) => (this.epic = epic));

      this.storyService
        .getStories(epicId)
        .pipe(take(1))
        .subscribe((stories) => (this.storyList = stories));
    }
  }

  handleStorySelection(storyId: string) {
    this.router.navigate([storyId], {
      relativeTo: this.activatedRouteService,
    });
  }
}