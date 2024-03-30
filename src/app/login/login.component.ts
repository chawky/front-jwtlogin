import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  isLoggedIn = false;
  state: string;
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
    if (this.router.getCurrentNavigation().extras.queryParams) {
      this.state =
        this.router.getCurrentNavigation().extras.queryParams.registrationState;
      console.log(this.router.getCurrentNavigation());
      this.loginSuccess = true;
      this.successMessage =
        'you have been successfully registered you can now log in';
    }
    if (tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit(): void {}

  handleRegistration() {
    this.router.navigate(['/signUp']);
  }

  handleLogin() {
    const credentials = {
      userName: this.userName,
      password: this.password,
    };
    this.authService.login(credentials).subscribe(
      (result) => {
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful';
        this.tokenStorage.saveToken(result);
        this.tokenStorage.saveUser(credentials);
        this.isLoggedIn = true;
        // redirect to main page
        this.router.navigate(['/welcomePage']);
      },
      () => {
        this.invalidLogin = true;
        this.loginSuccess = false;
      }
    );
  }
}
