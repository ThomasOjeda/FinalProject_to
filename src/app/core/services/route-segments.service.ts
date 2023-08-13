import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Event, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EpicService } from 'src/app/features/epic/services/epic.service';
import { ProjectService } from 'src/app/features/project/services/project.service';
import { StoryService } from 'src/app/features/story/services/story.service';
import { TaskService } from 'src/app/features/task/services/task.service';

@Injectable({
  providedIn: 'root',
})
export class RouteSegmentsService implements OnDestroy {
  currentRoute: string[] = []; //Holds the real route segments
  currentRoute$: BehaviorSubject<string[]>;

  routerSubscription: Subscription = new Subscription();

  displayRoute: string[] = []; //Holds the readable route segments
  displayRoute$: BehaviorSubject<string[]>;

  lastRoute: string[] = [];

  projectServiceSubscription: Subscription = new Subscription();
  epicServiceSubscription: Subscription = new Subscription();
  storyServiceSubscription: Subscription = new Subscription();
  taskServiceSubscription: Subscription = new Subscription();

  constructor(
    private routerService: Router,
    private projectService: ProjectService,
    private epicService: EpicService,
    private storyService: StoryService,
    private taskService: TaskService
  ) {
    //this.currentRoute = this.routeToArray(this.routerService.url);
    //this.currentRoute$ = new BehaviorSubject<string[]>(this.currentRoute);
    this.currentRoute$ = new BehaviorSubject<string[]>([]);
    //this.displayRoute[0] = this.currentRoute[0];
    //this.displayRoute = [...this.currentRoute];
    //this.displayRoute$ = new BehaviorSubject<string[]>(this.displayRoute);
    this.displayRoute$ = new BehaviorSubject<string[]>([]);

    //this.beautifyDisplayRoute();
    this.routerSubscription = this.routerService.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          this.lastRoute = [...this.currentRoute];
          this.currentRoute = this.routeToArray(event.urlAfterRedirects);
          this.currentRoute$.next(this.currentRoute);
          //this.displayRoute = [...this.currentRoute];
          //this.displayRoute$.next(this.displayRoute);
          this.beautifyDisplayRoute();
        }
      }
    );
  }

  invalidIndex(index: number) {
    return this.currentRoute.length - 1 < index; //The requested index is invalid
  }

  segmentHasChanged(index: number) {
    return (
      this.lastRoute.length <= 0 || //There is no last route OR
      this.lastRoute[index] != this.currentRoute[index] //The last segment is different that the current segment
    );
  }

  beautifyDisplayRoute() {
    //Unsubscribe first to stop previous unfinished requests
    this.projectServiceSubscription.unsubscribe();
    this.epicServiceSubscription.unsubscribe();
    this.storyServiceSubscription.unsubscribe();
    this.taskServiceSubscription.unsubscribe();

    //In case there are fewer segments in the current route, remove them from the display route
    this.displayRoute = this.displayRoute.slice(0, this.currentRoute.length);

    this.displayRoute[0] = beautifyFirstSegment(this.currentRoute[0]);
    this.displayRoute$.next(this.displayRoute);

    if (this.invalidIndex(1)) {
      return;
    }
    if (this.segmentHasChanged(1)) {
      this.displayRoute[1] = this.currentRoute[1];
      this.displayRoute$.next(this.displayRoute);
      this.projectServiceSubscription = this.projectService
        .getProject$(this.currentRoute[1])
        .subscribe((project) => {
          this.displayRoute[1] = project.data.name;
          this.displayRoute$.next(this.displayRoute);
        });
    }

    if (this.invalidIndex(2)) {
      return;
    }
    if (this.segmentHasChanged(2)) {
      this.displayRoute[2] = this.currentRoute[2];
      this.displayRoute$.next(this.displayRoute);
      this.epicServiceSubscription = this.epicService
        .getEpic$(this.currentRoute[2])
        .subscribe((epic) => {
          this.displayRoute[2] = epic.data.name;
          this.displayRoute$.next(this.displayRoute);
        });
    }

    if (this.invalidIndex(3)) {
      return;
    }
    if (this.segmentHasChanged(3)) {
      this.displayRoute[3] = this.currentRoute[3];
      this.displayRoute$.next(this.displayRoute);
      this.storyServiceSubscription = this.storyService
        .getStory$(this.currentRoute[3])
        .subscribe((story) => {
          this.displayRoute[3] = story.data.name;
          this.displayRoute$.next(this.displayRoute);
        });
    }

    if (this.invalidIndex(4)) {
      return;
    }
    if (this.segmentHasChanged(4)) {
      this.displayRoute[4] = this.currentRoute[4];
      this.displayRoute$.next(this.displayRoute);
      this.taskServiceSubscription = this.taskService
        .getTask$(this.currentRoute[4])
        .subscribe((task) => {
          this.displayRoute[4] = task.data.name;
          this.displayRoute$.next(this.displayRoute);
        });
    }
  }

  private routeToArray(r: string): string[] {
    let cr = r.split('/');
    cr.shift();
    return cr;
  }

  navigateTo(segmentIndex: number) {
    this.routerService.navigate(this.currentRoute.slice(0, segmentIndex));
  }

  getCurrentRoute$() {
    return this.currentRoute$.asObservable();
  }

  getDisplayRoute$() {
    return this.displayRoute$.asObservable();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();

    this.projectServiceSubscription.unsubscribe();
    this.epicServiceSubscription.unsubscribe();
    this.storyServiceSubscription.unsubscribe();
  }
}
function beautifyFirstSegment(segment: string): string {
  if (segment == 'my-projects') return 'My Projects';
  if (segment == 'home') return 'Home';
  if (segment == 'my-stories') return 'My User Stories';
  if (segment == 'settings') return 'Settings';
  return 'Section';
}
