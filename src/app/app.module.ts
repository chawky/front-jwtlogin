import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes ,RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
export  const routes: Routes = 
  [{ path: "signin", component: LoginComponent },
   { path: "signUp", component: SignUpComponent },
   { path: "welcomePage", component: WelcomePageComponent, canActivate:[IsAuthenticatedGuard] }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    WelcomePageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
