import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Event, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProjectService } from 'src/app/features/project/services/project.service';

@Injectable({
  providedIn: 'root',
})
export class RouteSegmentsService implements OnDestroy {
  currentRoute: string[] = [];
  currentRoute$: BehaviorSubject<string[]>; // creamos el subject

  routerSubscription: Subscription = new Subscription();

  displayRoute: string[] = [];
  displayRoute$: BehaviorSubject<string[]>; // creamos el subject

  constructor(
    private routerService: Router,
    private projectService: ProjectService
  ) {
    this.currentRoute = this.routeToArray(this.routerService.url);

    this.currentRoute$ = new BehaviorSubject<string[]>(this.currentRoute);
    this.displayRoute = [...this.currentRoute];
    this.displayRoute$ = new BehaviorSubject<string[]>(this.displayRoute);
    this.beautifyCurrentRoute();
    this.routerSubscription = this.routerService.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.routeToArray(event.urlAfterRedirects);
          this.currentRoute$.next(this.currentRoute);
          this.displayRoute = [...this.currentRoute];
          this.displayRoute$.next(this.displayRoute);
          this.beautifyCurrentRoute();
        }
      }
    );
  }

  beautifyCurrentRoute() {
    if (this.currentRoute.length < 2) return;

    this.projectService
      .getProject(this.currentRoute[1])
      .subscribe((project) => {
        this.displayRoute[1] = project.name;
        this.displayRoute$.next(this.displayRoute);
      })
      .unsubscribe();
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
  }
}
