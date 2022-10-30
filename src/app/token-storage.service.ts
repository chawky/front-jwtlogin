import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const USER_KEY = 'auth-user'
const TOKEN_KEY = 'auth-token'
@Injectable({
  providedIn: 'root'
})

export class TokenStorageService implements HttpInterceptor {
 
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.getToken()
    let jwtToken;
    if(token !== null){
       jwtToken = req.clone({ 
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      })
    }

    return next.handle(jwtToken)
  }
  signOut() {
    window.sessionStorage.clear();
  }
  saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY)
  }
  saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  getUser(): string {
    return JSON.parse(window.sessionStorage.getItem(USER_KEY))
  }
  reloadPage() {
    window.location.reload();
  }
}
