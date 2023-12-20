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
  loginUsername = '';
  loginPassword = '';
  isLoggingIn = false;
  alertOpen = false;

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private routerService: Router
  ) {}

  submit() {
    this.alertOpen = false;
    this.isLoggingIn = true;
    this.loginService.login(this.loginUsername, this.loginPassword).subscribe({
      next: (response: any) => {
        if (response.message == 'Authorized') {
          this.tokenService.setToken(response.token);
          this.routerService.navigate(['home']);
        } else {
          this.alertOpen = true;
        }
      },
      error: () => {
        this.isLoggingIn = false;
        this.alertOpen = true;
      },
      complete: () => {
        this.isLoggingIn = false;
      },
    });
  }

  logout() {
    this.loginService.logout();
  }

  handleAlertClosed() {
    this.alertOpen = false;
  }
}
