import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{

  editProfileFormGroup: FormGroup = new FormGroup({});
  private _user: User | null;
  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
  ) {
    this._user = null;
  }

  ngOnInit(): void {
    this.editProfileFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        //add validators
        name: new FormControl("", []),
        email: new FormControl("", []),
        userType: new FormControl("", []),
        profilePicture: new FormControl("", []),
        password: new FormControl("", []),
      }),
    });
    const theUsername: string = this.route.snapshot.paramMap.get("username")!;
    this.loginService.getByUsername(theUsername).subscribe(
      data => {
        this._user = data;
        this.name.setValue(this._user!.name);
        this.email.setValue(this._user!.email);
        this.userType.setValue(this._user!.userType);
        this.profilePicture.setValue(this._user!.profilePicture);
        this.password.setValue(this._user!.password);
      }
    );
   
  }

  
  get name() { return this.editProfileFormGroup.get("user.name")!; }
  get password() { return this.editProfileFormGroup.get("user.password")!; }
  get email() { return this.editProfileFormGroup.get("user.email")!; }
  get userType() { return this.editProfileFormGroup.get("user.userType")!; }
  get profilePicture() { return this.editProfileFormGroup.get("user.profilePicture")!; }

  
  onSubmit() {
    console.log("Handling the submit button");
    if (this.editProfileFormGroup.invalid) {
      this.editProfileFormGroup.markAllAsTouched();
    }else{
      this.loginService.updateUser(new User(
        this._user!.id,
        this.name.value,
        this._user!.username,
        this.password.value,
        this.userType.value,
        null, // this._user?.profilePicture
        this._user!.registrationDate,
        this.email.value

      )).subscribe(data => {
        
      })
      console.log(this.editProfileFormGroup.get("user")?.value);
    }
  }

}
