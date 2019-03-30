const productSchema = require("../models/ProductSchema");

async function CreateProduct(req) {


  try {
    const url  = req.protocol + '://' + req.get('host');

    const newProduct = new productSchema({

      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productInformation: req.body.productInformation,
      Image: url + '/images/' + req.file.filename,
 
    });
   
    newProduct.save();
    return { success: true, product: newProduct };
  } catch (error) {

    return { success: false, product: newProduct };
  }
}

async function UpdateProduct(ProductToUpdate, productid, req) {


  
  const url  = req.protocol + '://' + req.get('host');
  let productToUpdate;

  try {
  
    if(req.file) {
       productToUpdate = {
        id: productid,
        productName: ProductToUpdate.productName,
        productPrice: ProductToUpdate.productPrice,
        productInformation: ProductToUpdate.productInformation,
        Image: url + '/images/' + req.file.filename
      };
    }
    else {
  
     productToUpdate = {
      id: productid,
      productName: ProductToUpdate.productName,
      productPrice: ProductToUpdate.productPrice,
      productInformation: ProductToUpdate.productInformation,
     
    };
  }
  
    await productSchema.updateOne({_id: productid}, productToUpdate);
    return {success: true, product: productToUpdate};
    
  } catch (error) {

    return {success: false};
    
  }




}
async function DeleteFunko(FunkoId) {

  await productSchema.deleteOne({_id: FunkoId});
  return {message: true, productid: FunkoId};
}

module.exports = {
  CreateProduct,
  DeleteFunko,
  UpdateProduct
};
