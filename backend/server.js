require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');
const stripe = require('stripe')(process.env.STRIPE_ID);
const jwt = require('jsonwebtoken');
const User = require('./models/User');




//middleware
connectDB();


app.use(express.json())
app.use(cookieParser());



app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
);



//routing
app.use('/auth', require('./routes/authRoutes'))
app.use('/products', require('./routes/productRoutes'))
app.use('/orders', require('./routes/orderRoutes'))




//payment
app.post("/checkout", async (req, res)=>{
  const items = req.body.items;
  const {token} = req.cookies;

  if(token!==undefined){
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).exec();
    const customer = await stripe.customers.retrieve(user.stripe_id);
    const address=customer.address
   
    let lineItems = [];

    items.forEach((item) => {
        lineItems.push(
            {
                price: item.stripe_id,
                quantity: item.quantity
            }
        )
    });
    const session = await stripe.checkout.sessions.create({
        customer:user.stripe_id,
        line_items : lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/order-confirmed?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/cart",
        billing_address_collection: 'required',
        shipping_address_collection: {
            allowed_countries: ['US', 'CA'], 
        },
       
        
    })
     
    return res.json({url:session.url,products:items});
  }

    
  let lineItems = [];

  items.forEach((item) => {
      lineItems.push(
          {
              price: item.stripe_id,
              quantity: item.quantity
          }
      )
  });
  const session = await stripe.checkout.sessions.create({
      line_items : lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/order-confirmed?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cart",
      billing_address_collection: 'required'
      
  })
   
  return res.json({url:session.url,products:items});
  

}); 


  

mongoose.connection.once('open',()=>{
    console.log('Connected to Mongodb')
    app.listen(4000, ()=>console.log("listening on port 4000"))
})
 









