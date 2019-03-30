import { ProductInterface } from './../../core/models/product.model';
import { DialogData } from './../dialogdelete/dialogdelete.component';
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';


@Component({

  selector: 'app-dialogComponent',
  templateUrl: './dialogconfirm.component.html',
  styleUrls: ['./dialogconfirm.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DialogConfirmComponent {

  public totalPrice: number;
  public AllFunkoPop: ProductInterface[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {

    this.totalPrice = data.TotalPrice;
    this.AllFunkoPop = data.products;

  }


}
