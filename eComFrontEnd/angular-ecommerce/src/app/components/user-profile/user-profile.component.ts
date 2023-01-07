import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
              private route: ActivatedRoute) {}

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

  }

  deleteAccount(){
    
  }
}
