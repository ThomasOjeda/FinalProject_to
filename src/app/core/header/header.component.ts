import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouteSegmentsService } from '../services/route-segments.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  mainSegment: string = '';
  segments: string[] = [];
  displayRouteSubscription: Subscription = new Subscription();
  constructor(
    private routesSegmentsService: RouteSegmentsService,
    private menuService: MenuService
  ) {}
  ngOnInit() {
    this.displayRouteSubscription = this.routesSegmentsService
      .getDisplayRoute$()
      .subscribe((dr) => {
        this.mainSegment = dr[0];
        this.segments = dr.slice(1);
      });
  }

  navigateToSegment(index: number) {
    this.routesSegmentsService.navigateTo(index + 2);
  }

  openMenu() {
    this.menuService.openMenu();
  }

  ngOnDestroy() {
    this.displayRouteSubscription.unsubscribe();
  }
}
