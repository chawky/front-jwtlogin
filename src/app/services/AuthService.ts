import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';
const httOptions={
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
    public username: string;
    public password: string;
    public isLoggedIn= false;

  constructor(private http: HttpClient,private token:TokenStorageService) {

  }
  login(credentials: any ):Observable<any>{
    return this.http.post(environment.hostUrl + `/signin`,{
      username:credentials.username,
      pw:credentials.pw
    },httOptions)
  }
  register(credentials: any ):Observable<any>{
    return this.http.post(environment.hostUrl + `/signup`,{
      username:credentials.username,
      pw:credentials.pw,
      email:credentials.email,
      role: credentials.role
    },httOptions)
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin():boolean {
    if(this.token.getToken()!=null){
      this.isLoggedIn=true;
    }
    return this.isLoggedIn
  }
}