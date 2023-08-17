import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginUsername: string = '';
  loginPassword: string = '';
  isLoggingIn: boolean = false;
  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private routerService: Router
  ) {}
  submit() {
    this.isLoggingIn = true;
    this.loginService.login(this.loginUsername, this.loginPassword).subscribe({
      next: (response: any) => {
        if (response.message == 'Authorized') {
          this.tokenService.setToken(response.token);
          this.routerService.navigate(['home']);
        } else {
        }
      },
      error: (error) => {
        this.isLoggingIn = false;
      },
      complete: () => {
        this.isLoggingIn = false;
      },
    });
  }

  logout() {
    this.loginService.logout();
  }
}
