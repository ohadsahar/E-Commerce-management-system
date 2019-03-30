import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as EmailValidator from 'email-validator';

@Component ({

  selector: 'app-logtoindialog',
  templateUrl: './dialogtologin.component.html',
  styleUrls: ['./dialogtologin.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LogToInComponentDialog {

  hide = true;
  Validate: boolean;
  timer: any;
  public data: any;

  constructor() {

    this.Validate = true;
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);


  LoginForm() {

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!(EmailValidator.validate(this.email.value) && this.password.value.length >= 8)) {

        this.data = {email: this.email.value, password: this.password.value};
        this.Validate = true;

      }
      if (EmailValidator.validate(this.email.value) && this.password.value.length >= 8) {

      this.Validate = false;
      this.data = {email: this.email.value, password: this.password.value};
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
