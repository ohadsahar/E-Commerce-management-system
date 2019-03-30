const orderSchema = require("../models/OrderSchema");
var moment = require('moment');

async function RegisterNewOrder(OrderData) {

    let date = moment(Date.now()).format('MMMM').toString();

  console.log(nextMonth);

    try {
        const OrderToSave = new orderSchema ({
            userid: OrderData.id,
            orderDate: OrderData.currenttime,
            orderTotal: OrderData.totalOrder,
            month:date,
            Cart: OrderData.order,
            firstname: OrderData.firstname,
            lastname: OrderData.lastname,
            email: OrderData.email

        });

        await OrderToSave.save();
        return {message: true, order: OrderToSave}
    } catch (error) {

        console.log('Problem with posting');

    }

}

async function GetAllOrders() {


    return orderSchema.find();
}

async function GetUserOrders(userid) {
    try {
    return orderSchema.find({
        $or: [
            {

                userid: new RegExp(userid, 'i'),
        }

    ],
    }).then(documents =>   ({message: true, orders: documents}))



} catch (error) {
    return {message: false};
}

}
module.exports = {

    RegisterNewOrder,
    GetAllOrders,
    GetUserOrders,

}
