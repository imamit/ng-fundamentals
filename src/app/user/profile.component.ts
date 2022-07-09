import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Toastr, TOASTR_TOKEN } from '../common/toastr.service';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    em {float: right; color:#E05C65; padding-left:10px; }
    .error input {background-color:#E3C3C5}
    .error ::-webkit-input-placeholder { color:#999; }
    .error ::-moz-placeholder { color:#999; }
    .error :-moz-placeholder { color:#999; }
    .error :-ms-input-placeholder { color:#999; }
  `]
})
export class ProfileComponent implements OnInit {
  
  profileForm:FormGroup

  constructor (private authService:AuthService, private router:Router, @Inject(TOASTR_TOKEN) private toastr:Toastr) {

  }

  ngOnInit(): void {
    const firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
    const lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)
    this.profileForm = new FormGroup({
      firstName: firstName,
      lastName: lastName
    })
  }

  validateFirstName () {
    return this.profileForm.controls.firstName.valid || this.profileForm.controls.lastName.untouched
  }

  validateLastName () {
    return this.profileForm.controls.lastName.valid || this.profileForm.controls.lastName.untouched
  }
  
  saveProfile(formValues){
    if(this.profileForm.valid){
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
        .subscribe(()=>{
          this.toastr.success('Profile Saved')
        })
    }
  }

  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['/user/login'])
    });
  }

  cancel(){
    this.router.navigate(['events'])
  }
  
}