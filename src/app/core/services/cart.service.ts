import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


const backendUrlCart = environment.backendUrl + 'carts';
@Injectable({providedIn: 'root'})
export class CartService {



  constructor(private http: HttpClient, private router: Router) {}


  RegisterNewCart(id: string) {

    const userid = {id};

    return this.http.post(backendUrlCart, userid);
  }

  GetAllUserCartProducts(id: string) {


    return this.http.get<{cart: any}>(backendUrlCart + '/' + id);

  }




}
