import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users : User[] = [];
  constructor(private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,) { }

    ngOnInit(): void {
      this.loadUsers();
    }

    loadUsers(){
      this.loginService.getAllUsers().subscribe(
        response =>{
          this.users = response;
      });
    }

    editAccount(username: String){
      this.router.navigate([`user-profile-edit/${username}`]);
    }

    deleteAccount(userId: number){
      this.loginService.deleteUser(userId).subscribe(
        data =>{
          if(data == true){
            this.loadUsers();
          }
        }
      );
    }
}
