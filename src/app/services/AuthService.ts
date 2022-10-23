import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
const httOptions={
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
    public username: string;
    public password: string;

  constructor(private http: HttpClient) {

  }
  login(credentials: any ):Observable<any>{
    return this.http.post(environment.hostUrl + `/signin`,{
      username:credentials.username,
      pw:credentials.pw
    },httOptions)
  }


  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username, password) {
    // save the username to session
  }
}