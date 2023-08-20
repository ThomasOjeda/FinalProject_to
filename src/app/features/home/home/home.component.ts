import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  map,
  fromEvent,
  startWith,
  debounceTime,
  distinctUntilChanged,
  Subscription,
} from 'rxjs';
import { SearchService } from '../services/search.service';
import { Project } from 'src/models/project';
import { SearchResult } from '../../../../models/search-result';
import { Router } from '@angular/router';
import { EpicService } from '../../epic/services/epic.service';
import { StoryService } from '../../story/services/story.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef;

  search: string = '';
  searchType: string = 'projects';
  searchInputSubscription: Subscription = new Subscription();
  searchServiceSubscription: Subscription = new Subscription();

  searchResults: SearchResult[] = [];

  loadingResults: boolean = true;
  errorFetchingResults: boolean = false;

  theme: string = '';
  themeSubscription: Subscription = new Subscription();
  constructor(
    private searchService: SearchService,
    private epicService: EpicService,
    private storyService: StoryService,
    private routerService: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService
      .getTheme$()
      .subscribe((theme) => (this.theme = theme));
  }

  ngAfterViewInit(): void {
    this.searchInputSubscription = fromEvent<KeyboardEvent>(
      this.searchInput.nativeElement,
      'keyup'
    )
      .pipe(
        map((event) => {
          if (event.target) return (event.target as HTMLInputElement).value;
          return '';
        }),
        startWith(''),
        debounceTime(600),
        distinctUntilChanged()
      )
      .subscribe((value) => this.searchFor(value));
  }

  handleSelectorChanged() {
    this.searchFor(this.search);
  }

  searchFor(value: string) {
    this.loadingResults = true;
    this.errorFetchingResults = false;
    this.searchResults = [];
    this.searchServiceSubscription.unsubscribe();
    this.searchServiceSubscription = this.searchService
      .search(value, this.searchType)
      .subscribe({
        next: (results) => {
          this.searchResults = results;
        },
        error: () => {
          this.loadingResults = false;
          this.errorFetchingResults = true;
        },
        complete: () => {
          this.loadingResults = false;
        },
      });
  }

  handleElementClick(clicked: SearchResult) {
    this.loadingResults = true;
    switch (clicked.type) {
      case 1:
        this.navigateToProject(clicked);
        break;
      case 2:
        this.navigateToEpic(clicked);
        break;
      case 3:
        this.navigateToStory(clicked);
        break;
      case 4:
        this.navigateToTask(clicked);
        break;

      default:
        break;
    }
  }

  navigateToProject(selectedProject: SearchResult) {
    this.routerService.navigate(['my-projects', selectedProject.data._id]);
  }

  navigateToEpic(selectedEpic: SearchResult) {
    this.routerService.navigate([
      'my-projects',
      selectedEpic.data.parent,
      selectedEpic.data._id,
    ]);
  }

  navigateToStory(selectedStory: SearchResult) {
    //Get the projectId of the epic that is the parent of this selected story
    this.epicService
      .getProjectId$(selectedStory.data.parent)
      .subscribe((projectId) => {
        this.routerService.navigate([
          'my-projects',
          projectId,
          selectedStory.data.parent,
          selectedStory.data._id,
        ]);
      });
  }

  navigateToTask(selectedTask: SearchResult) {
    //Get the epicId of the story that is the parent of this selected task
    this.storyService
      .getEpicId$(selectedTask.data.parent)
      .subscribe((epicId) => {
        //Get the projectId of the epic
        this.epicService.getProjectId$(epicId).subscribe((projectId) => {
          this.routerService.navigate([
            'my-projects',
            projectId,
            epicId,
            selectedTask.data.parent,
            selectedTask.data._id,
          ]);
        });
      });
  }

  configureAccent(type: number) {
    switch (type) {
      case 1:
        return '#b977ae';
      case 2:
        return '#ce6c42';
      case 3:
        return '#c49f49';
      case 4:
        return '#83eede';
      default:
        return '#83eede';
    }
  }

  ngOnDestroy(): void {
    this.searchInputSubscription.unsubscribe();
    this.searchServiceSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }
}
