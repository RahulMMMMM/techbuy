const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyJWT = require('../middleware/verifyJWT')



router.route('/')
    .get(productController.getProducts)
    .post(productController.addProducts)


module.exports = router