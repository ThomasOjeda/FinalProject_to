import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpService: HttpClient) {}

  login(username: string, password: string) {
    return this.httpService.post(
      'https://lamansysfaketaskmanagerapi.onrender.com/api/login',
      {
        username: username,
        password: password,
      }
    );
  }
}
