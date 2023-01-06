import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AppValidators } from 'src/app/validators/app-validators';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ){}

  registerFormGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      registerData: this.formBuilder.group({
        name: new FormControl("",[
          Validators.required,
        ]),
        email: new FormControl("",[
          Validators.required,
        ]),
        username: new FormControl("",[
          Validators.required,
        ]),
        password: new FormControl("",[
          Validators.required,
        ]),
        passwordCheck: new FormControl("",[
          Validators.required,
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
    console.log("Handle register button");
    if (this.registerFormGroup.invalid){
      this.registerFormGroup.markAllAsTouched();
    } else {
      console.log(this.registerFormGroup.get("registerData")?.value);
      this.loginService.register(
        this.username.value, 
        this.password.value,
        this.name.value,
        this.email.value
        ).subscribe(
        data => {
          console.log(`register response ==> ${data}`);
        }
      );
    }
  }
}
