const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = asyncHandler(async (req,res)=>{
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

    const accessToken = jwt.sign(
        {
            "UserInfo":{
                "email": user.email
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        {"email": user.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    )

    res.cookie('jwt', refreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7*24*60*1000
    })

    res.json({accessToken,firstname:user.firstname,lastname:user.lastname});

})

const refresh = (req,res) =>{
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.status(401).json({message:'Unauthorized'});

    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ email: decoded.email }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": foundUser.email,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            )

            res.json({ accessToken })
        }) 
    )
}

const logout = (req,res) =>{
    const cookies = req.cookies;
    if(!cookies.jwt) return res.sendStatus(204);
    res.clearCookie('jwt',{httpOnly:true, sameSite: 'None', secure:true})
    res.json({message: 'Cookie Cleared'}); 
}

module.exports = {
    login,
    refresh,
    logout
}