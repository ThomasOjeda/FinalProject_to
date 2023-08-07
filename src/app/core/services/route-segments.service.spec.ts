import { TestBed } from '@angular/core/testing';

import { RouteSegmentsService } from './route-segments.service';

describe('RouteSegmentsService', () => {
  let service: RouteSegmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteSegmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
