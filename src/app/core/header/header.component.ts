import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentRoute: string[] = [];
  routerSubscription: Subscription = new Subscription();
  constructor(private routerService: Router) {}

  ngOnInit() {
    let cr = this.routerService.url.split('/');
    cr.shift();
    this.currentRoute = cr;
    this.routerSubscription = this.routerService.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          let cr = event.urlAfterRedirects.split('/');
          cr.shift();
          this.currentRoute = cr;
        }
      }
    );
  }

  composeURL(index: number) {
    this.routerService.navigate(this.currentRoute.slice(0, index + 1));
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
