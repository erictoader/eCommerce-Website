import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})

export class LoginStatusComponent  implements OnInit{
  isAuthenticated: boolean = false;
  userFullName: string = "";

  ngOnInit(){

  }
  // constructor(private authService: AppAuthService) { }

  //   ngOnInit(): void {
  //     //create authService
  //     this.authService.authState$.subscribe(
  //       (result) => {
  //         this.isAuthenticated = result.isAuthenticated!;
  //         this.getUserDetails();
  //       }
  //     );
  //   }

    getUserDetails() {
      // if (this.isAuthenticated) {
      //   this.authService.getUser().then(
      //     (res) => {
      //       this.userFullName = res.name as string;
      //     }
      //   )
      // }
    }

    logout() {
      // if(this.isAuthenticated){
      //   this.authService.signOut();
      // }
    }
}
