import { CartService } from './../../core/services/cart.service';
import { MatDialog } from '@angular/material';
import { DialogData } from './../dialogdelete/dialogdelete.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ProductInterface } from './../../core/models/product.model';
import { OnInit, Inject } from '@angular/core';
import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from 'src/app/core/services/user.service';
import {MatSnackBar} from '@angular/material';



@Component({

    selector: 'app-general',
    templateUrl: './dialogeneral.component.html',
    styleUrls: ['./dialogeneral.component.css'],
    encapsulation: ViewEncapsulation.None

})

export class DialogGeneralPopsComponent implements OnInit {

  private sum: number;
  private id: string;
  private subAllPops: Subscription;
  public AllFunkoPop: ProductInterface [] = [];
  public isLoading: boolean;

  template: string = '<img src="http://pa1.narvii.com/5722/2c617cd9674417d272084884b61e4bb7dd5f0b15_hq.gif" />';



constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog, private cartService: CartService,
            private userService: UserService,  private spinnerService: Ng4LoadingSpinnerService,
            private snackBar: MatSnackBar) {
  this.sum = 0;
  this.id = data.userid;
  this.isLoading = true;
  this.spinnerService.show();
}

  ngOnInit() {

      this.cartService.GetAllUserCartProducts(this.id).subscribe(response => {
        this.AllFunkoPop  = response.cart.Cart;
        this.isLoading = false;
        this.spinnerService.hide();
      });
  }


  RemoveFromCart(productid: string) {


    const index = this.AllFunkoPop.findIndex(funkoProduct => funkoProduct.id === productid);
    this.AllFunkoPop.splice(index, 1);
    this.userService.UpdateCartOfUser(this.AllFunkoPop, this.id);
    this.openSnackBar('Item deleted succuessfully', 'But why?');

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  DonePurchase() {


    this.AllFunkoPop.forEach(product => {
      this.sum += Number(product.productPrice);
      this.data.TotalPrice = this.sum;
      this.data.products = this.AllFunkoPop;

    });



  }


  }






