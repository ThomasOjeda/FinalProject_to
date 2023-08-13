import { Component } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(private loginService: LoginService) {}
  handleLogoutButtonClick() {
    this.loginService.logout();
  }
}
