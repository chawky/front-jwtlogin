import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/AuthService';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private auth:AuthService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.registerSuccessfulLogin();
  }
  
}
