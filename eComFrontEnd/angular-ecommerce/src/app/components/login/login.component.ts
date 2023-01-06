import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AppValidators } from 'src/app/validators/app-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
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
    this.loginService.login(this.username.value, this.password.value).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  /*TODO:
    - create login service
      - handle errors
    - print errors
  */
}
