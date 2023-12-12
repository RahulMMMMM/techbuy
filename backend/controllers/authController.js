const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    res.json({email:user.email,firstname:user.firstname,lastname:user.lastname});
    next();
})

const currentUser = asyncHandler(async(req,res)=>{
    const {token} = req.cookies
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).exec()
    
    if(user){
        return res.json({ok:true})
    }

    return res.status(401).json({message:'Unauthorized user'})

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

module.exports = {
    login,
    logout,
    currentUser
}