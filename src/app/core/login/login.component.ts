import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginUsername: string = '';
  loginPassword: string = '';

  submit() {
    console.log(this.loginUsername, this.loginPassword);
  }
}
