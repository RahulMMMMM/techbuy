const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.route('/create-order')
    .post(orderController.createOrder)

router.route('/get-orders')
    .get(orderController.getOrders)


module.exports = router
