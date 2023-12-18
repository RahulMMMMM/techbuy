require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');
const stripe = require('stripe')(process.env.STRIPE_ID);
const session = require('express-session');

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




//payment
app.post("/checkout", async (req, res)=>{
  const items = req.body.items;
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
      success_url: "http://localhost:3000/order-confirmed",
      cancel_url: "http://localhost:3000/cart",
      
  })
   
  return res.json({url:session.url})
  

}); 

mongoose.connection.once('open',()=>{
    console.log('Connected to Mongodb')
    app.listen(4000, ()=>console.log("listening on port 4000"))
})
 









