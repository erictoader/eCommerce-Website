import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public user: User | undefined;
  public isAuthenticated: boolean = false;
  constructor(private loginService: LoginService){
  }


  ngOnInit(): void {
    this.loginService.authState().subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    );
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.user = this.loginService.getUser() as User;
    }
  }

  isAdmin(){
    return this.user?.userType == 0;
  }
  
  title = 'angular-ecommerce';
}
