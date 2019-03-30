const express = require("express");
const router = express.Router();
const CartUtil = require("../utils/CartCreator.util");
const cartSchema = require("../models/CartSchema");
const AccessControl = require('accesscontrol');
const Global = require("../utils/Global.util");

const ac = new AccessControl();
ac.grant('admin')      
    .createOwn('cart')                                        
    .readAny('cart')                
    .createOwn('cart');


router.post("", async (req,res) => {

    try {
  
    const CreateNewCart = await CartUtil.CreateCart(req.body.id);
    
    res.status(200).json({
        message: CreateNewCart.message,
        createCart: CreateNewCart.newcart
    });
        
    } catch (error) {
        res.status(400).json({
            message: 'Yuston we have a problem:' + error
          })
    }
  

})

router.get("", async (req,res) => {
        try {
            const AllCarts = await CartUtil.GetAllCarts();
            res.status(200).json({
                Carts: AllCarts
            })
        } catch (error) {
            res.status(400).json({
                message: 'Yuston we have a problem:' + error
            })
        }
  
});

router.get("/:id", async (req,res) => {

    try {
      
        await cartSchema.findOne({userid: req.params.id}).then(documents => {
            res.status(200).json({
                message: 'All good',
                cart: documents
            })
        })
       
    } catch (error) {
        res.status(400).json({
            message: 'Yuston we have a problem:' + error
          })
    }
  
    
})


router.put("/:userid", async(req,res) => {
    
try {
    const FindCartId = await CartUtil.FindCartById(req.params.userid);
    const AfterUpdate = await CartUtil.UpdateCart(req.body, req.params.userid, FindCartId._id);
 
    res.status(200).json({
        cart: AfterUpdate.cart,
        message: AfterUpdate.message
    })
} catch (error) {
 
    res.status(400).json({
        message: 'Yuston we have a problem:' + error
      })
    
}
    
  
})



module.exports = router;