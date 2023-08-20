import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginUsername: string = '';
  loginPassword: string = '';
  isLoggingIn: boolean = false;
  alertOpen: boolean = false;

  theme: string = '';
  themeSubscription: Subscription = new Subscription();
  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private routerService: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService
      .getTheme$()
      .subscribe((theme) => (this.theme = theme));
  }
  submit() {
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

  handleAlertClosed() {
    this.alertOpen = false;
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
