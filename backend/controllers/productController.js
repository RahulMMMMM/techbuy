const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');



const getProducts = asyncHandler(async (req, res)=>{
    const products = await Product.find({});
    res.status(200).json(products);
})

const getProductById = asyncHandler(async (req, res)=>{
    const {id} = req.query;
    const product = await Product.findOne({"stripe_id":id}).exec();
    if(product===null){
        res.status(400).json({error: "Products does not exist"});
    }
    res.status(200).json(product);
})

const addProducts = asyncHandler(async (req, res)=>{
    const {products} = req.body;
    var productsData
    if (!products) {
        return res.status(400).json({ error: "Products data is missing in the request body" });
    }
    else{
        productsData = products.map(item => ({
            stripe_id: item.id,
            title: item.title,
            rating: item.rating,
            price: item.price,
            image_src: item.image
        }));
    }
    
    const result = await Product.insertMany(productsData);
    return res.status(200).json(result);
})

module.exports = {
    getProducts,
    getProductById,
    addProducts
}