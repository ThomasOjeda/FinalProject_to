import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/auth/services/token.service';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { UserResponse } from '../models/user-response';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpService: HttpClient,
    private tokenService: TokenService
  ) {}

  getUser$() {
    const token = this.tokenService.getToken();
    if (token) {
      try {
        const data: any = jwt_decode(token);
        return this.httpService.get<UserResponse>(
          environment.API_URL + '/api/users/' + data.user._id
        ).pipe(take(1));
      } catch (error) {
        return this.httpService.get<UserResponse>(
          environment.API_URL + '/api/users/'
        ).pipe(take(1));
      }
    }
    return this.httpService.get<UserResponse>(
      environment.API_URL + '/api/users/'
    ).pipe(take(1));
  }

  getUserId() {
    const token = this.tokenService.getToken();
    if (token) {
      try {
        const data: any = jwt_decode(token);
        return data.user._id;
      } catch (error) {
        return 'none';
      }
    }
  }
}
