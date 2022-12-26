import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from 'src/app/validators/app-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder
  ){}

  loginFormGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      loginData: this.formBuilder.group({
        username: new FormControl("",[
          Validators.required,
        ]),
        password: new FormControl("",[
          Validators.required,
        ]),
      })
    });
  }

  get username() {return this.loginFormGroup.get("loginData.username")!;}
  get password() {return this.loginFormGroup.get("loginData.password")!;}

  onLogin() {
    console.log("Handle login button");

    if (this.loginFormGroup.invalid){
      this.loginFormGroup.markAllAsTouched();
    }
    console.log(this.loginFormGroup.get("loginData")?.value);
  }

  /*TODO:
    - create login service
      - make requests
      - handle errors
    - print errors
    - keep user loged in
    - display user name in app bar
    - switch login button with logout button or with account button
  */
}
