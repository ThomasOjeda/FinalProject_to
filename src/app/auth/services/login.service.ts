import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private httpService: HttpClient,
    private tokenService: TokenService,
    private routerService: Router
  ) {}

  login(username: string, password: string) {
    return this.httpService.post(environment.API_URL + '/api/login', {
      username: username,
      password: password,
    });
  }

  logout() {
    this.tokenService.deleteToken();
    this.routerService.navigate(['login']);
  }
}
