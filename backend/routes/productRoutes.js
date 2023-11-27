const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');




router.route('/')
    .get(productController.getProducts)
    .post(productController.addProducts)

router.route('/product')
    .get(productController.getProductById)

module.exports = router