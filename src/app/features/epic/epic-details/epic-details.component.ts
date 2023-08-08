import { Component, OnInit } from '@angular/core';
import { Epic } from 'src/models/epic';
import { EpicService } from '../services/epic.service';
import { ActivatedRoute } from '@angular/router';
import { UserStory } from 'src/models/user-story';

@Component({
  selector: 'app-epic-details',
  templateUrl: './epic-details.component.html',
  styleUrls: ['./epic-details.component.scss'],
})
export class EpicDetailsComponent implements OnInit {
  epic: Epic | undefined;
  userStoryList: UserStory[] = [];
  constructor(
    private epicService: EpicService,
    private activatedRouteService: ActivatedRoute
  ) {}

  ngOnInit() {
    let epicId = this.activatedRouteService.snapshot.paramMap.get('epic-id');
    if (epicId)
      this.epicService
        .getEpic(epicId)
        .subscribe((epic) => (this.epic = epic))
        .unsubscribe();
  }

  handleUserStorySelection(userStoryId: string) {}
}
