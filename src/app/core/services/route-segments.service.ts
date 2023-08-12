import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Event, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EpicService } from 'src/app/features/epic/services/epic.service';
import { ProjectService } from 'src/app/features/project/services/project.service';
import { StoryService } from 'src/app/features/story/services/story.service';

@Injectable({
  providedIn: 'root',
})
export class RouteSegmentsService implements OnDestroy {
  currentRoute: string[] = []; //Holds the real route segments
  currentRoute$: BehaviorSubject<string[]>;

  routerSubscription: Subscription = new Subscription();

  displayRoute: string[] = []; //Holds the readable route segments
  displayRoute$: BehaviorSubject<string[]>;

  projectServiceSubscription: Subscription = new Subscription();
  epicServiceSubscription: Subscription = new Subscription();
  storyServiceSubscription: Subscription = new Subscription();

  constructor(
    private routerService: Router,
    private projectService: ProjectService,
    private epicService: EpicService,
    private storyService: StoryService
  ) {
    this.currentRoute = this.routeToArray(this.routerService.url);
    this.currentRoute$ = new BehaviorSubject<string[]>(this.currentRoute);
    this.displayRoute = [...this.currentRoute];
    this.displayRoute$ = new BehaviorSubject<string[]>(this.displayRoute);
    this.beautifyDisplayRoute();
    this.routerSubscription = this.routerService.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.routeToArray(event.urlAfterRedirects);
          this.currentRoute$.next(this.currentRoute);
          this.displayRoute = [...this.currentRoute];
          this.displayRoute$.next(this.displayRoute);
          this.beautifyDisplayRoute();
        }
      }
    );
  }

  beautifyDisplayRoute() {
    //Unsubscribe first to stop previous unfinished requests
    this.projectServiceSubscription.unsubscribe();
    this.epicServiceSubscription.unsubscribe();
    this.storyServiceSubscription.unsubscribe();

    if (this.currentRoute.length < 2) return;

    this.projectServiceSubscription = this.projectService
      .getProject(this.currentRoute[1])
      .subscribe((project) => {
        this.displayRoute[1] = project.data.name;
        this.displayRoute$.next(this.displayRoute);
      });

    if (this.currentRoute.length < 3) return;

    this.epicServiceSubscription = this.epicService
      .getEpic(this.currentRoute[2])
      .subscribe((epic) => {
        this.displayRoute[2] = epic.data.name;
        this.displayRoute$.next(this.displayRoute);
      });

    if (this.currentRoute.length < 4) return;

    this.storyServiceSubscription = this.storyService
      .getStory(this.currentRoute[3])
      .subscribe((story) => {
        this.displayRoute[3] = story.name;
        this.displayRoute$.next(this.displayRoute);
      });
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
