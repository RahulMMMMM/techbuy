require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');
const stripe = require('stripe')(process.env.STRIPE_ID);

connectDB();

app.use(express.json())

const whitelist = ['http://localhost:4000','http://localhost:3000'];
const corsOptions={
    origin:(origin,callback)=>{
        if(whitelist.indexOf(origin)!==-1||!origin){
            callback(null,true)
        }
        else{
            callback(new Error('Not allowed'));
        }        
    },
    optionsSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(cookieParser());

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

  res.send(JSON.stringify({
      url: session.url
  }));

}); 

mongoose.connection.once('open',()=>{
    console.log('Connected to Mongodb')
    app.listen(4000, ()=>console.log("listening on port 4000"))
})
 









