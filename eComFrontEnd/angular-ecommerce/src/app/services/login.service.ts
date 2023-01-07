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

  constructor(private httpClient: HttpClient){}

  private placeholderImage = "assets/images/user-placeholder.png"; 

  handleImage(user:User){
    if(user.profilePicture == null){
      user.profilePicture = this.placeholderImage;
    }else {
      user.profilePicture = "data:image/webp;base64," + user.profilePicture;
    }    
  }

  login(username: String, password: String): Observable<Map<String, any>>{
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

  getAllUsers():Observable<User[]>{
    const getAllUrl = this.baseUrl + "user/getAll";
    return this.httpClient.get<Map<String, any>>(getAllUrl).pipe(
      map(response => {
        // throw new Error("Check this")
        console.log(response);
        const responseMap = new Map(Object.entries(response));
        return responseMap.get("users");
      })
    );
  }

  getByUsername(username: string):Observable<User>{
    const getUserUrl = this.baseUrl + `user/getByUsername/${username}`;
    return this.httpClient.get<Map<String, any>>(getUserUrl).pipe(
      map(response => {
        // throw new Error("Check this")
        console.log(response);
        const responseMap = new Map(Object.entries(response));
        const user = responseMap.get("user");
        this.handleImage(user);
        return user;
      })
    );
  }

  deleteUser(id: number):Observable<boolean>{
    const deleteUrl = this.baseUrl + `user/delete/${id}`;
    return this.httpClient.delete<Map<String, any>>(deleteUrl).pipe(
      map(response => {
        console.log(response);
        throw new Error("Check this")
      })
    );
  }

  updateUser(user: User):Observable<User>{
    const updateUrl = this.baseUrl + "user/update";
    return this.httpClient.put<Map<String, any>>(
      updateUrl,
      {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        profilePicture: user.profilePicture,
      }
    ).pipe(
      map(response => {
        console.log(response);
        throw new Error("Check this")
      })
    );
  }
}
