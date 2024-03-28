import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  errorMessage = 'Invalid Credentials';
  role=[]
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  
  handleRegistration() {
    const credentials = {
      username:this.username,
      password:this.password,
      email:this.email,
      role: ["user"]

    }
    this.authService.register(credentials).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Successful Registration';
      this.router.navigate(['/signin'], {queryParams:{registrationState: true}});
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }

}
