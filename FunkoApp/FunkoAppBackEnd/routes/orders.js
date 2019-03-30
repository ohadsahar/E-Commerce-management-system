const express = require("express");
const router = express.Router();
var moment = require('moment');
var lodash = require('lodash');

const AccessControl = require('accesscontrol');
const Global = require("../utils/Global.util");
const OrderUtil = require("../utils/OrderUtil.util");
moment().format('LL');



const ac = new AccessControl();
ac.grant('admin')                                              
    .readAny('order')                
    .createOwn('order');


router.post("", async (req,res) => {


    try {
        const permission = ac.can(Global.role).createOwn('order');
        if (permission.granted) {
        const AddOrder = await OrderUtil.RegisterNewOrder(req.body);
        res.status(200).json({
            order: AddOrder.order,
            message: AddOrder.message
        }) 
    }
    } catch (error) {
        res.status(400).json({
            message: 'Yuston we have a problem:' + error
          })
    }


})


router.get("", async (req,res) => {

    try {
        const permission = ac.can(Global.role).readAny('order');
        if (permission.granted) {
        let GetAllOrders = await OrderUtil.GetAllOrders();
      
        res.status(200).json({
            orders: GetAllOrders
        })
    }
    } catch (error) {
        res.status(400).json({
            message: 'Yuston we have a problem:' + error
          })
    }
});

router.get("/orderproducts", async (req,res) => {

    try {
       
    let GetAllOrders = await OrderUtil.GetAllOrders();
    GetAllOrders = lodash.groupBy(GetAllOrders, 'month');

    
      
        res.status(200).json({
            orders: GetAllOrders
        })
     
    } catch (error) {
        res.status(400).json({
            message: 'Yuston we have a problem:' + error
          })
    }
});

router.get("/:userid", async (req,res) => {

    const UserOrders = await OrderUtil.GetUserOrders(req.params.userid);
    try {
     
        res.status(200).json({
            message: UserOrders.message,
            orders: UserOrders.orders
        })
        
    } catch (error) {
        res.status(400).json({
            message: 'Yuston we have a problem:' + error
          })
    }

});



module.exports = router;