import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  authToken: string;
  tokenIsAvailable = false;
  constructor(private localStorageService: LocalStorageService) {
    let token = this.localStorageService.getItem('final_project_auth_token');
    if (token) this.authToken = token;
    else this.authToken = '';
    if (this.authToken != '') this.tokenIsAvailable = true;
  }

  setToken(token: string) {
    this.authToken = token;
    this.localStorageService.setItem('final_project_auth_token', token);
    this.tokenIsAvailable = true;
  }

  deleteToken() {
    this.localStorageService.removeItem('final_project_auth_token');
    this.tokenIsAvailable = false;
  }

  getToken() {
    return this.authToken;
  }

  tokenAvailable() {
    return this.tokenIsAvailable;
  }
}
