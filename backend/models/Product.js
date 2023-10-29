const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    stripe_id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true

    },
    price:{
        type:Number,
        required:true
    },
    image_src:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('product', productSchema);