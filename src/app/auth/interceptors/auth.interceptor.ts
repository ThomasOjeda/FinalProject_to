import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../services/token.service';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private loginService: LoginService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
      headers: request.headers.set('auth', this.tokenService.getToken() || ''),
    });

    return next.handle(authReq).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          if (error.status == 401) {
            this.loginService.logout();
          }
        },
      })
    );
  }
}
