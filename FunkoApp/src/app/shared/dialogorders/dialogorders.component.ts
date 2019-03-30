import { DialogData } from './../dialogdelete/dialogdelete.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Component, ViewEncapsulation, Inject } from '@angular/core';


@Component({

  selector: 'app-dialogorder',
  templateUrl: './dialogorders.component.html',
  styleUrls: ['./dialogorders.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class OrderDialogComponent {

  public orders: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {

      this.orders = data.orders;
      console.log(this.orders);


  }



}
