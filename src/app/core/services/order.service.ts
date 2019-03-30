import { OrderInterface } from './../models/order.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserInterface } from '../models/user.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

const backendUrl = environment.backendUrl + 'products';
const backendUrlOrders = environment.backendUrl + 'orders';
@Injectable({providedIn: 'root'})
export class OrderService {

  private AuthLoggedInListener = new Subject<boolean>();
  private allUsers: UserInterface[] = [];
  private UsersSubject = new Subject<UserInterface[]>();

  constructor(private http: HttpClient, private router: Router, private location: Location) {}


  AddNewOrder(id: string, order: OrderInterface, totalOrder: number, currenttime: string,
              firstname: string, lastname: string, email: string) {

    const OrderData = {id, order, totalOrder, currenttime, firstname, lastname, email};
    return this.http.post(backendUrlOrders, OrderData);

  }

  GetAllOrders() {

    return this.http.get<{orders: any}>(backendUrlOrders);
  }

  GetOrdersAdmin() {

    return this.http.get<{orders: any}>(backendUrlOrders + '/' + 'orderproducts');
  }



  GetUserOrders(userid: string) {

    return this.http.get<{orders: any}>(backendUrlOrders + '/' + userid);

  }



}
