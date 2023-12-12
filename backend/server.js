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
app.use('/users', require('./routes/userRoutes'))
app.use('/products', require('./routes/productRoutes'))

app.use(function(err,req,res,next){
    res.status(500).send(err.message);
})


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
      success_url: "http://localhost:3000/sucess",
      cancel_url: "http://localhost:3000/cart"
  })

  

}); 

mongoose.connection.once('open',()=>{
    console.log('Connected to Mongodb')
    app.listen(4000, ()=>console.log("listening on port 4000"))
})
 









