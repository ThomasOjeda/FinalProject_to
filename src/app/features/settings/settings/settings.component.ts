import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/auth/services/login.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  user: User = {
    _id: '',
    name: { first: '', last: '' },
    username: '',
    email: '',
  };
  userForm!: FormGroup;

  theme!: string;
  themeSubscription: Subscription = new Subscription();

  constructor(
    private loginService: LoginService,
    private formBuilderService: FormBuilder,
    private userService: UserService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilderService.group({
      email: new FormControl(''),
      username: new FormControl(''),
      'first-name': new FormControl(''),
      'last-name': new FormControl(''),
    });
    this.userService.getUser$().subscribe((user) => {
      this.user = user.data;

      this.userForm.setValue({
        username: this.user.username,
        email: this.user.email,
        'first-name': this.user.name?.first,
        'last-name': this.user.name?.last,
      });
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
