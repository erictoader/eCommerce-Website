import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})

export class LoginStatusComponent  implements OnInit{
  isAuthenticated: boolean = false;
  userFullName: string = "";
  username: string = "";

  constructor(private loginService: LoginService,
              private router: Router) { }

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
        let response = this.loginService.getUser() as User;
        this.userFullName = response.name as string;
        this.username = response.username as string;
      }
    }

    logout() {
      if(this.isAuthenticated){
        this.loginService.signOut();
        this.router.navigate(['home']);
      }
    }
}
