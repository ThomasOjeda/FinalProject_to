import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Story } from 'src/models/story';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() title: string = '';
  @Input() stories: Story[] = [];

  constructor(
    private routerService: Router,
    private activatedRouteService: ActivatedRoute
  ) {}

  handleStorySelection(storyId: string) {
    this.routerService.navigate([storyId], {
      relativeTo: this.activatedRouteService,
    });
  }
}
