export interface OrderInterface {


  userid: string;
  orderDate: string;
  orderTotal: string;
  month: string;
  Cart: [{
    id: string;
    productName: string;
    productPrice: string;
    productInformation: string;
    productImage: File;
  }]
  firstname: string;
  lastname: string;
  email: string;
}
