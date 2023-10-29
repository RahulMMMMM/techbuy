const express = require("express");
const cors = require("cors");
const stripe = require('stripe')('sk_test_51O3gwlB4WKiOZKxWeKtvw4UUXL5VVNaUIgXuDmwPDG0k0IdcuKZh85zlZ9tq8K0SF7SXfpEcBTyJziTSAr4IQ4Uh009a18j4zG');
const mysql = require('mysql');
const bcrypt = require('bcrypt')

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

//products
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rahul2006",
    database: "tech_buy"
});

app.get("/products",(req,res)=>{
    db.query("SELECT * from products", (err, result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})

//account
app.post("/auth/signup", async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    db.query("SELECT * from users where email = ?", email, async (err, result) => {
        if (err) {
            return res.json(err);
        }
        if (result.length > 0) {
            res.send({ message: "The Email is already in use!" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const encrypted_password = await bcrypt.hash(password, salt);
            const query = "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)";

            db.query(query, [email, encrypted_password, firstName, lastName], (err, result) => {
                if (err) {
                    res.send({ url: "http://localhost:3000/auth/signup?error" });
                } else {
                    res.send({ url: "http://localhost:3000/myaccount" });
                }
            });
        }
    });
});

app.get("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT password from users where email = ?", email, async (err, result) => {
        if (err) {
            return res.json(err);
        }
        if (result) {
            const storedPassword = result[0].password;
            const match =  bcrypt.compareSync(password,storedPassword);
            if(match==true){
                res.send({ url: "http://localhost:3000" })
            }
            else{
                res.send({ url: "http://localhost:3000/auth/login?error" })
            }
            
        } else {
            res.send({ message: "Incorrect Email or Password!" });
        }
    });
});

//payment
app.post("/checkout", async (req, res)=>{
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push(
            {
                price: item.id,
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

app.listen(4000, ()=>console.log("listening on port 4000"));


/* require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');

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

app.get('/',(req,res)=>{
    res.send('Hello');
})

app.use(function(err,req,res,next){
    res.status(500).send(err.message);
})

mongoose.connection.once('open',()=>{
    console.log('COnnected to Mongodb')
    app.listen(4000, ()=>console.log("listening on port 4000"))
})
 */





