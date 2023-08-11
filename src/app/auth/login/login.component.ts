import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';
import { LoginSuccess } from '../models/login-success';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginUsername: string = '';
  loginPassword: string = '';
  constructor(
    private loginService: LoginService,
    private tokenService: TokenService
  ) {}
  submit() {
    this.loginService.login(this.loginUsername, this.loginPassword).subscribe({
      next: (response) => {
        let res = response as LoginSuccess;
        this.tokenService.setToken(res.token);
      },
      error: (error) => {},
      complete: () => {
        console.log('completed');
      },
    });
  }

  logout() {
    this.loginService.logout();
  }
}
