import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouteSegmentsService } from 'src/app/features/project/services/route-segments.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  displayRoute: string[] = [];
  displayRouteSubscription: Subscription = new Subscription();
  constructor(private routesSegmentsService: RouteSegmentsService) {}
  ngOnInit() {
    this.displayRouteSubscription = this.routesSegmentsService
      .getDisplayRoute$()
      .subscribe((dr) => (this.displayRoute = dr));
  }

  navigateToSegment(index: number) {
    this.routesSegmentsService.navigateTo(index + 1);
  }

  ngOnDestroy() {
    this.displayRouteSubscription.unsubscribe();
  }
}
