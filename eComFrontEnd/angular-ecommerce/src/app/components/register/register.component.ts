import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AppValidators } from 'src/app/validators/app-validators';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ){}

  errorToDisplay: String = "";
  registerFormGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      registerData: this.formBuilder.group({
        name: new FormControl("",[
          Validators.required,
          AppValidators.notOnlyWhiteSpace,
        ]),
        email: new FormControl("",[
          Validators.required,
          Validators.email,
          AppValidators.noWhiteSpace,
        ]),
        username: new FormControl("",[
          Validators.required,
          AppValidators.noWhiteSpace,
        ]),
        password: new FormControl("",[
          Validators.required,
          AppValidators.noWhiteSpace,
        ]),
        passwordCheck: new FormControl("",[
          Validators.required,
          AppValidators.noWhiteSpace,
        ]),
      })
    });
  }

  get name() {return this.registerFormGroup.get("registerData.name")!;}
  get email() {return this.registerFormGroup.get("registerData.email")!;}
  get username() {return this.registerFormGroup.get("registerData.username")!;}
  get password() {return this.registerFormGroup.get("registerData.password")!;}
  get passwordCheck() {return this.registerFormGroup.get("registerData.passwordCheck")!;}

  onRegister() {
    if (this.registerFormGroup.invalid){
      this.registerFormGroup.markAllAsTouched();
    } else {
      if(this.password.value != this.passwordCheck.value){
        this.errorToDisplay = "Passwords do not match!";
      } else {
        this.loginService.register(
          this.username.value, 
          this.password.value,
          this.name.value,
          this.email.value
          ).subscribe(
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
}
