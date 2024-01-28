const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.route('/create-order')
    .post(orderController.createOrder)

router.route('/get-orders')
    .get(orderController.getOrders)

router.route('/get-order')
    .get(orderController.getOrder)

router.route('/get-session-id')
    .get(orderController.getSessionId)

module.exports = router
