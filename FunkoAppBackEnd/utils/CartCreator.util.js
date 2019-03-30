const cartSchema = require("../models/CartSchema");

async function CreateCart(id) {


    const newCart = new cartSchema({

        userid: id,
        Cart: [],
    });
    newCart.save();
    return {message: true, newcart: newCart};

}

async function GetAllCarts() {

    return cartSchema.find();

}

async function FindCartById(userid) {

    return cartSchema.findOne({userid: userid});
}

async function GetAllCartProds(id) {

    let fetchedProds;
  
    cartSchema.findOne({userid: id}).then(documents => {
        fetchedProds = documents.Cart;
    })
    
    return { message: true, ProdsCart: fetchedProds}
    

}

async function UpdateCart (ProductsToAdd, id, CartId) {
   
     const ProductToUpdate = new cartSchema ({
        _id: CartId,
        userid: id,
        Cart: ProductsToAdd
    });
 
    await cartSchema.updateOne({_id: CartId}, ProductToUpdate);
    return {message: true, cart: ProductToUpdate}


}


module.exports = {

    CreateCart,
    GetAllCarts,
    UpdateCart,
    FindCartById,
    GetAllCartProds
}