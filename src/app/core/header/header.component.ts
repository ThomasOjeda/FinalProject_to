import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouteSegmentsService } from '../services/route-segments.service';
import { MenuService } from '../services/menu.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  mainSegment: string = '';
  segments: string[] = [];
  displayRouteSubscription: Subscription = new Subscription();
  themeSubscription: Subscription = new Subscription();
  theme: string = '';
  constructor(
    private routesSegmentsService: RouteSegmentsService,
    private menuService: MenuService,
    private themeService: ThemeService
  ) {}
  ngOnInit() {
    this.displayRouteSubscription = this.routesSegmentsService
      .getDisplayRoute$()
      .subscribe((dr) => {
        this.mainSegment = dr[0];
        this.segments = dr.slice(1);
      });

    this.themeSubscription = this.themeService
      .getTheme$()
      .subscribe((theme) => {
        this.theme = theme;
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
    this.themeSubscription.unsubscribe();
  }
}
