import { OrderInterface } from './../../core/models/order.model';
import { DialogData } from './../dialogdelete/dialogdelete.component';
import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as moment from 'moment';
import * as lodash from 'lodash';
import { OrderService } from 'src/app/core/services/order.service';
const now = moment().format('LL');

@Component({
  selector: 'app-statusdialog',
  templateUrl: './dialogstatus.component.html',
  styleUrls: ['./dialogstatus.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogStatusComponent implements OnInit {

  public TopProducts: any = [];

  public sortArray: any;
  public customerSortByOrder: any;
  public customerSortByTotal: any;


  public TopFiveProducts = [];
  public TopFiveCustomer = [];
  public TopFiveBuyers = [];

  public OrdersStatMarch: OrderInterface[] = [];
  public OrdersCustomerByOrderNumber: OrderInterface[] = [];
  public OrdersCustomerByBuyers: OrderInterface[] = [];
  public AllSales: OrderInterface[] = [];

  public MonthArray = [];
  public MonthCustomerByOrder = [];
  public MonthCustomersByBuyersOrder = [];
  public MonthCalc = [];

  public GlobalArray = [];
  public GlobalCustomerByOrder = [];
  public GlobalCustomerByBuyersOrder = [];
  public GlobalSales = [];

  public isLoading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private spinnerService: Ng4LoadingSpinnerService,
) {

    this.isLoading = true;
    this.spinnerService.show();

    if (data.orders.January) {
      this.TopProductsFunc(data.orders.January);
      this.TopFiveCustomersByOrder(data.orders.January);
      this.TopFiveBigBuyers(data.orders.January);
      this.AvgSalesMonths(data.orders.January);
    }

    if (data.orders.February) {
      this.TopProductsFunc(data.orders.February);
      this.TopFiveCustomersByOrder(data.orders.February);
      this.TopFiveBigBuyers(data.orders.February);
      this.AvgSalesMonths(data.orders.February);
    }

    if (data.orders.March) {
      this.TopProductsFunc(data.orders.March);
      this.TopFiveCustomersByOrder(data.orders.March);
      this.TopFiveBigBuyers(data.orders.March);
      this.AvgSalesMonths(data.orders.March);

    }

    if (data.orders.April) {
      this.TopProductsFunc(data.orders.April);
      this.TopFiveCustomersByOrder(data.orders.April);
      this.TopFiveBigBuyers(data.orders.April);
      this.AvgSalesMonths(data.orders.April);
    }

    if (data.orders.May) {
      this.TopProductsFunc(data.orders.May);
      this.TopFiveCustomersByOrder(data.orders.May);
      this.TopFiveBigBuyers(data.orders.May);
      this.AvgSalesMonths(data.orders.May);
    }

    if (data.orders.June) {
      this.TopProductsFunc(data.orders.June);
      this.TopFiveCustomersByOrder(data.orders.June);
      this.TopFiveBigBuyers(data.orders.June);
      this.AvgSalesMonths(data.orders.June);
    }

    if (data.orders.July) {
      this.TopProductsFunc(data.orders.July);
      this.TopFiveCustomersByOrder(data.orders.July);
      this.TopFiveBigBuyers(data.orders.July);
      this.AvgSalesMonths(data.orders.July);
    }

    if (data.orders.August) {
      this.TopProductsFunc(data.orders.August);
      this.TopFiveCustomersByOrder(data.orders.August);
      this.TopFiveBigBuyers(data.orders.August);
      this.AvgSalesMonths(data.orders.August);
    }

    if (data.orders.September) {
      this.TopProductsFunc(data.orders.September);
      this.TopFiveCustomersByOrder(data.orders.September);
      this.TopFiveBigBuyers(data.orders.September);
      this.AvgSalesMonths(data.orders.September);
    }

    if (data.orders.October) {
      this.TopProductsFunc(data.orders.October);
      this.TopFiveCustomersByOrder(data.orders.October);
      this.TopFiveBigBuyers(data.orders.October);
      this.AvgSalesMonths(data.orders.October);
    }

    if (data.orders.November) {
      this.TopProductsFunc(data.orders.November);
      this.TopFiveCustomersByOrder(data.orders.November);
      this.TopFiveBigBuyers(data.orders.November);
      this.AvgSalesMonths(data.orders.November);
    }

    if (data.orders.December) {
      this.TopProductsFunc(data.orders.December);
      this.TopFiveCustomersByOrder(data.orders.December);
      this.TopFiveBigBuyers(data.orders.December);
      this.AvgSalesMonths(data.orders.December);
      this.isLoading = false;
      this.spinnerService.hide();
    }
  }
  ngOnInit() {}

  AvgSalesMonths(MonthData: any) {

    this.AllSales = [];
    this.AllSales = MonthData;

    const TotalPrice = lodash.sumBy(this.AllSales, 'orderTotal');
    const AvgSale = TotalPrice / this.AllSales.length;

    this.GlobalSales.push({
      monthData: {average: AvgSale, totalorders: this.AllSales.length},
      monthName: MonthData[0].month
    });


  }

  TopFiveCustomersByOrder(MonthData: any) {


    this.MonthCustomerByOrder = [];
    this.OrdersCustomerByOrderNumber = [];
    this.TopFiveCustomer = [];
    this.OrdersCustomerByOrderNumber = MonthData;

    this.OrdersCustomerByOrderNumber.forEach(user => {
      this.TopFiveCustomer.push({
        userid: user.userid,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        month: user.month
      });
    });



    const count = lodash(this.TopFiveCustomer)
      .groupBy('userid')
      .map((items, name) => ({ name, count: items.length }))
      .value();

    this.customerSortByOrder = lodash.sortBy(count, ['count']).reverse();
    this.customerSortByOrder.map(prod => {
      this.MonthCustomerByOrder.push(prod);
    });

    this.TopFiveCustomer = lodash.uniqBy(this.TopFiveCustomer, 'userid');


    for (let index = 0, j = 0; index < this.MonthCustomerByOrder.length; ) {
      if (this.MonthCustomerByOrder[index].name === this.TopFiveCustomer[j].userid) {
        this.MonthCustomerByOrder[index].name = this.TopFiveCustomer[j];


        index += 1;
        j = 0;
      } else {
        j += 1;
      }
    }

    this.GlobalCustomerByOrder.push({
      monthData: this.MonthCustomerByOrder,
      monthName: MonthData[0].month
    });


  }
  TopProductsFunc(MonthData: any) {

    this.MonthArray = [];
    this.OrdersStatMarch = [];
    this.TopFiveProducts = [];
    this.OrdersStatMarch = MonthData;
    this.OrdersStatMarch.forEach(prod => {
      prod.Cart.map(prodInCart => {
        this.TopFiveProducts.push(prodInCart);
      });
    });
    const count = lodash(this.TopFiveProducts)
      .groupBy('id')
      .map((items, name) => ({ name, count: items.length }))
      .value();
    this.sortArray = lodash.sortBy(count, ['count']).reverse();
    this.sortArray.map(prod => {
      this.MonthArray.push(prod);
    });
    this.TopFiveProducts = lodash.uniqBy(this.TopFiveProducts, 'id');
    for (let index = 0, j = 0; index < this.MonthArray.length; ) {
      if (this.MonthArray[index].name === this.TopFiveProducts[j].id) {
        this.MonthArray[index].name = this.TopFiveProducts[j];


        index += 1;
        j = 0;
      } else {
        j += 1;
      }
    }

    this.GlobalArray.push({
      monthData: this.MonthArray,
      monthName: MonthData[0].month
    });
  }


  TopFiveBigBuyers(MonthData: any) {


    this.MonthCustomersByBuyersOrder = [];
    this.OrdersCustomerByBuyers = [];
    this.TopFiveBuyers = [];
    this.OrdersCustomerByBuyers = MonthData;


    this.OrdersCustomerByOrderNumber.forEach(user => {
      this.TopFiveBuyers.push({
        userid: user.userid,
        ordertotal: user.orderTotal,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        month: user.month
      });
    });



    const count = lodash(this.TopFiveBuyers)
    .groupBy('userid')
    .map((items, name) => ({ name, totalPrice: lodash.sumBy(items, 'ordertotal') }))
    .value();


    this.customerSortByTotal = lodash.sortBy(count, ['count']).reverse();
    this.customerSortByTotal.map(prod => {
      this.MonthCustomersByBuyersOrder.push(prod);
    });



    this.TopFiveBuyers = lodash.uniqBy(this.TopFiveBuyers, 'userid');

    for (let index = 0, j = 0; index < this.MonthCustomersByBuyersOrder.length; ) {
      if (this.MonthCustomersByBuyersOrder[index].name === this.TopFiveBuyers[j].userid) {
        this.MonthCustomersByBuyersOrder[index].name = this.TopFiveBuyers[j];


        index += 1;
        j = 0;
      } else {
        j += 1;
      }
    }

    this.GlobalCustomerByBuyersOrder.push({
      monthData: this.MonthCustomersByBuyersOrder,
      monthName: MonthData[0].month
    });
    console.log(this.GlobalCustomerByBuyersOrder);
  }



}

