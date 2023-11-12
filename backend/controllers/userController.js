const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const getUser = asyncHandler(async (req, res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email}).lean().exec();
    if(!user){
        return res.status(400).json({message:'No user found'});
    }
    const compare = await bcrypt.compare(password,user.password);
    if(compare===true){
        res.json(user);
    }
    else{
        return res.status(400).json({message:'Incorrect password'});
    }
})

const createUser = asyncHandler(async (req, res)=>{
    const {email,password,firstname,lastname} = req.body;

    const duplicate = await User.findOne({email}).lean().exec();

    if(duplicate){
        return res.status(409).json({message:'Account with email already exists'})
    }

    const hashedPwd = await bcrypt.hash(password,10);

    const userObject = {email,"password":hashedPwd,firstname,lastname}

    const user = await User.create(userObject);

    if(user){
        return res.status(200).json({message:`New user ${email} created`})
    } else{
        return res.status(400).json({message:'Invalid data received'})
    }
})

const updateUser = asyncHandler(async (req, res)=>{
    const {email,password,newPassword} = req.body;

    if(!email||!password||!newPassword){
        return res.status(400).json({message:'Invalid Data'});
    }
    const user = await User.findOne({email}).exec();

    if(!user){
        return res.status(400).json({message:'User not found'});
    }
    const compare = await bcrypt.compare(password,user.password);
    if(compare===true){
        const hashedNewPwd = await bcrypt.hash(newPassword,10);
        user.password = hashedNewPwd;
        const updateUser = await user.save();
        return res.json({message: 'Account password updated'});
    }
})

const deleteUser = asyncHandler(async (req, res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email}).exec()
    const compare = await bcrypt.compare(password,user.password);
    if(compare===true){
        const result = await user.deleteOne()
    }
    
})

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}