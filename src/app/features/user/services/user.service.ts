import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from '../models/UserResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpClient) {}

  getUser$(userId: string) {
    return this.httpService.get<UserResponse>(
      environment.API_URL + '/api/users/' + userId
    );
  }
}
