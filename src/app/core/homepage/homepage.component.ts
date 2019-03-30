import { CartService } from './../services/cart.service';
import { LogToInComponentDialog } from './../../shared/dialogtologin/dialogtologin.component';
import { UserService } from './../services/user.service';
import { DialogLoginComponent } from './../../shared/dialoglogin/dialoglogin.component';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent  implements OnInit{

  public LoggedIn: boolean;
  private id: string;

  constructor(public dialog: MatDialog, private userService: UserService, private cartService: CartService,
              private snackBar: MatSnackBar) {



  }

  ngOnInit() {


    this.LoggedIn = localStorage.getItem('Logged') as any;


  }

  SignUpDialog() {
    const dialogRef = this.dialog.open(DialogLoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.RegisterNewUser(result).subscribe(response => {

      this.id = response.userCreate._id;
      this.openSnackBar('You have successfully registered', 'Yay');

      setTimeout(() => {

            this.cartService.RegisterNewCart(this.id).subscribe(responseCart => {

            });
          }, 1000);


        });
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  LoginDialog() {

    const dialogRef = this.dialog.open(LogToInComponentDialog);

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

          this.userService.LoginToSystem(result);
          this.userService.GetAuthLoggedInListener().subscribe(resposne => {
            this.LoggedIn = resposne;

            localStorage.setItem('Logged', this.LoggedIn as any);
            this.LoggedIn = localStorage.getItem('Logged') as any;
            this.openSnackBar('you have successfully connected', 'Yay');
          });

      }

    });


  }
}


