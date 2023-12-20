import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Event, Router } from '@angular/router';
import { BehaviorSubject, Subscription, map } from 'rxjs';
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

  requestObservables = [
    (id: string) => {
      return this.projectService.getProject$(id).pipe(
        map((response) => {
          return response.data.name;
        })
      );
    },
    (id: string) => {
      return this.epicService.getEpic$(id).pipe(
        map((response) => {
          return response.data.name;
        })
      );
    },
    (id: string) => {
      return this.storyService.getStory$(id).pipe(
        map((response) => {
          return response.data.name;
        })
      );
    },
    (id: string) => {
      return this.taskService.getTask$(id).pipe(
        map((response) => {
          return response.data.name;
        })
      );
    },
  ];

  requestSubscriptions = [
    new Subscription(),
    new Subscription(),
    new Subscription(),
    new Subscription(),
  ];

  constructor(
    private routerService: Router,
    private projectService: ProjectService,
    private epicService: EpicService,
    private storyService: StoryService,
    private taskService: TaskService
  ) {
    this.currentRoute$ = new BehaviorSubject<string[]>([]);
    this.displayRoute$ = new BehaviorSubject<string[]>([]);
    this.routerSubscription = this.routerService.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          this.lastRoute = [...this.currentRoute];
          this.currentRoute = this.routeToArray(event.urlAfterRedirects);
          this.currentRoute$.next(this.currentRoute);

          this.beautifyDisplayRoute();
        }
      }
    );
  }

  validIndex(index: number) {
    return index < this.currentRoute.length; //The requested index is invalid
  }

  segmentHasChanged(index: number) {
    return (
      this.lastRoute.length <= 0 || //There is no last route OR
      this.lastRoute[index] != this.currentRoute[index] //The last segment is different that the current segment
    );
  }

  beautifyDisplayRoute() {
    //In case there are fewer segments in the current route, remove them from the display route
    this.displayRoute = this.displayRoute.slice(0, this.currentRoute.length);

    this.displayRoute[0] = beautifyFirstSegment(this.currentRoute[0]);
    this.displayRoute$.next(this.displayRoute);

    for (let index = 1; index < this.currentRoute.length; index++) {
      if (this.segmentHasChanged(index)) {
        this.requestSubscriptions[index - 1].unsubscribe(); //cancel old segment subscription
        this.displayRoute[index] = this.currentRoute[index];
        this.displayRoute$.next(this.displayRoute); //immediately provide segments even if they're not good looking
        this.requestSubscriptions[index - 1] = this.requestObservables[
          index - 1
        ](this.currentRoute[index]).subscribe((realname) => {
          this.displayRoute[index] = realname;
          this.displayRoute$.next(this.displayRoute);
        });
      }
    }

    //The subscriptions belonging to segments that:
    // - are part of the old route and
    // - not part of the new one and
    // - haven't finished yet
    //must be cancelled
    for (
      let index = this.currentRoute.length;
      index < this.lastRoute.length;
      index++
    ) {
      this.requestSubscriptions[index - 1].unsubscribe();
    }
  }

  private routeToArray(r: string): string[] {
    const cr = r.split('/');
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
    for (let index = 0; index < this.requestSubscriptions.length; index++) {
      this.requestSubscriptions[index].unsubscribe();
    }
  }
}
function beautifyFirstSegment(segment: string): string {
  switch (segment) {
    case 'my-projects':
      return 'My Projects';
    case 'home':
      return 'Home';
    case 'my-stories':
      return 'My User Stories';
    case 'settings':
      return 'Settings';
    default:
      return 'Section';
  }
}
