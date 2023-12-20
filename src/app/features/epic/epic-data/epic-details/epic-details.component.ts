import { Component, OnInit } from '@angular/core';
import { Epic } from 'src/models/epic';
import { EpicService } from '../../services/epic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-epic-details',
  templateUrl: './epic-details.component.html',
  styleUrls: ['./epic-details.component.scss'],
})
export class EpicDetailsComponent implements OnInit{
  epic: Epic | undefined;

  loadingEpicDetails = true;
  errorLoadingEpicDetails = false;

  constructor(
    private epicService: EpicService,
    private activatedRouteService: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadingEpicDetails = true;
    this.errorLoadingEpicDetails = false;
    const epicId = this.activatedRouteService.snapshot.paramMap.get('epic-id');
    if (epicId) {
      this.epicService.getEpic$(epicId).subscribe({
        next: (epic) => {
          this.epic = epic.data;
        },
        error: () => {
          this.errorLoadingEpicDetails = true;
          this.loadingEpicDetails = false;
        },
        complete: () => {
          this.loadingEpicDetails = false;
        },
      });
    }
  }
}
