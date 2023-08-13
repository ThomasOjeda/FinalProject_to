import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/auth/services/login.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user: User = {
    _id: '',
    name: { first: '', last: '' },
    username: '',
    email: '',
  };
  userForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilderService: FormBuilder,
    private userService: UserService
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
  }
  handleLogoutButtonClick() {
    this.loginService.logout();
  }
  submit() {}
}
