const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    addressBook:{
        type: Array
    },
    payments:{
        type: Array
    },
    cart:{
        type: Array
    },
    saved:{
        type:Array
    },
    stripe_id:{
        type:String
    }
});

module.exports = mongoose.model('user', userSchema);