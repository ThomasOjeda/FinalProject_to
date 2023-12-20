import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const hasTokenGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const routerService = inject(Router);
  if (tokenService.tokenAvailable()) return true;
  else {
    routerService.navigate(['login']);
    return false;
  }
};
