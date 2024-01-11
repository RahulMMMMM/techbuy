const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createOrder = asyncHandler(async (req, res)=>{
    const {products,address,email,total,orderNumber} = req.body;
    const {token} = req.cookies;
    const today = new Date();


    const prevOrder = await Order.findOne({order_number:orderNumber}).exec();
    if(prevOrder){
        return res.status(400).json({message:'Order has already been logged'})
    }

    const productList = await Promise.all(products.map(async (product)=>{
        const stripeId = product.price.id;
        const dbProduct = await Product.findOne({stripe_id:stripeId}).exec();
        console.log(dbProduct)
        return dbProduct;
    }))

    console.log(productList)

    if(token===undefined){


        const orderObject = {
            product_list:productList,
            address:address,
            buyer_id:"",
            buyer_email:email,
            order_date:today,
            order_total:total,
            order_status:"Confirmed",
            order_number:orderNumber
        };

        const order = await Order.create(orderObject);

        if(order){
            return res.status(200).json({message:'Order Successful'})
        }
        return res.status(400).json({message:'Unable to complete order'})

    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

    const orderObject = {
        product_list:productList,
        address:address,
        buyer_id:id,
        buyer_email:email,
        order_date:today,
        order_total:total,
        order_status:"confirmed",
        order_number:orderNumber
    };


    const order = await Order.create(orderObject);
   
    if(order){
        return res.status(200).json({message:'Order Successful'})
    } 
    return res.status(400).json({message:'Unable to complete order'})
  
})

const getOrders = asyncHandler(async(req,res)=>{
    var productList;

    const {token} = req.cookies;

    if(token===undefined){
        return res.status(403).json({message:'Invalid Token'});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

    const orders = await Order.find({buyer_id:id}).exec();
    


    if(orders){
        return res.status(200).json({orders:orders})
    }
    return res.status(400).json({message: 'No orders found'})


})

module.exports = {
    createOrder,
    getOrders
}