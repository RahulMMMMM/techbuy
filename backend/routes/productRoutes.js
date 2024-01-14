const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');




router.route('/')
    .get(productController.getProducts)
    .post(productController.addProducts)

router.route('/product')
    .get(productController.getProductById)

 router.route('/search')
    .get(productController.searchProducts)   

router.route('/autocomplete')
    .get(productController.autoComplete)

module.exports = router