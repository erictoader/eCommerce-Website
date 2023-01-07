import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _authState!: Observable<boolean>;
  private currentUser: any = null;
  private baseUrl = AppConfig.baseUrl;

  constructor(private httpClient: HttpClient){
    console.log(`currentUser = ${this.currentUser}`);
  }

  login(username: String, password: String): Observable<Map<String, any>>{
    console.log(`Login request: ${username}, ${password}`);
    const loginUrl = this.baseUrl + "user/login";
    return this.httpClient.request<Map<String, any>>(
      "POST",
      loginUrl, 
      {
        body:  {username: username, password: password},
      }
    ).pipe(
      map(response => {
        const responseMap = new Map(Object.entries(response));
        this.currentUser = responseMap.get("user");
        return responseMap;
      })
    )
  }

  register(_username: String, _password: String, _name: String, _email: String): Observable<Map<String, any>>{
    const registerUrl = this.baseUrl + "user/register";
    return this.httpClient.request<Map<String, any>>(
      "POST",
      registerUrl, 
     {
      body:  {
        username: _username,
        password: _password, 
        name: _name, 
        email: _email,
      },
    }
      ).pipe(
      map(response => {
        const responseMap = new Map(Object.entries(response));
        this.currentUser = responseMap.get("user");
        return responseMap;
      })
    )
  }

  signOut() {
    this.currentUser = null;
  }

  getUser(){
    return this.currentUser;
  }

  //TODO: make this better!
  authState():Observable<boolean>{
    return new Observable(observer => {
      setInterval(() => observer.next(this.currentUser != null), 1000);
    });
  }
}
