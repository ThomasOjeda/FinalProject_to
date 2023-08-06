import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouteSegmentsService } from 'src/app/features/project/services/route-segments.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentRoute: string[] = [];
  currentRouteSubscription: Subscription = new Subscription();
  constructor(private routesSegmentsService: RouteSegmentsService) {}
  ngOnInit() {
    this.currentRouteSubscription = this.routesSegmentsService
      .getCurrentRoute$()
      .subscribe((cr) => (this.currentRoute = cr));
  }

  composeURL(index: number) {
    this.routesSegmentsService.navigateTo(
      this.currentRoute.slice(0, index + 1)
    );
  }

  ngOnDestroy() {
    this.currentRouteSubscription.unsubscribe();
  }
}
