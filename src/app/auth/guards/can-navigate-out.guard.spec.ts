import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { canNavigateOutGuard } from './can-navigate-out.guard';

describe('canNavigateOutGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canNavigateOutGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
