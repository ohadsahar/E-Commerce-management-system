const ProductSchema = require("../models/ProductSchema")

async function GetAllProducts() {

    return ProductSchema.find().sort({productName: -1});
}

async function GetProductsCount() {

    const CountProducts =  ProductSchema.find().then(() => ProductSchema.count());
    return CountProducts;
}

async function GetProductsByKeyword(keyword) {

   try {
    if(keyword) {
         return ProductSchema.find({
            $or: [
                {

                    productName: new RegExp(keyword, 'i'),
            },
            {

                productPrice: new RegExp(keyword, 'i'),
            },
            {

                productInformation: new RegExp(keyword, 'i'),
            },
        
        ],
        }).then(documents =>   ({success: true, products: documents}));
       
    } else {
        return {success: false};
    }
   } catch (error) {
       console.log(error);
 
   }
  

}

async function GetOneUser(productid) {

    return ProductSchema.findById({_id: productid});
}

async function GetFullInformationProduct(ProductInfo) {

    
        try {
            const Product = {

                id: ProductInfo._id,
                productName: ProductInfo.productName,
                productPrice: ProductInfo.productPrice,
                productInformation: ProductInfo.productInformation,
                Image: ProductInfo.Image
            };
            return {InfoProduct: Product, message: true};
        } catch (error) {
                return {message: false};
        }
   
}
module.exports = {

    GetAllProducts,
    GetProductsCount,
    GetProductsByKeyword,
    GetFullInformationProduct,
    GetOneUser
}