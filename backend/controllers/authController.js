const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('../config/dbConn');
const stripe = require('stripe')(process.env.STRIPE_ID);

const login = asyncHandler(async (req,res,next)=>{
    const {email, password} = req.body;
    if(!email||!password){
        return res.status(400).json({message:'Missing fields'})
    }

    const user = await User.findOne({email}).exec();
    if(!user){
        return res.status(400).json({message:'User does not exist'});
    }

    const match = await bcrypt.compare(password,user.password);
    if(!match) return res.status(401).json({message:'Incorrect email or password'});

    const token = jwt.sign({'id':user._id},process.env.JWT_SECRET,{
        expiresIn: '7d'
    });
    res.cookie("token",token,{
        httpOnly: true,
    })
    res.json({email:user.email,firstname:user.firstname,lastname:user.lastname,cart:user.cart,saved:user.saved});
    next();
})

const currentUser = asyncHandler(async(req,res)=>{
    const {token} = req.cookies

    if(token===undefined){
        return res.status(500).json({message:'Unauthorized user'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).exec()
    
    if(user){
        return res.json({ok:true})
    }

    return res.status(500).json({message:'Unauthorized user'})

})

const logout = (req,res) =>{
    try {
        res.clearCookie("token");
        return res.json({ message: "Signout success" });
       } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
}

const createUser = asyncHandler(async (req, res)=>{
    const {email,password,firstname,lastname} = req.body;

    const duplicate = await User.findOne({email}).lean().exec();

    if(duplicate){
        return res.status(409).json({message:'Account with email already exists'})
    }

    const customer = await stripe.customers.create({
        name: firstname+" "+lastname,
        email: email,
    });

    if(!customer){
        return res.status(400).json({message:'Unable to create customer'})
    }

    const hashedPwd = await bcrypt.hash(password,10);

    const userObject = {email,"password":hashedPwd,firstname,lastname,stripe_id:customer.id}

    const user = await User.create(userObject);

    if(user){

        return res.status(200).json({message:`New user ${email} created`})
    } else{
        return res.status(400).json({message:'Invalid data received'})
    }
})

const updateUser = asyncHandler(async (req, res)=>{
    const {type,info} = req.body;

    const {token} = req.cookies

    if(token===undefined){
        return res.status(500).json({message:'Unauthorized user'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).exec()

    if(type==="name"){
        const firstname = info.slice(0,info.indexOf(" "));
        const lastname = info.slice(info.indexOf(" ")+1);

        const result = await user.updateOne({firstname:firstname,lastname:lastname});

        if(result){
            res.status(200).json({message:"successfully changed name"});
        }

        res.status(400).json({message:"Unable to change name"});
    }
    else if(type==="email"){
        const email = info;

        const result = await user.updateOne({email:email});

        if(result){
            res.status(200).json({message:"successfully changed email"});
        }

        res.status(400).json({message:"Unable to change email"});
    }
    else{
        const newPassword = info[0];
        const cnfrmPassword = info[1];

        const compare = await bcrypt.compare(cnfrmPassword,user.password);
        if(compare===true){
            const hashedPwd = await bcrypt.hash(newPassword,10); 

            const result = await User.updateOne({password:hashedPwd});

            if(result){
                res.status(200).json({message:"successfully changed password"});
            }

            res.status(400).json({message:"Unable to change password"});
        }
        else{
            res.status(401).json({message:"Incorrect password"});
        }

    }

    return res.status(400).json({message:"Nothing Changed"});

})

const deleteUser = asyncHandler(async (req, res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email}).exec();
    const compare = await bcrypt.compare(password,user.password);
    if(compare===true){
        const result = await user.deleteOne();
    }
    
})

const changeCart = asyncHandler(async (req, res)=>{
    const {email, newCart} = req.body;
    const user = await User.findOne({email}).exec();
    if(user){
        user.cart = newCart;
        const result = await user.save();

        if(result){
            return res.status(200).json({message:'Successfully saved to cart'});
        }
        return res.status(400).json({message:'Unable to save to cart'});
    }
    return res.status(400).json({message:'User not found'});
})

const changeSaved = asyncHandler(async (req, res)=>{
    const {email, newSaved} = req.body;
    const result = await User.updateOne({email:email},{$set:{saved:newSaved}})

    if(result){
        console.log("success")
    }
})

const getInfo = asyncHandler(async(req,res)=>{
    const {token} = req.cookies
    const {info} = req.query;
   
    if(token===undefined){
        return res.status(500).json({message:'Unauthorized user'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).exec();

    if(user){
        if(info==="email") return res.json({email:user.email});
        if(info==="cart") return res.json({cart:user.cart});
        if(info==="saved") return res.json({saved:user.saved});
        
    }

    return res.status(401).json({message: "User not found"})
})

const changeAddress = asyncHandler(async(req,res)=>{
    const {token} = req.cookies;
    const address = req.body.address;

    if(token===undefined){
        return res.status(500).json({message:'Unauthorized user'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).exec();

    if(user){
        if(user.addressBook.length===0){
            
             customer = await stripe.customers.update(
                user.stripe_id,
                {
                    address: {
                        line1: address.addressLine,
                        city: address.city,
                        state: address.state,
                        postal_code: address.zipcode,
                        country: address.country
                    }
                }
            );
            
        }

        
        const result = await User.updateOne({_id:decoded.id},{$push:{addressBook:address}}).exec();
      
        if(result){
            return res.status(200).json({message:'Successfully changed address'});
        }
        return res.status(200).json({message:'Unable to change address'});

    }

    return res.status(401).json({message: "User not found"})
})

const getAddresses =asyncHandler(async(req,res)=>{
    const {token} = req.cookies;

    if(token===undefined){
        return res.status(500).json({message:'Unauthorized user'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).exec();
    console.log(user.addressBook)
    if(user){
        return res.status(200).json({addresses:user.addressBook});
    }

    return res.status(401).json({message: "User not found"});
})

module.exports = {
    login,
    logout,
    currentUser,
    createUser,
    deleteUser,
    changeCart,
    changeSaved,
    getInfo,
    updateUser,
    changeAddress,
    getAddresses
}