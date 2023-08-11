import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private localStorageService: LocalStorageService) {}

  setToken(token: string) {
    this.localStorageService.setItem('final_project_auth_token', token);
  }

  deleteToken() {
    this.localStorageService.removeItem('final_project_auth_token');
  }

  getToken() {
    return this.localStorageService.getItem('final_project_auth_token');
  }

  tokenAvailable() {
    if (this.localStorageService.getItem('final_project_auth_token'))
      return true;
    return false;
  }
}
