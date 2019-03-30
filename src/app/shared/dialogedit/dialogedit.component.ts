import { DialogData } from './../dialogdelete/dialogdelete.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({

  selector: 'app-dialogedit',
  templateUrl: './dialogedit.component.html',
  styleUrls: ['./dialogedit.component.css']
})

export class DialogEditComponent {

  public UserData: any;
  private id: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog, private userService: UserService,
              private snackBar: MatSnackBar) {

    this.UserData = data.userdata;
    this.id = data.userid;


  }

  ChangeForm(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.UserData.address = form.value.address;
    this.userService.UpdateUserData(this.UserData, this.id).subscribe(response => {

      this.openSnackBar('Updated succuessfully', 'Yay');

    });

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
