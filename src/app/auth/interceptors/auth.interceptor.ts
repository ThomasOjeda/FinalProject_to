import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private routerService: Router,
    private tokenService: TokenService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.tokenService.tokenAvailable()) {
      const authReq = request.clone({
        headers: request.headers.set('auth', this.tokenService.getToken()),
      });

      return next.handle(authReq);
    } else {
      this.routerService.navigate(['login']);
      return next.handle(request);
    }
  }
}
