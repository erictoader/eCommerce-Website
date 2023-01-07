import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.loginService.getAllUsers().subscribe(
        response =>{
          this.users = response;
      });
    }
}
