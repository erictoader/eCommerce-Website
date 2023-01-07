import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AppValidators } from 'src/app/validators/app-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ){}
  
  errorToDisplay: String = "";
  loginFormGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      loginData: this.formBuilder.group({
        username: new FormControl("",[
          Validators.required,
          AppValidators.noWhiteSpace,
        ]),
        password: new FormControl("",[
          Validators.required,
          AppValidators.noWhiteSpace,
        ]),
      })
    });
  }

  get username() {return this.loginFormGroup.get("loginData.username")!;}
  get password() {return this.loginFormGroup.get("loginData.password")!;}

  onLogin() {
    if (this.loginFormGroup.invalid){
      this.loginFormGroup.markAllAsTouched();
    }else{ 
      this.loginService.login(this.username.value, this.password.value).subscribe(
        data => {
          if(data.get("code") != 200){
            this.errorToDisplay = data.get("message");
          }else{
            this.errorToDisplay = "";
            this.router.navigate(['home']);
          }
        }
      );
    }
  }
}
