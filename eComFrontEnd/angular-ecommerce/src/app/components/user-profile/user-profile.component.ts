import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user!: User;

  constructor(private loginService: LoginService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const theUsername: string = this.route.snapshot.paramMap.get("username")!;
      this.loginService.getByUsername(theUsername).subscribe(
        data => {
          this.user = data;
        }
      )
    })
  }

  editAccount(){
    this.router.navigate([`user-profile-edit/${this.user.username}`]);
  }

  deleteAccount(){
    this.loginService.deleteUser(this.user.id).subscribe(
      data =>{
        if(data == true){
          this.loginService.signOut();
          this.router.navigate(['home']);
        }
      }
    );
  }
}
