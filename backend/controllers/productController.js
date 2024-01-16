const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');



const getProducts = asyncHandler(async (req, res)=>{
    const products = await Product.find({});
    res.status(200).json(products);
})

const getProductById = asyncHandler(async (req, res)=>{
    const {id} = req.query;
    const product = await Product.findOne({"_id":id}).exec();
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
            stripe_id: item.stripe_id,
            title: item.title,
            rating: item.rating,
            price: item.price,
            image_src: item.image
        }));
    }
    
    const result = await Product.insertMany(productsData);
    return res.status(200).json(result);
})

const searchProducts = asyncHandler(async(req,res)=>{
    const query = req.query.k;
    try{
        const result = await Product.aggregate([
            {$search: {
                index: "product-search-index",
                text: {
                  query: query,
                  path: {
                    wildcard: "*"
                  },
                  fuzzy: {}
                }
              }}
        ])
        
        if(result){
            if(result.length>10){
                return res.status(200).json({products:result.slice(0,10)})
            }
            return res.status(200).json({products:result})
        }
        return res.status(404).json({message:'No results found'});
    }
    catch(err){
        console.log(err);
    }
});

const autoComplete = asyncHandler(async(req,res)=>{
    const query = req.query.k;
    try{
        const result = await Product.aggregate([
            {$search: {
                index: "products-autocomplete-index",
                autocomplete: {
                    query: query,
                    path: "title",
                    tokenOrder: "any",
                    fuzzy: {},
                }}
            }
        ])

        if(result){
            return res.status(200).json({products:result})
        }
        return res.status(404).json({message:'No results found'});
    }
    catch(err){
        console.log(err);
    }
})


module.exports = {
    getProducts,
    getProductById,
    addProducts,
    searchProducts,
    autoComplete
    
}