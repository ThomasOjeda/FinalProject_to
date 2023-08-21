import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  user!: User;

  theme!: string;
  themeSubscription: Subscription = new Subscription();

  loadingUserData: boolean = true;
  errorLoadingUserData: boolean = false;
  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadingUserData = true;
    this.userService.getUser$().subscribe({
      next: (user) => {
        this.user = user.data;
      },
      error: (error) => {
        this.loadingUserData = false;
        this.errorLoadingUserData = true;
      },
      complete: () => {
        this.loadingUserData = false;
      },
    });

    this.themeSubscription = this.themeService
      .getTheme$()
      .subscribe((theme) => {
        this.theme = theme;
      });
  }
  handleLogoutButtonClick() {
    this.loginService.logout();
  }

  handleThemeChange(theme: string) {
    this.themeService.setTheme(theme);
  }
  submit() {}

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
