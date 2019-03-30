
import { Component, ViewEncapsulation } from '@angular/core';
import * as EmailValidator from 'email-validator';
import { Validators, FormControl } from '@angular/forms';

@Component({

    selector: 'app-login',
    templateUrl: './dialoglogin.component.html',
    styleUrls: ['./dialoglogin.component.css'],
    encapsulation: ViewEncapsulation.None

})

export class DialogLoginComponent {
  hide = true;
  Validate: boolean;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  firstname = new FormControl ('', [Validators.required]);
  lastname = new FormControl ('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  timer: any;
  public data: any;


  constructor() {

    this.Validate = true;
  }

  SignUpForm() {

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!(EmailValidator.validate(this.email.value) && this.password.value.length >= 8)) {

        this.data = {email: this.email.value, password: this.password.value};
        this.Validate = true;

      }
      if (EmailValidator.validate(this.email.value) && this.password.value.length >= 8) {

      this.Validate = false;
      this.data = {email: this.email.value, password: this.password.value, firstname: this.firstname.value,
      lastname: this.lastname.value, address: this.address.value};
    } else {

      return false;
    }
      clearTimeout(this.timer);
    }, 200);
  }

  GetEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  GetPasswordErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
}
