import { CanDeactivateFn, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface canBeDeactivated {
  canBeDeactivated():Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

export const canNavigateOutGuard: CanDeactivateFn<canBeDeactivated> = (component, currentRoute, currentState, nextState) => {
  return component.canBeDeactivated()
};
