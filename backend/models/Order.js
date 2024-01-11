const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    product_list:{
        type:Array,
        required:true,
        unique:false
    },
    address:{
        type:Object,
        required:true
    },
    buyer_id:{
        type:String,
        required:false
    },
    buyer_email:{
        type:String,
        required:true
    },
    order_date:{
        type:Date,
        required:true
    },
    order_total:{
        type:Number,
        required:true
    },
    order_status:{
        type:String
    },
    order_number:{
        type:String
    }
});

module.exports = mongoose.model('order', orderSchema);