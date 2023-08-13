import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/auth/services/token.service';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { UserResponse } from '../models/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpService: HttpClient,
    private tokenService: TokenService
  ) {}

  getUser$() {
    let token = this.tokenService.getToken();
    if (token) {
      try {
        let data: any = jwt_decode(token);
        return this.httpService.get<UserResponse>(
          environment.API_URL + '/api/users/' + data.user._id
        );
      } catch (error) {
        return this.httpService.get<UserResponse>(
          environment.API_URL + '/api/users/'
        );
      }
    }
    return this.httpService.get<UserResponse>(
      environment.API_URL + '/api/users/'
    );
  }
}
