const Order = require('../models/Order');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createOrder = asyncHandler(async (req, res)=>{
    const {products,address,email,total} = req.body;
    const {token} = req.cookies;
    const today = new Date();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

    let orderObject;

    if(id===undefined){
        orderObject = {products,address,"buyer_id":"",email,today,total,"order_status":"confirmed"};
    }
    else{
        orderObject = {products,address,id,email,today,total,"order_status":"confirmed"};
    }


    const order = await Order.create(orderObject);

    if(user){
        return res.status(200).json({message:'Order Successful'})
    } else{
        return res.status(400).json({message:'Unable to complete order'})
    }
})

module.exports = {
    createOrder
}