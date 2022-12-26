import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = AppConfig.baseUrl + "user/login";

  constructor(private httpClient: HttpClient){}

  // for BE: make this a POST request, angular does not support GET requests with body
  login(username: String, password: String): Observable<User>{
    console.log(`Login request: ${username}, ${password}`);
    const loginUrl = this.baseUrl;
    return this.httpClient.request<User>(
      "POST",
      loginUrl, 
     {
      body:  `{username: ${username}, password: ${password}}`
    }
      ).pipe(
      map(response => {
        console.log("Login response:");
        console.log(response);
        return response;
      })
    )
  }
}
