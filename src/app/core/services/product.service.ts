import { MatSnackBar } from '@angular/material';
import { ProductInterface } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';


const backendUrl = environment.backendUrl + 'products';
@Injectable({ providedIn: 'root' })
export class ProductSerivce {
  private ProductSubject = new Subject<{products: ProductInterface[], ProductsCount: number}>();
  private products: ProductInterface[] = [];
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  RegisterNewProduct(FunkoPopProduct: any, image: File) {


    const userData = new FormData();
    userData.append('productName', FunkoPopProduct.productName);
    userData.append('productPrice', FunkoPopProduct.productPrice);
    userData.append('productInformation', FunkoPopProduct.productInformation);
    userData.append('image', image);
    this.http.post<{products: any,  ProductsCount: number}>(backendUrl, userData).subscribe(result => {

      const NewProduct: ProductInterface = {
        id: result.products._id,
        productName: result.products.productName,
        productPrice: result.products.productPrice,
        productInformation: result.products.productInformation,
        Image: result.products.Image
      };

      this.products.push(NewProduct);
      this.ProductSubject.next({
        products: [...this.products],
        ProductsCount: result.ProductsCount
      });
    });
  }



  GetAllProducts() {
    this.http
      .get<{ Product: any, ProductsCount: number }>(backendUrl)
      .pipe(map(ProductInfo => {
          return {
            products: ProductInfo.Product.map(product => {

            return {
              id: product._id,
              productName: product.productName,
              productPrice: product.productPrice,
              productInformation: product.productInformation,
              Image: product.Image
            };
          }),
          ProductsCount: ProductInfo.ProductsCount
        };
      })).subscribe(transformedProduct => {

        this.products = transformedProduct.products;
        this.ProductSubject.next({
          products: [...this.products],
          ProductsCount: transformedProduct.ProductsCount
        });
      });
    }

    GetSpeseficProduct(productid: string) {

      return this.http.get<{id: string, productName: string, productPrice: string,
        productInformation: string, Image: File}>(backendUrl + '/' + productid);
    }

  SearchProducts(SearchValue: string) {


    this.http.get<{products: any, ProductsCount: number}>(backendUrl + '/' + SearchValue + '/' + SearchValue)
    .pipe(map((ProductsInfo) => {
      return {
        products: ProductsInfo.products.map(product => {
          return {
            id: product._id,
            productName: product.productName,
            productPrice: product.productPrice,
            productInformation: product.productInformation,
            Image: product.Image
          };
        }),
        ProductsCount: ProductsInfo.ProductsCount
      };
    })).subscribe(transformedProduct => {

      this.products = transformedProduct.products;
      this.ProductSubject.next({
        products: [...this.products],
        ProductsCount: transformedProduct.ProductsCount
      });
    });
  }


  UpdateYourPop(FunkoPopProduct: any, productid: string) {

    const userData = new FormData();
    userData.append('productName', FunkoPopProduct.productName);
    userData.append('productPrice', FunkoPopProduct.productPrice);
    userData.append('productInformation', FunkoPopProduct.productInformation);
    userData.append('image', FunkoPopProduct.Image);

    this.http.put<{products: any, ProductsCount: number}>(backendUrl + '/' + productid, userData).subscribe(response => {

        const UpdateProduct = [...this.products];
        const oldProduct = UpdateProduct.findIndex(product => product.id === productid);

        if (!response.products.Image) {

          response.products.Image = FunkoPopProduct.Image;
        }
        const UpdateProductInfo: ProductInterface = {

          id:  productid,
          productName: response.products.productName,
          productPrice: response.products.productPrice,
          productInformation: response.products.productInformation,
          Image: response.products.Image
        };

        UpdateProduct[oldProduct] = UpdateProductInfo;
        this.products = UpdateProduct;
        this.ProductSubject.next({
          products: [...this.products],
          ProductsCount: response.ProductsCount

        }


          );

    });

  }
  DeleteFunko(productid: string) {
    this.http.delete<{products: any, ProductsCount: number}>(backendUrl + '/' + productid).subscribe(response => {
      const deleteFunko = this.products.filter(
        funkopopid => funkopopid.id !== productid
      );
      this.products = deleteFunko;
      this.openSnackBar('Product successfully deleted', ':(');
      this.ProductSubject.next({

        products: [...this.products],
        ProductsCount: response.ProductsCount
      });
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  GetProductsListener() {
    return this.ProductSubject.asObservable();
  }
}
