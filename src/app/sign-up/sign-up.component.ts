import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  errorMessage = 'Invalid Credentials';
  role = ["user"];
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  handleRegistration() {
    const credentials = {
      userName: this.userName,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: ['user'],
    };
    this.authService.register(credentials).subscribe(
      (result) => {
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Successful Registration';
        this.router.navigate(['/signin'], {
          queryParams: { registrationState: true },
        });
      },
      () => {
        this.invalidLogin = true;
        this.loginSuccess = false;
      }
    );
  }
}
