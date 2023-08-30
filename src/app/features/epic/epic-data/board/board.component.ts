import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Story } from 'src/models/story';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements AfterViewInit {
  @ViewChild('storyList') storyListElement!: ElementRef;

  @Input() title: string = '';
  @Input() stories: Story[] = [];
  open: boolean = true;

  constructor(
    private routerService: Router,
    private activatedRouteService: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.storyListElement.nativeElement.style.maxHeight =
      this.storyListElement.nativeElement.scrollHeight + 'px';
  }

  handleStorySelection(storyId: string) {
    this.routerService.navigate([storyId], {
      relativeTo: this.activatedRouteService,
    });
  }

  toggleBoard() {
    if (this.open) {
      this.storyListElement.nativeElement.style.maxHeight = '0px';
    } else {
      this.storyListElement.nativeElement.style.maxHeight =
        this.storyListElement.nativeElement.scrollHeight + 'px';
    }
    this.open = !this.open;
  }
}
