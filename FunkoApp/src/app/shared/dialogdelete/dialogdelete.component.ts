import { OrderInterface } from './../../core/models/order.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Component, Inject } from '@angular/core';


export interface DialogData {
  products: any;
  productname: string;
  TotalPrice: number;
  userid: string;
  userdata: any;
  orders: any;
}
@Component({

  selector: 'app-dialogdelete',
  templateUrl: './dialogdelete.component.html',
  styleUrls: ['./dialogdelete.component.css']
})

export class DialogComponent{

constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {

  this.data = data;

}

}
