import { OrderInterface } from './../models/order.model';
import { DialogEditComponent } from './../../shared/dialogedit/dialogedit.component';
import { CartInterface } from './../models/cart.model';
import { DialogConfirmComponent } from './../../shared/dialogconfirm/dialogconfirm.component';
import { UserInterface } from './../models/user.model';
import { UserService } from './../services/user.service';

import {MatSnackBar} from '@angular/material';
import { DialogComponent } from './../../shared/dialogdelete/dialogdelete.component';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
const now = moment().format('LLLL');


import {
  FormGroup,
  FormBuilder,
  NgForm,
  FormControl,
  Validators
} from '@angular/forms';
import { ProductInterface } from '../models/product.model';
import { ProductSerivce } from '../services/product.service';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material';
import { DialogGeneralPopsComponent } from 'src/app/shared/dialogeneral/dialogeneral.component';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { OrderDialogComponent } from 'src/app/shared/dialogorders/dialogorders.component';
import { DialogStatusComponent } from 'src/app/shared/dialogstatus/dialogstatus.component';


@Component({
  selector: 'app-managment',
  templateUrl: './managment.component.html',
  styleUrls: ['./managment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManagmentComponent implements OnInit {

  private subOrders: Subscription;
  public AllOrders: OrderInterface [] = [];
  private subCart: Subscription;
  public CartUserConnect: CartInterface[] = [];
  private subUsers: Subscription;
  public UserConnected: UserInterface[] = [];
  private id: string;
  public LoggedIn: boolean;
  private totalMoney: number;
  private Order: any;


  constructor(
    private userService: UserService,
    private productSerivce: ProductSerivce,
    private orderService: OrderService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cartService: CartService,
    private snackBar: MatSnackBar,


  ) {
    this.editAble = false;
    this.LoggedIn = false;
    this.thirdFormGroup = this.formBuilder.group({
      image: ''
    });
  }
  imagePreview: string;
  productObject: ProductInterface;
  public allProducts: ProductInterface[] = [];
  public allCartProducts: ProductInterface[] = [];
  public OnlyOneProduct: ProductInterface;
  public CreateAble: boolean;
  public editAble: boolean;
  public sumOfValueOfPops: number;
  private subProducts: Subscription;
  private productid: string;
  public UserInfo: any;
  private image;
  private FunkoPopProduct: any;
  timer: any;
  editArray: any = {};

  thirdFormGroup = new FormGroup({
    image: new FormControl(null, { validators: [Validators.required] })
  });

  productImage = new FormControl('', [Validators.required]);
  productName = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);
  productPrice = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern('^[0-9]*$')
  ]);

  productInformation = new FormControl('', [
    Validators.required,
    Validators.minLength(10)
  ]);

  ngOnInit() {


    this.LoggedIn = localStorage.getItem('Logged') as any;

    this.userService.GetAuthLoggedInListener().subscribe(response => {
      this.LoggedIn = response;
      localStorage.setItem('Logged', this.LoggedIn as any);

    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('id')) {
        this.id = paramMap.get('id');

        this.userService.GetConnectedUser(this.id).subscribe(response => {
          this.UserInfo = response.user;
          this.cartService.GetAllUserCartProducts(this.id).subscribe(responseCart => {
            this.allCartProducts = responseCart.cart.Cart;
            if (this.UserInfo.role === 'admin') {

            this.orderService.GetAllOrders().subscribe(responseOrders => {
              this.AllOrders = responseOrders.orders;
            });
          } else {

            this.orderService.GetUserOrders(this.id).subscribe(responseOrders => {

            });
          }
          });
        });




        this.productSerivce.GetAllProducts();
        this.subProducts = this.productSerivce
          .GetProductsListener()
          .subscribe(AllProducts => {
            this.allProducts = AllProducts.products;
            this.sumOfValueOfPops = AllProducts.ProductsCount;
          });

        this.thirdFormGroup = this.formBuilder.group({
          image: ''
        });
      }
    });
  }

  RegisterNewPop() {
    if (this.productName.invalid || this.productPrice.invalid) {
      return;
    } else {
      // tslint:disable-next-line:no-string-literal
      const image = this.thirdFormGroup.controls['image'].value;
      const FunkoPopProduct = {
        id: null,
        productName: this.productName.value,
        productPrice: this.productPrice.value,

        productInformation: this.productInformation.value
      };

      this.productSerivce.RegisterNewProduct(FunkoPopProduct, image);
      this.CreateAble = false;
      this.ResetForm();
    }
  }

  ResetForm() {

    this.thirdFormGroup.reset();
    this.productName.reset();
    this.productImage.reset();
    this.productPrice.reset();
    this.productInformation.reset();
  }

  CreateNewProduct() {
    this.CreateAble = true;
  }

  CancelNew() {
    this.CreateAble = false;
  }
  CancelEdit() {
    this.editAble = false;
  }
  openDialog(productName: string, productid: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        productname: productName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productSerivce.DeleteFunko(productid);
      }
    });
  }

  EditProfile() {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      data: {
        userid: this.id,
        userdata:  this.UserInfo
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  AddToCart(productid: string) {


    this.productSerivce.GetSpeseficProduct(productid).subscribe(response => {

      this.OnlyOneProduct = response;
      this.allCartProducts.push({
        id: this.OnlyOneProduct.id,
        productName: this.OnlyOneProduct.productName,
        productInformation: this.OnlyOneProduct.productInformation,
        productPrice: this.OnlyOneProduct.productPrice,
        Image: this.OnlyOneProduct.Image
      });
      this.userService.UpdateCartOfUser(this.allCartProducts, this.id);
      this.openSnackBar('Item added successfully to your cart', 'Thank you');

    });


  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });

  }


  Edit(productid: string) {
    this.productSerivce.GetSpeseficProduct(productid).subscribe(response => {
      const productInformation = {
        id: response.id,
        productName: response.productName,
        productPrice: response.productPrice,
        productInformation: response.productInformation,
        Image: response.Image
      };
      this.FunkoPopProduct = productInformation;
    });
    this.editAble = true;
  }

  SearchRequest(SearchValue: string) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (SearchValue.length > 0) {
        this.productSerivce.SearchProducts(SearchValue);
        this.subProducts = this.productSerivce
          .GetProductsListener()
          .subscribe(
            (ProductsInfo: {
              products: ProductInterface[];
              ProductsCount: number;
            }) => {
              this.allProducts = ProductsInfo.products;
              this.sumOfValueOfPops = ProductsInfo.ProductsCount;
            }
          );
      } else {
        this.productSerivce.GetAllProducts();
      }
      clearTimeout(this.timer);
    }, 200);
  }




    GetOrders() {

      if (this.UserInfo.role === 'admin') {
        this.orderService.GetAllOrders().subscribe(response => {

          this.AllOrders = response.orders;

          const dialogRef = this.dialog.open(OrderDialogComponent, {
          data: {
            orders: this.AllOrders,
          }
        });

          dialogRef.afterClosed().subscribe(result => {

        });
        });
    } else {
      this.orderService.GetUserOrders(this.id).subscribe(responseOrders => {
        this.AllOrders = responseOrders.orders;


        const dialogRef = this.dialog.open(OrderDialogComponent, {
        data: {
          orders: this.AllOrders,
        }
      });

        dialogRef.afterClosed().subscribe(result => {

      });
      });
    }



    }

  UpdatePop(productid: string) {
    // tslint:disable-next-line:no-string-literal
    const image = this.thirdFormGroup.controls['image'].value;

    if (image !== '') {
      this.FunkoPopProduct.Image = image;
    } else {
      this.image = this.FunkoPopProduct.Image;
      this.FunkoPopProduct.Image = this.image;
    }

    const productInformation = {
      id: productid,
      productName: this.productName.value,
      productPrice: this.productPrice.value,
      productInformation: this.productInformation.value,
      Image: this.FunkoPopProduct.Image
    };

    if (productInformation.productName) {
      this.FunkoPopProduct.productName = productInformation.productName;
    }
    if (productInformation.productPrice) {
      this.FunkoPopProduct.productPrice = productInformation.productPrice;
    }
    if (productInformation.productInformation) {
      this.FunkoPopProduct.productInformation =
        productInformation.productInformation;
    }

    this.productSerivce.UpdateYourPop(this.FunkoPopProduct, productid);
    this.editAble = false;
    this.productImage.reset();
    this.productName.reset();
    this.productPrice.reset();
    this.imagePreview = null;
  }



  openCollection() {
    const dialogRef = this.dialog.open(DialogGeneralPopsComponent, {
      data: {
        userid: this.id,

      }
    });
    dialogRef.afterClosed().subscribe(result => {



      if (result) {

        this.totalMoney = result.TotalPrice;
        this.Order = result.products;

        const dialogRefConfirm = this.dialog.open(DialogConfirmComponent, {

          data: {
            products: result.products,
            TotalPrice: result.TotalPrice,
          }
        });

        dialogRefConfirm.afterClosed().subscribe(resultconfirm => {

          if (resultconfirm === true) {

            this.orderService.AddNewOrder(this.id, this.Order, this.totalMoney, now,
            this.UserInfo.firstname, this.UserInfo.lastname, this.UserInfo.email)
            .subscribe(response => {
             this.userService.UpdateCartOfUser([], this.id);
             this.allCartProducts = [];

             });

          }

        });

      }
    });
  }

  LogOut() {

    this.userService.LogOutNow();

  }



  Status() {

    this.orderService.GetOrdersAdmin().subscribe(response => {

      const dialogRef = this.dialog.open(DialogStatusComponent, {
        data: {
          orders:  response.orders
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {

        }
      });

    });


  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.thirdFormGroup.patchValue({ image: file });
    this.thirdFormGroup.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  getErrorMessage() {
    return this.productName.hasError('required')
      ? 'You must enter a value'
      : this.productName.hasError('productName')
      ? 'At least 2 chars'
      : '';
  }

  getProductPriceError() {
    return this.productPrice.hasError('required')
      ? 'You must enter a value'
      : this.productPrice.hasError('productPrice')
      ? 'Only numbers, this is a price'
      : '';
  }
}
