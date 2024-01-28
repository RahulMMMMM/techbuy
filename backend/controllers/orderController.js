const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_ID);

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
        return dbProduct;
    }))


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
        order_status:"Confirmed",
        order_number:orderNumber
    };


    const order = await Order.create(orderObject);
   
    if(order){
        return res.status(200).json({message:'Order Successful',order:{
            product_list:productList,
            order_date:today,
            order_total:total,
            order_status:"Confirmed",
            order_number:orderNumber
        }})
    } 
    return res.status(400).json({message:'Unable to complete order'})
  
})

const getOrders = asyncHandler(async(req,res)=>{


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

const getOrder = asyncHandler(async(req,res)=>{
    const {order_number} = req.query;

    const {token} = req.cookies;

    if(token===undefined){
        return res.status(403).json({message:'Invalid Token'});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

    const order = await Order.findOne({order_number:order_number,buyer_id:id}).exec();
    


    if(order){
        
        return res.status(200).json({order:{
            product_list:order.product_list,
            order_date:order.order_date,
            order_total:order.order_total,
            order_status:order.order_status,
            order_number:order.order_number
        }})
    } 
    return res.status(400).json({message: 'No orders found'})


})

const getSessionId = asyncHandler(async(req,res)=>{
    const {session_id} = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const customer_details = session.customer_details
    const lineItems = await stripe.checkout.sessions.listLineItems(session_id);

    
  
    res.json({customer:customer_details,lineItems:lineItems,total:session.amount_total});
})

module.exports = {
    createOrder,
    getOrders,
    getSessionId,
    getOrder
}