import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Event, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteSegmentsService implements OnDestroy {
  currentRoute: string[] = [];
  currentRoute$: BehaviorSubject<string[]>; // creamos el subject

  routerSubscription: Subscription = new Subscription();

  displayRoute: string[] = [];
  displayRoute$!: BehaviorSubject<string[]>; // creamos el subject

  constructor(private routerService: Router) {
    this.currentRoute = this.routeToArray(this.routerService.url);
    this.currentRoute$ = new BehaviorSubject<string[]>(this.currentRoute);

    this.routerSubscription = this.routerService.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.routeToArray(event.urlAfterRedirects);
          this.currentRoute$.next(this.currentRoute);
        }
      }
    );
  }

  private routeToArray(r: string): string[] {
    let cr = r.split('/');
    cr.shift();
    return cr;
  }

  navigateTo(newRoute: string[]) {
    this.routerService.navigate(newRoute);
  }

  getCurrentRoute$() {
    return this.currentRoute$.asObservable();
  }

  getDisplayRoute() {}

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
