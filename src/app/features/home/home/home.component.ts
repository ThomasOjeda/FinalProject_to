import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import {
  map,
  fromEvent,
  startWith,
  debounceTime,
  distinctUntilChanged,
  Subscription,
  Observable,
  tap,
  pluck,
  merge,
  zip,
  combineLatest,
  mergeAll,
  mergeMap,
  switchMap,
  of,
} from 'rxjs';
import { SearchService } from '../services/search.service';
import { SearchResult } from '../../../../models/search-result';
import { Router, UrlTree } from '@angular/router';
import { EpicService } from '../../epic/services/epic.service';
import { StoryService } from '../../story/services/story.service';
import { canBeDeactivated } from 'src/app/auth/guards/can-navigate-out.guard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent
  implements AfterViewInit, OnDestroy, canBeDeactivated
{
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('searchTypeInput') searchTypeInput!: ElementRef;

  searchInputSubscription: Subscription = new Subscription();
  searchServiceSubscription: Subscription = new Subscription();

  searchResults: SearchResult[] = [];

  loadingResults = true;
  errorFetchingResults = false;

  constructor(
    private searchService: SearchService,
    private epicService: EpicService,
    private storyService: StoryService,
    private routerService: Router
  ) {}

  canBeDeactivated():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.searchInput.nativeElement.value !== '')
      return confirm(
        'Are you sure you want to navigate out? all changes will be lost'
      );
    return true;
  }

  ngAfterViewInit(): void {
    const typeObs$ = fromEvent<Event>(
      this.searchTypeInput.nativeElement,
      'change'
    ).pipe(
      map((event) => {
        return (event.target as HTMLInputElement).value;
      }),
      startWith('projects')
    );

    const queryObs$ = fromEvent<KeyboardEvent>(
      this.searchInput.nativeElement,
      'keyup'
    ).pipe(
      debounceTime(600),
      map((event) => {
        return (event.target as HTMLInputElement).value;
      }),
      distinctUntilChanged(),
      startWith('')
    );

    this.searchInputSubscription = combineLatest([
      queryObs$,
      typeObs$,
    ]).subscribe(([value, type]) => this.searchFor(value, type));
  }

  searchFor(value: string, type: string) {
    this.loadingResults = true;
    this.errorFetchingResults = false;
    this.searchResults = [];
    this.searchServiceSubscription.unsubscribe();
    this.searchServiceSubscription = this.searchService
      .search(value, type)
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
    console.log('sas');
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
      .pipe(
        switchMap((epic) => {
          return zip(this.epicService.getProjectId$(epic),of(epic));
        })
      )
      .subscribe((ids) => {
         this.routerService.navigate([
          'my-projects',
          ids[0],
          ids[1],
          selectedTask.data.parent,
          selectedTask.data._id,
        ]); 
      });

/*     this.storyService
      .getEpicId$(selectedTask.data.parent)
      .subscribe((epicId) => {
        //Get the projectId of the epic
        this.epicService.getProjectId$(epicId).subscribe((projectId) => {
          console.log(
            projectId,
            epicId,
            selectedTask.data.parent,
            selectedTask.data._id
          );
          this.routerService.navigate([
            'my-projects',
            projectId,
            epicId,
            selectedTask.data.parent,
            selectedTask.data._id,
          ]);
        });
      }); */
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
  }
}
