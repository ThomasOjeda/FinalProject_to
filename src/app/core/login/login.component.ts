import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';

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
      next: (response) => {},
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }
}
